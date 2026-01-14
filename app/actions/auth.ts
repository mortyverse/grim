'use server'

import { db } from '@/lib/db'
import { registerSchema, signInSchema } from '@/lib/validations/auth'
import { signIn, signOut } from '@/lib/auth'
import bcrypt from 'bcryptjs'
import { headers } from 'next/headers'
import { AuthError } from 'next-auth'

export type ActionResult = {
  error?: string
  success?: boolean
  message?: string
}

// T024: Register Server Action
export async function register(formData: FormData): Promise<ActionResult> {
  try {
    const data = {
      name: formData.get('name') as string | undefined,
      email: formData.get('email') as string,
      password: formData.get('password') as string,
      confirmPassword: formData.get('confirmPassword') as string,
    }

    // Validate input
    const validated = registerSchema.safeParse(data)
    if (!validated.success) {
      const errors = validated.error.flatten().fieldErrors
      const firstError = Object.values(errors)[0]?.[0]
      return {
        error: firstError || '유효하지 않은 입력입니다',
      }
    }

    // T032: Check email uniqueness
    const existingUser = await db.user.findUnique({
      where: { email: validated.data.email },
    })

    if (existingUser) {
      return {
        error: '이미 사용 중인 이메일입니다',
      }
    }

    // T033: Hash password with bcryptjs (12 rounds)
    const hashedPassword = await bcrypt.hash(validated.data.password, 12)

    // Get client IP and user agent for audit log
    const headersList = await headers()
    const ipAddress = headersList.get('x-forwarded-for') || headersList.get('x-real-ip') || 'unknown'
    const userAgent = headersList.get('user-agent') || 'unknown'

    // Create user with default STUDENT role
    const user = await db.user.create({
      data: {
        name: validated.data.name,
        email: validated.data.email,
        password: hashedPassword,
        role: 'STUDENT',
      },
    })

    // T035: Create audit log for REGISTER event
    await db.auditLog.create({
      data: {
        userId: user.id,
        action: 'REGISTER',
        details: {
          email: user.email,
          name: user.name,
        },
        ipAddress,
        userAgent,
      },
    })

    return {
      success: true,
      message: '회원가입이 완료되었습니다',
    }
  } catch (error) {
    console.error('Registration error:', error)
    return {
      error: '회원가입 중 오류가 발생했습니다',
    }
  }
}

// T025: SignIn Server Action
export async function signInWithCredentials(
  prevState: ActionResult | undefined,
  formData: FormData
): Promise<ActionResult> {
  try {
    const data = {
      email: formData.get('email') as string,
      password: formData.get('password') as string,
    }

    // Validate input
    const validated = signInSchema.safeParse(data)
    if (!validated.success) {
      const errors = validated.error.flatten().fieldErrors
      const firstError = Object.values(errors)[0]?.[0]
      return {
        error: firstError || '유효하지 않은 입력입니다',
      }
    }

    // Get client IP and user agent for audit log
    const headersList = await headers()
    const ipAddress = headersList.get('x-forwarded-for') || headersList.get('x-real-ip') || 'unknown'
    const userAgent = headersList.get('user-agent') || 'unknown'

    // Check if user exists
    const user = await db.user.findUnique({
      where: { email: validated.data.email },
    })

    // T034: Check if account is locked
    if (user && user.lockedUntil && user.lockedUntil > new Date()) {
      const remainingMinutes = Math.ceil(
        (user.lockedUntil.getTime() - Date.now()) / 1000 / 60
      )
      return {
        error: `계정이 잠겨 있습니다. ${remainingMinutes}분 후에 다시 시도해주세요`,
      }
    }

    try {
      // Attempt sign in
      await signIn('credentials', {
        email: validated.data.email,
        password: validated.data.password,
        redirect: false,
      })

      // T036: Create audit log for LOGIN_SUCCESS
      if (user) {
        await db.auditLog.create({
          data: {
            userId: user.id,
            action: 'LOGIN_SUCCESS',
            details: {
              email: user.email,
            },
            ipAddress,
            userAgent,
          },
        })
      }

      return {
        success: true,
        message: '로그인 성공',
      }
    } catch (error) {
      // Handle failed login attempt
      if (user) {
        // T034: Increment failed attempts
        const newFailedAttempts = user.failedLoginAttempts + 1
        const shouldLock = newFailedAttempts >= 5

        await db.user.update({
          where: { id: user.id },
          data: {
            failedLoginAttempts: newFailedAttempts,
            lockedUntil: shouldLock
              ? new Date(Date.now() + 15 * 60 * 1000) // Lock for 15 minutes
              : null,
          },
        })

        // T036: Create audit log for LOGIN_FAILED
        await db.auditLog.create({
          data: {
            userId: user.id,
            action: 'LOGIN_FAILED',
            details: {
              email: user.email,
              failedAttempts: newFailedAttempts,
              locked: shouldLock,
            },
            ipAddress,
            userAgent,
          },
        })

        if (shouldLock) {
          return {
            error: '5회 로그인 실패로 계정이 15분간 잠겼습니다',
          }
        }

        return {
          error: `이메일 또는 비밀번호가 올바르지 않습니다 (${newFailedAttempts}/5)`,
        }
      }

      if (error instanceof AuthError) {
        if (error.type === 'CredentialsSignin') {
          return {
            error: '이메일 또는 비밀번호가 올바르지 않습니다',
          }
        }
        if (error.message === 'ACCOUNT_LOCKED') {
          return {
            error: '계정이 잠겨 있습니다. 잠시 후 다시 시도해주세요',
          }
        }
      }

      return {
        error: '로그인 중 오류가 발생했습니다',
      }
    }
  } catch (error) {
    console.error('SignIn error:', error)
    return {
      error: '로그인 중 오류가 발생했습니다',
    }
  }
}

// Logout action
export async function logout() {
  const headersList = await headers()
  const ipAddress = headersList.get('x-forwarded-for') || headersList.get('x-real-ip') || 'unknown'
  const userAgent = headersList.get('user-agent') || 'unknown'

  // Note: We'll need to get the current user ID before signing out to log it
  // This will be implemented in Phase 6 (User Story 4)

  await signOut({ redirect: false })

  return {
    success: true,
  }
}
