# Data Model: 사용자 인증 시스템

**Feature**: 001-user-auth
**Date**: 2026-01-13

---

## Entity Relationship Diagram

```
┌─────────────────┐      ┌─────────────────┐
│      User       │      │    Account      │
├─────────────────┤      ├─────────────────┤
│ id              │──┐   │ id              │
│ email           │  │   │ userId          │──┐
│ emailVerified   │  │   │ type            │  │
│ name            │  │   │ provider        │  │
│ image           │  │   │ providerAcctId  │  │
│ password        │  └──<│ ...             │  │
│ role            │      └─────────────────┘  │
│ mentorStatus    │                           │
│ failedAttempts  │      ┌─────────────────┐  │
│ lockedUntil     │      │    Session      │  │
│ createdAt       │      ├─────────────────┤  │
│ updatedAt       │      │ id              │  │
└─────────────────┘      │ sessionToken    │  │
         │               │ userId          │──┘
         │               │ expires         │
         │               └─────────────────┘
         │
         │               ┌─────────────────┐
         └──────────────>│    AuditLog     │
                         ├─────────────────┤
                         │ id              │
                         │ userId          │
                         │ action          │
                         │ details         │
                         │ ipAddress       │
                         │ userAgent       │
                         │ createdAt       │
                         └─────────────────┘
```

---

## Entities

### User

플랫폼의 모든 사용자를 나타냅니다.

| Field | Type | Constraints | Description |
|-------|------|-------------|-------------|
| id | String | PK, cuid | 고유 식별자 |
| email | String | Unique, Not Null | 이메일 주소 |
| emailVerified | DateTime? | | 이메일 인증 일시 (추후 기능) |
| name | String? | | 표시 이름 |
| image | String? | | 프로필 이미지 URL |
| password | String? | | 해시된 비밀번호 (소셜 로그인 시 null) |
| role | Enum | Default: STUDENT | 사용자 역할 |
| mentorStatus | Enum? | | 멘토 인증 상태 (멘토만 해당) |
| failedLoginAttempts | Int | Default: 0 | 연속 로그인 실패 횟수 |
| lockedUntil | DateTime? | | 계정 잠금 해제 시간 |
| createdAt | DateTime | Default: now() | 계정 생성일 |
| updatedAt | DateTime | Auto-update | 마지막 수정일 |

### Account (NextAuth.js 표준)

OAuth 소셜 로그인 연동 정보입니다.

| Field | Type | Constraints | Description |
|-------|------|-------------|-------------|
| id | String | PK, cuid | 고유 식별자 |
| userId | String | FK -> User | 연결된 사용자 |
| type | String | Not Null | 계정 타입 (oauth, email) |
| provider | String | Not Null | OAuth 제공자 (google, kakao) |
| providerAccountId | String | Not Null | 제공자의 사용자 ID |
| refresh_token | String? | | OAuth 리프레시 토큰 |
| access_token | String? | | OAuth 액세스 토큰 |
| expires_at | Int? | | 토큰 만료 시간 |
| token_type | String? | | 토큰 타입 |
| scope | String? | | OAuth 스코프 |
| id_token | String? | | OpenID Connect ID 토큰 |
| session_state | String? | | 세션 상태 |

**Unique Constraint**: (provider, providerAccountId)

### Session (NextAuth.js 표준)

사용자 세션 정보입니다 (JWT 전략 사용 시 DB에 저장하지 않음).

| Field | Type | Constraints | Description |
|-------|------|-------------|-------------|
| id | String | PK, cuid | 고유 식별자 |
| sessionToken | String | Unique | 세션 토큰 |
| userId | String | FK -> User | 연결된 사용자 |
| expires | DateTime | Not Null | 세션 만료 시간 |

### AuditLog

보안 감사 로그입니다.

| Field | Type | Constraints | Description |
|-------|------|-------------|-------------|
| id | String | PK, cuid | 고유 식별자 |
| userId | String? | FK -> User | 관련 사용자 (익명 이벤트 시 null) |
| action | String | Not Null | 이벤트 타입 |
| details | Json? | | 추가 세부 정보 |
| ipAddress | String? | | 클라이언트 IP |
| userAgent | String? | | 브라우저 정보 |
| createdAt | DateTime | Default: now() | 이벤트 발생 시간 |

---

## Enums

### UserRole

```
STUDENT  - 학생 (기본값)
MENTOR   - 멘토
ADMIN    - 관리자
```

