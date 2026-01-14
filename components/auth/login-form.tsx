'use client'

import { useActionState } from 'react'
import { signInWithCredentials, type ActionResult } from '@/app/actions/auth'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { FormField, Form } from '@/components/ui/form'

export function LoginForm() {
  const [state, formAction, isPending] = useActionState<ActionResult | undefined, FormData>(
    signInWithCredentials,
    undefined
  )

  return (
    <Form action={formAction}>
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
        error={state?.error?.includes('비밀번호') && !state?.error?.includes('이메일') ? state.error : undefined}
      >
        <Input
          id="password"
          name="password"
          type="password"
          placeholder="••••••••"
          required
          disabled={isPending}
        />
      </FormField>

      {state?.error && !state.error.includes('이메일') && !state.error.includes('비밀번호') && (
        <div className="rounded-md bg-red-50 p-3">
          <p className="text-sm text-red-800">{state.error}</p>
        </div>
      )}

      {state?.success && (
        <div className="rounded-md bg-green-50 p-3">
          <p className="text-sm text-green-800">{state.message}</p>
        </div>
      )}

      <Button type="submit" className="w-full" disabled={isPending}>
        {isPending ? '로그인 중...' : '로그인'}
      </Button>
    </Form>
  )
}
