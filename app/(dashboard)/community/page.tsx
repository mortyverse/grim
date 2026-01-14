import { auth } from '@/lib/auth'

export default async function CommunityPage() {
  const session = await auth()

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-900">커뮤니티</h1>
      <p className="mt-4 text-gray-600">
        환영합니다, {session?.user?.name || session?.user?.email}님!
      </p>
      <div className="mt-8 rounded-lg bg-white p-6 shadow">
        <h2 className="text-xl font-semibold text-gray-900">
          모든 사용자가 접근 가능한 페이지
        </h2>
        <p className="mt-2 text-gray-600">
          이 페이지는 STUDENT, MENTOR, ADMIN 모두 접근할 수 있습니다.
        </p>
        <div className="mt-4 rounded-md bg-blue-50 p-4">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg
                className="h-5 w-5 text-blue-400"
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
              <h3 className="text-sm font-medium text-blue-800">
                역할: {session?.user?.role}
              </h3>
              {session?.user?.mentorStatus && (
                <p className="mt-1 text-sm text-blue-700">
                  멘토 상태: {session.user.mentorStatus}
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
