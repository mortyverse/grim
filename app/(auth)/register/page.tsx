import { RegisterForm } from '@/components/auth/register-form'
import { SocialButtons } from '@/components/auth/social-buttons'
import Link from 'next/link'

export default function RegisterPage() {
  return (
    <>
      <div className="text-center">
        <h2 className="text-3xl font-bold tracking-tight text-gray-900 md:text-4xl">
          회원가입
        </h2>
        <p className="mt-3 text-base text-gray-600">
          이미 계정이 있으신가요?{' '}
          <Link
            href="/login"
            className="font-semibold text-blue-600 transition-colors hover:text-blue-700"
          >
            로그인
          </Link>
        </p>
      </div>

      <div className="mt-8">
        <div className="card-glass backdrop-blur-safari">
          <RegisterForm />
          <div className="mt-8">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-200" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="bg-white/80 px-4 text-gray-500">또는 다른 방법으로</span>
              </div>
            </div>
            <div className="mt-6">
              <SocialButtons />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
