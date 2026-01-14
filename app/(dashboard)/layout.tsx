import { auth } from '@/lib/auth'
import { redirect } from 'next/navigation'
import Link from 'next/link'

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await auth()

  // Redirect to login if not authenticated
  if (!session?.user) {
    redirect('/login')
  }

  const user = session.user

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <nav className="bg-white shadow">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 justify-between">
            <div className="flex">
              <div className="flex flex-shrink-0 items-center">
                <span className="text-xl font-bold">Grim</span>
              </div>
              <div className="ml-6 flex space-x-8">
                <Link
                  href="/dashboard/community"
                  className="inline-flex items-center border-b-2 border-transparent px-1 pt-1 text-sm font-medium text-gray-900 hover:border-gray-300"
                >
                  커뮤니티
                </Link>
                {(user.role === 'MENTOR' && user.mentorStatus === 'ACTIVE' || user.role === 'ADMIN') && (
                  <Link
                    href="/dashboard/mentor/feedback"
                    className="inline-flex items-center border-b-2 border-transparent px-1 pt-1 text-sm font-medium text-gray-900 hover:border-gray-300"
                  >
                    피드백
                  </Link>
                )}
                {user.role === 'ADMIN' && (
                  <Link
                    href="/dashboard/admin"
                    className="inline-flex items-center border-b-2 border-transparent px-1 pt-1 text-sm font-medium text-gray-900 hover:border-gray-300"
                  >
                    관리자
                  </Link>
                )}
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-700">
                {user.name || user.email}
              </span>
              <span className="inline-flex items-center rounded-full bg-blue-100 px-2.5 py-0.5 text-xs font-medium text-blue-800">
                {user.role === 'STUDENT' && '학생'}
                {user.role === 'MENTOR' && '멘토'}
                {user.role === 'ADMIN' && '관리자'}
              </span>
              <Link
                href="/dashboard/settings"
                className="text-sm text-gray-700 hover:text-gray-900"
              >
                설정
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Main content */}
      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {children}
      </main>
    </div>
  )
}
