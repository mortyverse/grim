# Research: 사용자 인증 시스템

**Feature**: 001-user-auth
**Date**: 2026-01-13
**Status**: Complete

---

## 1. NextAuth.js v5 (Auth.js) with Next.js App Router

### Decision
NextAuth.js v5 (Auth.js)를 사용하여 인증 시스템 구현

### Rationale
- Next.js App Router와 완벽한 통합
- Server Actions 지원
- JWT/Database 세션 전략 모두 지원
- TypeScript 완벽 지원
- Google, Kakao 등 다양한 OAuth 제공자 지원

### Alternatives Considered
- Clerk: 호스팅 솔루션, 비용 발생 및 커스터마이징 제한
- Lucia Auth: 가볍지만 OAuth 제공자 직접 구현 필요
- 직접 구현: 보안 취약점 위험 높음

---

## 2. Kakao OAuth Provider

### Decision
NextAuth.js 내장 Kakao provider 사용

### Rationale
- NextAuth.js v5에 Kakao 제공자 기본 포함
- 한국 사용자 대상 서비스에 필수
- 설정이 간단함

### Kakao Developer Console 설정
1. Kakao Developers 접속
2. 애플리케이션 생성
3. 플랫폼 > Web 플랫폼 등록
4. 카카오 로그인 활성화
5. Redirect URI: BASE_URL/api/auth/callback/kakao
6. 동의항목: 닉네임, 프로필 사진, 이메일(선택)

---

## 3. Google OAuth Provider

### Decision
NextAuth.js 내장 Google provider 사용

### Rationale
- 글로벌 표준 OAuth 제공자
- NextAuth.js 공식 지원

---

## 4. Password Hashing (bcrypt)

### Decision
bcryptjs 패키지 사용 (salt rounds: 12)

### Rationale
- bcryptjs: 순수 JavaScript로 Edge Runtime 호환
- bcrypt: Native 바이너리로 Edge 미지원
- Salt rounds 12: 보안과 성능 균형

---

## 5. Role-Based Access Control (RBAC)

### Decision
3-tier 역할: Student, Mentor, Admin

### 권한 매트릭스
| 기능 | Student | Mentor(Active) | Admin |
|-----|---------|----------------|-------|
| 커뮤니티 | O | O | O |
| 피드백 요청 | O | O | O |
| 피드백 작성 | X | O | O |
| 관리자 대시보드 | X | X | O |

---

## 6. Middleware Route Protection

### Decision
Next.js middleware.ts로 중앙 집중식 보호

### Rationale
- 서버 사이드 인증 확인
- 일관된 보호
- 리다이렉트 로직 중앙 관리

---

## 7. Login Attempt Throttling

### Decision
DB 기반 rate limiting

### Rationale
- 5회 연속 실패 시 15분 잠금 요구사항 충족
- 간단 구현, 필요시 Redis 확장

---

## 8. Session Type Extension

### Decision
NextAuth.js 타입 확장으로 role 필드 추가

---

## 9. Audit Logging

### Decision
AuditLog 테이블로 보안 이벤트 기록

### 이벤트 타입
- LOGIN_SUCCESS
- LOGIN_FAILED
- LOGOUT
- REGISTER
- ROLE_CHANGED
- ACCOUNT_LOCKED

---

## Summary

| Topic | Decision | Package |
|-------|----------|---------|
| Auth | NextAuth.js v5 | next-auth@beta |
| Password | bcryptjs (12) | bcryptjs |
| ORM | Prisma | prisma |
| Validation | Zod | zod |
| Session | JWT (24h) | NextAuth |

## Required Packages

npm install next-auth@beta @auth/prisma-adapter prisma @prisma/client bcryptjs zod
npm install -D @types/bcryptjs
