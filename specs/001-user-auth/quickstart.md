# Quickstart: 사용자 인증 시스템

**Feature**: 001-user-auth
**Date**: 2026-01-13

---

## Prerequisites

- Node.js 18+
- PostgreSQL 데이터베이스
- Google Cloud Console 계정 (OAuth)
- Kakao Developers 계정 (OAuth)

---

## 1. 패키지 설치

```bash
npm install next-auth@beta @auth/prisma-adapter
npm install prisma @prisma/client
npm install bcryptjs zod
npm install -D @types/bcryptjs
```

---

## 2. 환경변수 설정

`.env.local`:

```env
DATABASE_URL="postgresql://user:password@localhost:5432/grim"
AUTH_SECRET="generate-with-openssl-rand-base64-32"
AUTH_URL="http://localhost:3000"
GOOGLE_CLIENT_ID="xxx.apps.googleusercontent.com"
GOOGLE_CLIENT_SECRET="GOCSPX-xxx"
KAKAO_CLIENT_ID="your-rest-api-key"
KAKAO_CLIENT_SECRET="your-client-secret"
```

AUTH_SECRET 생성:
```bash
openssl rand -base64 32
```

---

## 3. Prisma 설정

```bash
npx prisma migrate dev --name init
npx prisma generate
```

---

## 4. OAuth 설정

### Google
1. Google Cloud Console
2. OAuth 2.0 Client ID 생성
3. Redirect URI: `http://localhost:3000/api/auth/callback/google`

### Kakao
1. Kakao Developers
2. 애플리케이션 생성
3. Redirect URI: `http://localhost:3000/api/auth/callback/kakao`
4. 동의항목: 닉네임, 이메일

---

## 5. 개발 서버 실행

```bash
npm run dev
```

테스트:
- http://localhost:3000/register
- http://localhost:3000/login
- http://localhost:3000/api/auth/session

---

## 6. Admin 계정 시드

```typescript
// prisma/seed.ts
import { PrismaClient } from "@prisma/client"
import bcrypt from "bcryptjs"

const prisma = new PrismaClient()

async function main() {
  const hashedPassword = await bcrypt.hash("admin123!", 12)
  await prisma.user.upsert({
    where: { email: "admin@example.com" },
    update: {},
    create: {
      email: "admin@example.com",
      password: hashedPassword,
      name: "Admin",
      role: "ADMIN",
    },
  })
}

main()
```

```bash
npx prisma db seed
```
