# Server Actions Contract: Authentication

**Feature**: 001-user-auth
**Date**: 2026-01-13

Constitution에 따라 API Routes 대신 Server Actions를 사용합니다.
NextAuth.js의 /api/auth/* 라우트는 프레임워크 요구사항으로 예외 처리됩니다.

---

## Server Actions

### register

회원가입을 처리합니다.

**Location**: src/app/actions/auth.ts

**Input (FormData)**:
| Field | Type | Required | Validation |
|-------|------|----------|------------|
| email | string | Yes | Valid email format |
| password | string | Yes | Min 8 chars, 1 letter, 1 number |
| name | string | No | Max 50 chars |

**Output**:
```typescript
type RegisterResult = 
  | { success: true; userId: string }
  | { success: false; error: { email?: string[]; password?: string[]; _form?: string[] } }
```

**Behavior**:
1. Validate input with Zod schema
2. Check if email already exists
3. Hash password with bcryptjs (12 rounds)
4. Create user with role=STUDENT
5. Log REGISTER audit event
6. Return success or validation errors

---

### signInWithCredentials

이메일/비밀번호 로그인을 처리합니다.

**Location**: src/app/actions/auth.ts

**Input (FormData)**:
| Field | Type | Required | Validation |
|-------|------|----------|------------|
| email | string | Yes | Valid email format |
| password | string | Yes | Not empty |
| callbackUrl | string | No | Valid URL path |

**Output**:
```typescript
type SignInResult = 
  | { success: true; redirectUrl: string }
  | { success: false; error: string }
```

**Behavior**:
1. Check if account is locked
2. Validate credentials
3. On failure: increment failedLoginAttempts, lock if >= 5
4. On success: reset failedLoginAttempts
5. Log LOGIN_SUCCESS or LOGIN_FAILED audit event
6. Create JWT session via NextAuth signIn()

---

### signOut

로그아웃을 처리합니다.

**Location**: src/app/actions/auth.ts

**Input**: None

**Output**:
```typescript
type SignOutResult = { success: true }
```

**Behavior**:
1. Get current session
2. Log LOGOUT audit event
3. Call NextAuth signOut()
4. Redirect to home page

---

## NextAuth.js API Routes (Framework Exception)

Constitution은 API Routes를 금지하지만, NextAuth.js는 내부적으로 API Routes를 필요로 합니다.
이는 프레임워크 요구사항으로 예외 처리됩니다.

**Route**: /api/auth/[...nextauth]

**Endpoints**:
| Path | Method | Description |
|------|--------|-------------|
| /api/auth/signin | GET | 로그인 페이지 |
| /api/auth/signout | POST | 로그아웃 처리 |
| /api/auth/callback/google | GET | Google OAuth 콜백 |
| /api/auth/callback/kakao | GET | Kakao OAuth 콜백 |
| /api/auth/session | GET | 세션 정보 조회 |
| /api/auth/csrf | GET | CSRF 토큰 |

---

## Zod Schemas

### registerSchema

```typescript
import { z } from "zod"

export const registerSchema = z.object({
  email: z
    .string()
    .email("유효한 이메일을 입력해주세요")
    .max(255),
  password: z
    .string()
    .min(8, "비밀번호는 최소 8자 이상이어야 합니다")
    .regex(/[a-zA-Z]/, "영문자를 포함해야 합니다")
    .regex(/[0-9]/, "숫자를 포함해야 합니다"),
  name: z
    .string()
    .max(50)
    .optional(),
})
```

### signInSchema

```typescript
export const signInSchema = z.object({
  email: z.string().email("유효한 이메일을 입력해주세요"),
  password: z.string().min(1, "비밀번호를 입력해주세요"),
})
```

---

## Error Codes

| Code | Message | Description |
|------|---------|-------------|
| EMAIL_EXISTS | 이미 등록된 이메일입니다 | 중복 이메일로 회원가입 시도 |
| INVALID_CREDENTIALS | 이메일 또는 비밀번호가 올바르지 않습니다 | 잘못된 로그인 정보 |
| ACCOUNT_LOCKED | 계정이 잠겼습니다 | 5회 연속 실패로 잠금 |
| OAUTH_ERROR | 소셜 로그인 중 오류가 발생했습니다 | OAuth 제공자 오류 |

---

## Rate Limiting

**Login Attempts**:
- 5회 연속 실패 시 15분 계정 잠금
- 잠금은 User.lockedUntil 필드로 관리
- 성공 시 failedLoginAttempts 리셋
