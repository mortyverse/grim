import NextAuth, { type DefaultSession } from 'next-auth'
import Credentials from 'next-auth/providers/credentials'
import Google from 'next-auth/providers/google'
import { db } from './db'
import { UserRole } from '@prisma/client'
import bcrypt from 'bcryptjs'

declare module 'next-auth' {
  interface Session {
    user: {
      id: string
      role: UserRole
      mentorStatus?: string | null
    } & DefaultSession['user']
  }

  interface User {
    role: UserRole
    mentorStatus?: string | null
  }
}

export const { handlers, signIn, signOut, auth } = NextAuth({
  session: {
    strategy: 'jwt',
    maxAge: 24 * 60 * 60, // 24 hours
  },
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      authorization: {
        params: {
          prompt: 'consent',
          access_type: 'offline',
          response_type: 'code',
        },
      },
    }),
    // Kakao OAuth provider
    {
      id: 'kakao',
      name: 'Kakao',
      type: 'oauth',
      clientId: process.env.KAKAO_CLIENT_ID,
      clientSecret: process.env.KAKAO_CLIENT_SECRET,
      authorization: {
        url: 'https://kauth.kakao.com/oauth/authorize',
        params: {
          scope: 'profile_nickname profile_image account_email',
        },
      },
      token: 'https://kauth.kakao.com/oauth/token',
      userinfo: 'https://kapi.kakao.com/v2/user/me',
      profile(profile) {
        return {
          id: String(profile.id),
          name: profile.kakao_account?.profile?.nickname,
          email: profile.kakao_account?.email,
          image: profile.kakao_account?.profile?.profile_image_url,
          role: 'STUDENT',
        }
      },
    },
    Credentials({
      name: 'credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null
        }

        const user = await db.user.findUnique({
          where: { email: credentials.email as string },
        })

        if (!user || !user.password) {
          return null
        }

        // Check if account is locked
        if (user.lockedUntil && user.lockedUntil > new Date()) {
          throw new Error('ACCOUNT_LOCKED')
        }

        const isPasswordValid = await bcrypt.compare(
          credentials.password as string,
          user.password
        )

        if (!isPasswordValid) {
          // Increment failed attempts
          await db.user.update({
            where: { id: user.id },
            data: {
              failedLoginAttempts: { increment: 1 },
              lockedUntil:
                user.failedLoginAttempts + 1 >= 5
                  ? new Date(Date.now() + 15 * 60 * 1000) // Lock for 15 minutes
                  : null,
            },
          })
          return null
        }

        // Reset failed attempts on successful login
        await db.user.update({
          where: { id: user.id },
          data: {
            failedLoginAttempts: 0,
            lockedUntil: null,
          },
        })

        return {
          id: user.id,
          email: user.email,
          name: user.name,
          image: user.image,
          role: user.role,
          mentorStatus: user.mentorStatus,
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user, account }) {
      if (user) {
        token.id = user.id
        token.role = user.role
        token.mentorStatus = user.mentorStatus
      }

      // Handle account linking for OAuth providers
      if (account && account.provider !== 'credentials') {
        const existingUser = await db.user.findUnique({
          where: { email: token.email as string },
        })

        if (existingUser) {
          // Link OAuth account to existing email account
          const existingAccount = await db.account.findUnique({
            where: {
              provider_providerAccountId: {
                provider: account.provider,
                providerAccountId: account.providerAccountId,
              },
            },
          })

          if (!existingAccount) {
            await db.account.create({
              data: {
                userId: existingUser.id,
                type: account.type,
                provider: account.provider,
                providerAccountId: account.providerAccountId,
                refresh_token: account.refresh_token || undefined,
                access_token: account.access_token || undefined,
                expires_at: account.expires_at || undefined,
                token_type: account.token_type || undefined,
                scope: account.scope || undefined,
                id_token: account.id_token || undefined,
                session_state: (account.session_state as string | null) || undefined,
              },
            })
          }

          token.id = existingUser.id
          token.role = existingUser.role
          token.mentorStatus = existingUser.mentorStatus
        }
      }

      return token
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.id as string
        session.user.role = token.role as UserRole
        session.user.mentorStatus = token.mentorStatus as string | null
      }
      return session
    },
  },
  pages: {
    signIn: '/login',
    error: '/login',
  },
})

// Role utility functions
export function hasRole(userRole: UserRole, allowedRoles: UserRole[]): boolean {
  return allowedRoles.includes(userRole)
}

export function requireRole(userRole: UserRole, allowedRoles: UserRole[]): void {
  if (!hasRole(userRole, allowedRoles)) {
    throw new Error('UNAUTHORIZED')
  }
}

export function canAccessResource(
  userRole: UserRole,
  mentorStatus: string | null | undefined,
  resource: string
): boolean {
  // Admin has access to everything
  if (userRole === 'ADMIN') return true

  // Check resource-specific permissions
  if (resource.startsWith('/dashboard/admin')) {
    return false // Only admin (already checked above)
  }

  if (resource.startsWith('/dashboard/mentor/feedback')) {
    return userRole === 'MENTOR' && mentorStatus === 'ACTIVE'
  }

  if (resource.startsWith('/dashboard/community')) {
    return true // All authenticated users
  }

  if (resource.startsWith('/dashboard/settings')) {
    return true // All authenticated users
  }

  return false
}
