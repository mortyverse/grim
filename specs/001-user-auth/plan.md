# Implementation Plan: 사용자 인증 시스템 (User Authentication System)

**Branch**: `001-user-auth` | **Date**: 2026-01-13 | **Spec**: [spec.md](./spec.md)
**Input**: Feature specification from `/specs/001-user-auth/spec.md`

**Note**: This template is filled in by the `/speckit.plan` command. See `.specify/templates/commands/plan.md` for the execution workflow.

## Summary

NextAuth.js 기반 사용자 인증 시스템 구현. 이메일/비밀번호 및 소셜 로그인(Google, Kakao) 지원, JWT 세션 관리, Student/Mentor/Admin 역할 구분, 보호된 라우트 미들웨어 구현.

## Technical Context

**Language/Version**: TypeScript 5.x with Next.js 16 (App Router)
**Primary Dependencies**: NextAuth.js v5 (Auth.js), Prisma ORM, Zod, bcrypt
**Storage**: PostgreSQL (with Prisma ORM)
**Testing**: Vitest or Jest with React Testing Library
**Target Platform**: Web (Vercel deployment)
**Project Type**: web (Next.js App Router)
**Performance Goals**: 95% 로그인 응답 <2초, 권한 확인 <500ms, 동시 접속 1,000명 지원
**Constraints**: JWT 토큰 24시간 유효, 5회 연속 실패 시 15분 계정 잠금
**Scale/Scope**: 초기 1,000명 사용자, 확장 가능한 구조

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

### I. Server-First Architecture
- [x] **PASS**: NextAuth.js v5 Server Actions 사용, 인증 로직은 서버에서 처리
- [x] **PASS**: 로그인/회원가입 폼은 Server Actions를 통해 데이터 처리
- [x] **PASS**: Client Components는 상태 관리 및 UX 인터랙션에만 사용

### II. Type Safety & Validation
- [x] **PASS**: TypeScript strict mode 활성화 (tsconfig.json 확인됨)
- [x] **PASS**: 모든 인증 입력은 Zod 스키마로 검증 예정
- [x] **PASS**: Prisma typed models 사용
- [x] **PASS**: useActionState로 폼 에러 처리 예정

### III. User Trust & Verification
- [x] **PASS**: Mentor 상태 (pending, active, rejected) 역할 시스템에 포함
- [x] **PASS**: 역할 기반 접근 제어로 active 멘토만 피드백 가능
- [N/A]: 문서 검증은 별도 Spec (멘토 인증 워크플로우)

### IV. Visual Feedback Integrity
- [N/A]: 이 기능은 인증 시스템으로, 드로잉/피드백 시스템과 무관

### V. Point Economy Transparency
- [N/A]: 포인트 지급은 별도 Spec에서 처리 (회원가입 시 포인트 연동은 포인트 시스템 Spec)

### Gate Status: **PASS** - 모든 관련 원칙 준수

## Project Structure

### Documentation (this feature)

```text
specs/001-user-auth/
├── plan.md              # This file (/speckit.plan command output)
├── research.md          # Phase 0 output (/speckit.plan command)
├── data-model.md        # Phase 1 output (/speckit.plan command)
├── quickstart.md        # Phase 1 output (/speckit.plan command)
├── contracts/           # Phase 1 output (/speckit.plan command)
└── tasks.md             # Phase 2 output (/speckit.tasks command - NOT created by /speckit.plan)
```

### Source Code (repository root)

```text
src/
├── app/                    # App Router pages and layouts
│   ├── (auth)/            # Auth-related routes (login, register)
│   │   ├── login/
│   │   │   └── page.tsx
│   │   ├── register/
│   │   │   └── page.tsx
│   │   └── layout.tsx
│   ├── (dashboard)/       # Protected routes
│   │   └── layout.tsx     # Protected layout with auth check
│   ├── actions/           # Server Actions
│   │   └── auth.ts        # Auth-related server actions
│   └── layout.tsx         # Root layout (Server Component)
├── components/
│   ├── ui/                # Reusable UI components
│   │   ├── button.tsx
│   │   ├── input.tsx
│   │   └── form.tsx
│   └── auth/              # Auth-specific components
│       ├── login-form.tsx
│       ├── register-form.tsx
│       └── social-buttons.tsx
├── lib/
│   ├── db.ts              # Prisma client
│   ├── auth.ts            # NextAuth.js configuration
│   └── validations/       # Zod schemas
│       └── auth.ts
└── types/                 # TypeScript type definitions
    └── next-auth.d.ts     # NextAuth type extensions

prisma/
├── schema.prisma          # Database schema
└── migrations/            # Migration files

middleware.ts              # Route protection middleware
```

**Structure Decision**: Constitution에 명시된 Next.js App Router 구조를 따르며, (auth) 그룹은 인증 관련 페이지, (dashboard) 그룹은 보호된 라우트를 위해 사용. Server Actions는 `src/app/actions/`에 배치.

## Complexity Tracking

> **Fill ONLY if Constitution Check has violations that must be justified**

| Violation | Why Needed | Simpler Alternative Rejected Because |
|-----------|------------|-------------------------------------|
| N/A | N/A | Constitution 준수, 위반 사항 없음 |
