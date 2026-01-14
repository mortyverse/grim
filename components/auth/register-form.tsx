'use client'

import { useActionState } from 'react'
import { register, type ActionResult } from '@/app/actions/auth'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { FormField, Form } from '@/components/ui/form'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

export function RegisterForm() {
  const router = useRouter()
  const [state, formAction, isPending] = useActionState<ActionResult | undefined, FormData>(
    async (prevState: ActionResult | undefined, formData: FormData) => {
      return await register(formData)
    },
    undefined
  )

  useEffect(() => {
    if (state?.success) {
      // Redirect to login page after successful registration
      setTimeout(() => {
        router.push('/login')
      }, 2000)
    }
  }, [state?.success, router])

  return (
    <Form action={formAction}>
      <FormField
        label="이름 (선택)"
        htmlFor="name"
        error={state?.error?.includes('이름') ? state.error : undefined}
      >
        <Input
          id="name"
          name="name"
          type="text"
          placeholder="홍길동"
          disabled={isPending}
        />
      </FormField>

      <FormField
        label="이메일"
        htmlFor="email"
        error={state?.error?.includes('이메일') ? state.error : undefined}
      >
        <Input
          id="email"
          name="email"
          type="email"
          placeholder="your@email.com"
          required
          disabled={isPending}
        />
      </FormField>

      <FormField
        label="비밀번호"
        htmlFor="password"
        error={state?.error?.includes('비밀번호') && !state?.error?.includes('일치') ? state.error : undefined}
      >
        <Input
          id="password"
          name="password"
          type="password"
          placeholder="최소 8자, 영문/숫자 포함"
          required
          disabled={isPending}
        />
      </FormField>

      <FormField
        label="비밀번호 확인"
        htmlFor="confirmPassword"
        error={state?.error?.includes('일치') ? state.error : undefined}
      >
        <Input
          id="confirmPassword"
          name="confirmPassword"
          type="password"
          placeholder="비밀번호 재입력"
          required
          disabled={isPending}
        />
      </FormField>

      {state?.error && !state.error.includes('이름') && !state.error.includes('이메일') && !state.error.includes('비밀번호') && (
        <div className="rounded-md bg-red-50 p-3">
          <p className="text-sm text-red-800">{state.error}</p>
        </div>
      )}

      {state?.success && (
        <div className="rounded-md bg-green-50 p-3">
          <p className="text-sm text-green-800">
            {state.message} 로그인 페이지로 이동합니다...
          </p>
        </div>
      )}

      <Button type="submit" className="w-full" disabled={isPending}>
        {isPending ? '회원가입 중...' : '회원가입'}
      </Button>
    </Form>
  )
}
