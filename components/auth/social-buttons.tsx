'use client'

import { signIn } from 'next-auth/react'
import { useState } from 'react'

export function SocialButtons() {
  const [isLoading, setIsLoading] = useState(false)

  const handleSocialSignIn = async (provider: 'google' | 'kakao') => {
    try {
      setIsLoading(true)
      await signIn(provider, { callbackUrl: '/dashboard/community' })
    } catch (error) {
      console.error(`${provider} sign in error:`, error)
      setIsLoading(false)
    }
  }

  return (
    <div className="space-y-4">
      <button
        type="button"
        onClick={() => handleSocialSignIn('google')}
        disabled={isLoading}
        className="group relative flex w-full items-center justify-center gap-3 overflow-hidden rounded-xl border-2 border-gray-200 bg-white px-6 py-3.5 text-base font-semibold text-gray-700 shadow-soft transition-all duration-300 hover:scale-105 hover:border-gray-300 hover:bg-gray-50 hover:shadow-lg disabled:pointer-events-none disabled:opacity-50"
      >
        <svg className="h-5 w-5 shrink-0" viewBox="0 0 24 24">
          <path
            fill="#4285F4"
            d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
          />
          <path
            fill="#34A853"
            d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
          />
          <path
            fill="#FBBC05"
            d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
          />
          <path
            fill="#EA4335"
            d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
          />
        </svg>
        <span>Google로 계속하기</span>
        <div className="absolute inset-0 -translate-x-full bg-gradient-shine opacity-0 transition-all duration-500 group-hover:translate-x-full group-hover:opacity-100" />
      </button>

      <button
        type="button"
        onClick={() => handleSocialSignIn('kakao')}
        disabled={isLoading}
        className="group relative flex w-full items-center justify-center gap-3 overflow-hidden rounded-xl border-2 border-yellow-300 bg-yellow-400 px-6 py-3.5 text-base font-semibold text-gray-900 shadow-soft transition-all duration-300 hover:scale-105 hover:border-yellow-400 hover:bg-yellow-500 hover:shadow-lg disabled:pointer-events-none disabled:opacity-50"
      >
        <svg className="h-5 w-5 shrink-0" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 3c5.799 0 10.5 3.664 10.5 8.185 0 4.52-4.701 8.184-10.5 8.184a13.5 13.5 0 0 1-1.727-.11l-4.408 2.883c-.501.265-.678.236-.472-.413l.892-3.678c-2.88-1.46-4.785-3.99-4.785-6.866C1.5 6.665 6.201 3 12 3zm5.907 8.06l1.47-1.424a.472.472 0 0 0-.656-.678l-1.928 1.866V9.282a.472.472 0 0 0-.944 0v2.557a.471.471 0 0 0 0 .222V13.5a.472.472 0 0 0 .944 0v-1.363l.427-.413 1.428 2.033a.472.472 0 1 0 .773-.542l-1.514-2.155zm-2.958 1.924h-1.46V9.297a.472.472 0 0 0-.943 0v4.159c0 .26.21.472.471.472h1.932a.472.472 0 1 0 0-.944zm-5.857-1.092l.696-1.707.638 1.707H9.092zm2.523 1.092l-.952-2.54a.472.472 0 0 0-.44-.307h-.002a.471.471 0 0 0-.44.307l-1.86 4.961a.472.472 0 0 0 .88.33l.413-1.103h2.395l.389 1.103a.472.472 0 1 0 .886-.314l-.269-.764V12.984zM7.724 9.293a.472.472 0 0 0-.472-.472H4.425a.472.472 0 1 0 0 .944h1.087v3.736a.472.472 0 0 0 .944 0V9.765h1.268a.472.472 0 0 0 .472-.472z" />
        </svg>
        <span>Kakao로 계속하기</span>
        <div className="absolute inset-0 -translate-x-full bg-gradient-shine opacity-0 transition-all duration-500 group-hover:translate-x-full group-hover:opacity-100" />
      </button>
    </div>
  )
}
