import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Grim - 미술 입시 커뮤니티',
  description: '미술 입시생을 위한 커뮤니티 및 멘토링 플랫폼',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ko">
      <body className={`${inter.className} antialiased`}>
        {children}
      </body>
    </html>
  )
}
