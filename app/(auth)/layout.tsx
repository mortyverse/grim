import { auth } from '@/lib/auth'
import Link from 'next/link'
import { redirect } from 'next/navigation'

export default async function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await auth()

  // Redirect to dashboard if already authenticated
  if (session?.user) {
    redirect('/dashboard/community')
  }

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -left-20 top-0 h-96 w-96 animate-float rounded-full bg-gradient-to-r from-blue-400/10 to-blue-600/10 blur-3xl" />
        <div className="animation-delay-300 absolute -right-20 bottom-0 h-96 w-96 animate-float rounded-full bg-gradient-to-r from-purple-400/10 to-purple-600/10 blur-3xl" />
      </div>

      {/* Content */}
      <div className="relative w-full px-4 py-12 sm:px-6 lg:px-8">
        <div className="mx-auto w-full max-w-md space-y-8">
          {/* Logo/Back to home */}
          <div className="text-center">
            <Link href="/" className="inline-block animate-fade-in-up">
              <h1 className="text-4xl font-bold tracking-tight">
                <span className="gradient-text">Grim</span>
              </h1>
            </Link>
          </div>

          {/* Main content */}
          <div className="animate-scale-in">
            {children}
          </div>
        </div>
      </div>
    </div>
  )
}
