import { auth, canAccessResource } from '@/lib/auth'
import { redirect } from 'next/navigation'

export default async function AdminPage() {
  const session = await auth()

  if (!session?.user) {
    redirect('/login')
  }

  // T043: Implement role-based access control
  const hasAccess = canAccessResource(
    session.user.role,
    session.user.mentorStatus,
    '/dashboard/admin'
  )

  if (!hasAccess) {
    // T044: Unauthorized access error handling
    return (
      <div className="rounded-lg bg-red-50 p-6">
        <h1 className="text-2xl font-bold text-red-900">접근 거부 (403 Forbidden)</h1>
        <p className="mt-2 text-red-700">
          이 페이지에 접근할 권한이 없습니다.
        </p>
        <p className="mt-1 text-sm text-red-600">
          관리자만 관리자 대시보드에 접근할 수 있습니다.
        </p>
      </div>
    )
  }

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-900">관리자 대시보드</h1>
      <p className="mt-4 text-gray-600">
        관리자 전용 페이지입니다.
      </p>
      <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <div className="rounded-lg bg-white p-6 shadow">
          <h2 className="text-lg font-semibold text-gray-900">사용자 관리</h2>
          <p className="mt-2 text-sm text-gray-600">
            사용자 역할 및 권한을 관리합니다.
          </p>
        </div>
        <div className="rounded-lg bg-white p-6 shadow">
          <h2 className="text-lg font-semibold text-gray-900">멘토 승인</h2>
          <p className="mt-2 text-sm text-gray-600">
            멘토 신청을 검토하고 승인합니다.
          </p>
        </div>
        <div className="rounded-lg bg-white p-6 shadow">
          <h2 className="text-lg font-semibold text-gray-900">감사 로그</h2>
          <p className="mt-2 text-sm text-gray-600">
            시스템 보안 이벤트를 확인합니다.
          </p>
        </div>
      </div>
      <div className="mt-6 rounded-md bg-purple-50 p-4">
        <div className="flex">
          <div className="flex-shrink-0">
            <svg
              className="h-5 w-5 text-purple-400"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                clipRule="evenodd"
              />
            </svg>
          </div>
          <div className="ml-3">
            <h3 className="text-sm font-medium text-purple-800">
              관리자 전용
            </h3>
            <p className="mt-1 text-sm text-purple-700">
              역할: {session.user.role} - 모든 페이지에 접근 가능
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
