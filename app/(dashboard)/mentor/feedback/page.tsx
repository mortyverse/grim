import { auth, canAccessResource } from '@/lib/auth'
import { redirect } from 'next/navigation'

export default async function MentorFeedbackPage() {
  const session = await auth()

  if (!session?.user) {
    redirect('/login')
  }

  // T043: Implement role-based access control
  const hasAccess = canAccessResource(
    session.user.role,
    session.user.mentorStatus,
    '/dashboard/mentor/feedback'
  )

  if (!hasAccess) {
    // T044: Unauthorized access error handling
    return (
      <div className="rounded-lg bg-red-50 p-6">
        <h1 className="text-2xl font-bold text-red-900">접근 거부</h1>
        <p className="mt-2 text-red-700">
          이 페이지에 접근할 권한이 없습니다.
        </p>
        <p className="mt-1 text-sm text-red-600">
          멘토(활성 상태) 또는 관리자만 피드백 페이지에 접근할 수 있습니다.
        </p>
      </div>
    )
  }

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-900">피드백 작성</h1>
      <p className="mt-4 text-gray-600">
        {session.user.role === 'ADMIN' ? '관리자' : '멘토'}님, 학생들에게 피드백을 제공해주세요.
      </p>
      <div className="mt-8 rounded-lg bg-white p-6 shadow">
        <h2 className="text-xl font-semibold text-gray-900">
          멘토 전용 페이지
        </h2>
        <p className="mt-2 text-gray-600">
          이 페이지는 ACTIVE 상태의 MENTOR와 ADMIN만 접근할 수 있습니다.
        </p>
        <div className="mt-4 rounded-md bg-green-50 p-4">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg
                className="h-5 w-5 text-green-400"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <div className="ml-3">
              <h3 className="text-sm font-medium text-green-800">
                접근 승인됨
              </h3>
              <p className="mt-1 text-sm text-green-700">
                역할: {session.user.role}
                {session.user.mentorStatus && ` | 멘토 상태: ${session.user.mentorStatus}`}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
