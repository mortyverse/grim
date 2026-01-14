import { auth } from '@/lib/auth'
import Link from 'next/link'
import { redirect } from 'next/navigation'
import { Button } from '@/components/ui/button'

export default async function HomePage() {
  const session = await auth()

  if (session?.user) {
    redirect('/dashboard/community')
  }

  return (
    <div className="min-h-screen bg-white text-neutral-900 font-sans">
      {/* Navigation */}
      <nav className="fixed w-full z-50 bg-white/90 backdrop-blur-md border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex items-center gap-2">
              <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2L2 7l10 5 10-5-10-5zm0 9l2.5-1.25L12 8.5l-2.5 1.25L12 11zm0 2.5l-5-2.5-5 2.5L12 22l10-8.5-5-2.5-5 2.5z"/>
              </svg>
              <span className="font-bold text-lg tracking-tight">Grim</span>
            </div>

            {/* Center Nav */}
            <div className="hidden md:flex items-center space-x-8 text-sm font-medium text-gray-600">
              <Link href="/mentors" className="hover:text-black transition-colors">멘토 찾기</Link>
              <Link href="/gallery" className="hover:text-black transition-colors">합격 갤러리</Link>
              <Link href="/pricing" className="hover:text-black transition-colors">이용 요금</Link>
              <Link href="/stories" className="hover:text-black transition-colors">스토리</Link>
            </div>

            {/* Right Actions */}
            <div className="flex items-center gap-4">
              <Link href="/login" className="text-sm font-semibold hover:text-gray-600">Sign In</Link>
              <Link href="/register">
                <Button size="sm" className="font-medium">
                  무료 진단 받기
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="max-w-4xl animate-fade-in-up">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-orange-50 border border-orange-100 rounded-full mb-6">
            <span className="text-orange-500">★</span>
            <span className="text-xs font-bold text-orange-700 tracking-wide">RATED 4.9/5 FROM 500+ STUDENTS</span>
          </div>
          
          {/* Headline */}
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-neutral-900 leading-[1.1] mb-6">
            데이터로 증명하는<br />
            미대 입시 솔루션
          </h1>
          
          {/* Subhead */}
          <p className="text-lg text-gray-500 max-w-2xl leading-relaxed mb-10">
            감에 의존하는 입시는 끝났습니다. 홍익대, 한예종 출신 멘토들의
            체계적인 시각 피드백과 합격 데이터로 당신의 실기력을 완성하세요.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-wrap gap-4 mb-20">
            <Link href="/register">
              <Button size="lg" className="flex items-center gap-2">
                지금 시작하기
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3"/>
                </svg>
              </Button>
            </Link>
            <Link href="/mentors">
              <Button variant="outline" size="lg">
                멘토 프로필 보기
              </Button>
            </Link>
          </div>
        </div>

        {/* Featured Image with Glass Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 h-[500px] animate-fade-in">
          {/* Left Card: Visualization */}
          <div className="relative rounded-3xl overflow-hidden group">
            {/* Background Image Placeholder */}
            <div className="absolute inset-0 bg-neutral-900">
               <svg className="absolute inset-0 w-full h-full opacity-20" xmlns="http://www.w3.org/2000/svg">
                 <filter id="noise">
                   <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" stitchTiles="stitch"/>
                 </filter>
                 <rect width="100%" height="100%" filter="url(#noise)" opacity="1"/>
               </svg>
               <div className="absolute inset-0 bg-gradient-to-tr from-blue-900/40 to-purple-900/40"></div>
            </div>
            
            <div className="absolute inset-0 bg-black/20"></div>

            {/* Floating Glass UI Elements */}
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full max-w-md px-6">
              <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6 text-white shadow-2xl">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-sm font-medium text-white/80">나의 실기 점수 변화</span>
                  <span className="bg-green-500/20 text-green-300 text-xs px-2 py-1 rounded">+24% 성장</span>
                </div>
                <div className="flex items-end gap-2 h-24 mb-2">
                  <div className="w-1/5 bg-white/20 rounded-t h-[40%]"></div>
                  <div className="w-1/5 bg-white/20 rounded-t h-[55%]"></div>
                  <div className="w-1/5 bg-white/20 rounded-t h-[45%]"></div>
                  <div className="w-1/5 bg-white/20 rounded-t h-[70%]"></div>
                  <div className="w-1/5 bg-white rounded-t h-[90%] relative group-hover:bg-blue-400 transition-colors">
                    <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-white text-black text-xs font-bold px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                      A+
                    </div>
                  </div>
                </div>
                <div className="flex justify-between text-xs text-white/60">
                  <span>3월</span>
                  <span>4월</span>
                  <span>5월</span>
                  <span>6월</span>
                  <span>7월</span>
                </div>
              </div>
            </div>

            {/* Bottom Info */}
            <div className="absolute bottom-8 left-8">
              <h3 className="text-white text-2xl font-bold mb-1">체계적인 성적 관리</h3>
              <p className="text-white/80 text-sm">월별 실기 모의고사 데이터 분석</p>
            </div>
          </div>

          {/* Right Card: Mentor Feedback */}
          <div className="relative rounded-3xl overflow-hidden bg-gray-50 border border-gray-100">
            {/* Background Placeholder */}
            <div className="absolute inset-0 bg-neutral-200">
               <svg className="absolute inset-0 w-full h-full text-neutral-300" fill="currentColor" viewBox="0 0 24 24">
                   <path d="M0 0h24v24H0z" fill="none"/>
                   <path d="M21 3H3c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h18c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H3V5h18v14zm-10-7h8v2h-8zm0-4h8v2h-8zM5 7h4v10H5z"/>
               </svg>
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
            
            <div className="absolute bottom-8 left-8 max-w-sm">
              <div className="dark-glass-card p-6 rounded-2xl mb-4">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></div>
                  <span className="text-xs font-bold text-white uppercase tracking-wider">Live Feedback</span>
                </div>
                <p className="text-white text-lg font-medium leading-snug">
                  &quot;형태력은 좋으나, 빛이 들어오는 방향에 따른 명도 대비를 더 과감하게 주어야 입체감이 살아납니다.&quot;
                </p>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full border-2 border-white/20 bg-neutral-800 flex items-center justify-center text-white font-bold">K</div>
                <div>
                  <div className="text-white font-bold text-sm">김현우 멘토</div>
                  <div className="text-gray-400 text-xs">홍익대 시각디자인과</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Bento Grid Section (Logos / Features) */}
      <section className="py-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
          {[
            { name: '홍익대학교', icon: 'M12 2L2 7l10 5 10-5-10-5zm0 9l2.5-1.25L12 8.5l-2.5 1.25L12 11zm0 2.5l-5-2.5-5 2.5L12 22l10-8.5-5-2.5-5 2.5z' },
            { name: '서울대학교', icon: 'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z' },
            { name: '국민대학교', icon: 'M3 3h18v18H3V3z' },
            { name: '건국대학교', icon: 'M12 2L2 22h20L12 2z' },
            { name: '이화여대', icon: 'M3 13h8V3H3v10zm0 8h8v-6H3v6zm10 0h8V11h-8v10zm0-18v6h8V3h-8z' }
          ].map((univ, i) => (
            <div key={i} className="bg-gray-50 border border-gray-100 rounded-2xl p-6 flex flex-col justify-center items-center h-32 hover:border-gray-300 transition-colors">
              <svg className="w-8 h-8 text-gray-400 mb-2" fill="currentColor" viewBox="0 0 24 24">
                <path d={univ.icon} />
              </svg>
              <span className="text-xs font-semibold text-gray-500">{univ.name}</span>
            </div>
          ))}
          
          <div className="bg-black text-white rounded-2xl p-6 flex flex-col justify-center items-center h-32 cursor-pointer hover:bg-gray-900 transition-colors">
            <span className="text-lg font-bold">+24</span>
            <span className="text-xs font-medium text-gray-400">More Univs</span>
          </div>
        </div>
      </section>
      
      {/* Feature Section */}
      <section className="py-20 bg-gray-50 border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center gap-16">
          <div className="flex-1">
            <div className="inline-block px-3 py-1 bg-white border border-gray-200 rounded-md text-xs font-bold text-gray-900 mb-4 tracking-wider uppercase">
              Platform Features
            </div>
            <h2 className="text-4xl font-bold text-neutral-900 mb-6 leading-tight">
              단 하나의 플랫폼으로<br />
              입시의 모든 과정을 관리하세요.
            </h2>
            <p className="text-gray-500 mb-8 leading-relaxed">
              복잡한 입시 정보와 흩어진 그림 피드백을 Grim에서 통합 관리하세요.
              학생 개인별 맞춤 대시보드와 포트폴리오 관리가 자동으로 이루어집니다.
            </p>
            <Button size="lg" className="bg-neutral-900 text-white hover:bg-neutral-700">
              기능 더 알아보기
            </Button>
          </div>
          <div className="flex-1 w-full relative">
            {/* Browser Mockup */}
            <div className="bg-white rounded-xl shadow-2xl border border-gray-200 overflow-hidden">
              <div className="bg-gray-50 border-b border-gray-200 px-4 py-3 flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-red-400"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                <div className="w-3 h-3 rounded-full bg-green-400"></div>
              </div>
              <div className="p-8">
                {/* UI Mockup inside browser */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between pb-4 border-b border-gray-100">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-black rounded-lg flex items-center justify-center text-white font-bold">G</div>
                      <div className="font-bold text-neutral-900">My Dashboard</div>
                    </div>
                    <div className="text-xs text-gray-400">Last updated: Just now</div>
                  </div>
                  
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-white rounded border border-gray-200 flex items-center justify-center">🏫</div>
                        <span className="text-sm font-medium">목표 대학 설정</span>
                      </div>
                      <span className="text-xs font-bold text-neutral-900">20 Available</span>
                    </div>
                    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-white rounded border border-gray-200 flex items-center justify-center">🎨</div>
                        <span className="text-sm font-medium">내 그림 업로드</span>
                      </div>
                      <span className="text-xs font-bold text-neutral-900">10 Types</span>
                    </div>
                    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-white rounded border border-gray-200 flex items-center justify-center">📍</div>
                        <span className="text-sm font-medium">학원 위치 찾기</span>
                      </div>
                      <span className="text-xs font-bold text-neutral-900">5 Countries</span>
                    </div>
                  </div>
                  
                  <Button className="w-full bg-black text-white mt-2">
                    + 15 More Attributes
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}