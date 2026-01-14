import { auth } from '@/lib/auth'

export default async function SettingsPage() {
  const session = await auth()

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-900">설정</h1>
      <p className="mt-4 text-gray-600">
        계정 설정을 관리합니다.
      </p>
      <div className="mt-8 rounded-lg bg-white p-6 shadow">
        <h2 className="text-xl font-semibold text-gray-900">계정 정보</h2>
        <dl className="mt-4 space-y-4">
          <div>
            <dt className="text-sm font-medium text-gray-500">이메일</dt>
            <dd className="mt-1 text-sm text-gray-900">{session?.user?.email}</dd>
          </div>
          <div>
            <dt className="text-sm font-medium text-gray-500">이름</dt>
            <dd className="mt-1 text-sm text-gray-900">
              {session?.user?.name || '설정되지 않음'}
            </dd>
          </div>
          <div>
            <dt className="text-sm font-medium text-gray-500">역할</dt>
            <dd className="mt-1 text-sm text-gray-900">
              {session?.user?.role === 'STUDENT' && '학생'}
              {session?.user?.role === 'MENTOR' && '멘토'}
              {session?.user?.role === 'ADMIN' && '관리자'}
            </dd>
          </div>
          {session?.user?.mentorStatus && (
            <div>
              <dt className="text-sm font-medium text-gray-500">멘토 상태</dt>
              <dd className="mt-1 text-sm text-gray-900">
                {session.user.mentorStatus === 'PENDING' && '심사 대기 중'}
                {session.user.mentorStatus === 'ACTIVE' && '활성'}
                {session.user.mentorStatus === 'REJECTED' && '거부됨'}
              </dd>
            </div>
          )}
        </dl>
      </div>
    </div>
  )
}
