import { UserRole } from '@prisma/client'
import { type DefaultSession } from 'next-auth'

declare module 'next-auth' {
  interface Session {
    user: {
      id: string
      role: UserRole
      mentorStatus?: string | null
    } & DefaultSession['user']
  }

  interface User {
    id: string
    role: UserRole
    mentorStatus?: string | null
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    id: string
    role: UserRole
    mentorStatus?: string | null
  }
}