### MentorStatus

```
PENDING  - 심사 대기 중
ACTIVE   - 승인됨 (활동 가능)
REJECTED - 거부됨
```

### AuditAction

```
LOGIN_SUCCESS   - 로그인 성공
LOGIN_FAILED    - 로그인 실패
LOGOUT          - 로그아웃
REGISTER        - 회원가입
ROLE_CHANGED    - 역할 변경
ACCOUNT_LOCKED  - 계정 잠금
ACCOUNT_UNLOCKED - 계정 잠금 해제
```

---

## Prisma Schema

```prisma
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

enum UserRole {
  STUDENT
  MENTOR
  ADMIN
}

enum MentorStatus {
  PENDING
  ACTIVE
  REJECTED
}

model User {
  id                  String       @id @default(cuid())
  email               String       @unique
  emailVerified       DateTime?
  name                String?
  image               String?
  password            String?
  role                UserRole     @default(STUDENT)
  mentorStatus        MentorStatus?
  failedLoginAttempts Int          @default(0)
  lockedUntil         DateTime?
  createdAt           DateTime     @default(now())
  updatedAt           DateTime     @updatedAt

  accounts   Account[]
  sessions   Session[]
  auditLogs  AuditLog[]
}

model Account {
  id                String  @id @default(cuid())
  userId            String
  type              String
  provider          String
  providerAccountId String
  refresh_token     String? @db.Text
  access_token      String? @db.Text
  expires_at        Int?
  token_type        String?
  scope             String?
  id_token          String? @db.Text
  session_state     String?

  user User @relation(fields: [userId], references: [id], onDelete: Cascade)

  @@unique([provider, providerAccountId])
}

model Session {
  id           String   @id @default(cuid())
  sessionToken String   @unique
  userId       String
  expires      DateTime

  user User @relation(fields: [userId], references: [id], onDelete: Cascade)
}

model AuditLog {
  id        String   @id @default(cuid())
  userId    String?
  action    String
  details   Json?
  ipAddress String?
  userAgent String?
  createdAt DateTime @default(now())

  user User? @relation(fields: [userId], references: [id], onDelete: SetNull)

  @@index([userId])
  @@index([action])
  @@index([createdAt])
}
```

---

## Validation Rules

### Email
- 유효한 이메일 형식
- 최대 255자
- 중복 불가

### Password
- 최소 8자
- 영문자 1개 이상 포함
- 숫자 1개 이상 포함

### Name
- 최소 2자, 최대 50자 (선택 사항)

---

## State Transitions

### User Role Transition

```
신규 가입 -> STUDENT (자동)
STUDENT -> MENTOR (Admin 승인 후, 별도 Spec)
Any -> ADMIN (수동 설정 또는 시드)
```

### Mentor Status Transition

```
null -> PENDING (멘토 신청 시)
PENDING -> ACTIVE (Admin 승인)
PENDING -> REJECTED (Admin 거부)
REJECTED -> PENDING (재신청 시)
```

### Account Lock Transition

```
Normal -> Locked (5회 연속 실패)
Locked -> Normal (15분 경과 또는 Admin 해제)
```

---

## Authorization Rules

### Page Access Matrix

| Route Pattern | Allowed Roles | Additional Constraints |
|--------------|---------------|------------------------|
| `/dashboard/community/**` | STUDENT, MENTOR (any status), ADMIN | Authenticated only |
| `/dashboard/mentor/feedback/**` | MENTOR (ACTIVE status only), ADMIN | Must have mentorStatus = ACTIVE |
| `/dashboard/settings/**` | All authenticated users | User can only edit own settings |
| `/dashboard/admin/**` | ADMIN | Admin role required |
| `/api/auth/**` | Public | NextAuth routes |
| `/login`, `/register` | Public | Redirect to /dashboard if authenticated |

### Role Hierarchy

- **ADMIN**: Full access to all routes
- **MENTOR (ACTIVE)**: Access to STUDENT routes + mentor-specific routes
- **MENTOR (PENDING/REJECTED)**: Same access as STUDENT (cannot provide feedback)
- **STUDENT**: Access to community and settings only

### Implementation Notes

- Middleware checks authentication state (logged in vs. not)
- Protected layouts check role/mentorStatus for specific pages
- Use `requireRole(['ADMIN', 'MENTOR'])` helper in src/lib/auth.ts
- For mentor-specific pages, also check `user.mentorStatus === 'ACTIVE'`
