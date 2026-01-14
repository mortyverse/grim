# Grim - 미술 입시 커뮤니티

NextAuth.js 기반 사용자 인증 시스템이 구현된 미술 입시생을 위한 커뮤니티 및 멘토링 플랫폼입니다.

## 🎯 Implemented Features (MVP)

### ✅ Phase 1-5 Complete

- **User Authentication**
  - Email/password registration and login
  - Google OAuth integration
  - Kakao OAuth integration
  - JWT session management (24-hour expiry)
  - Password hashing with bcrypt (12 rounds)
  - Account lockout after 5 failed login attempts (15-minute lock)

- **Role-Based Access Control**
  - Three user roles: STUDENT, MENTOR, ADMIN
  - MentorStatus system: PENDING, ACTIVE, REJECTED
  - Protected routes with role-based permissions
  - Dynamic navigation based on user role

- **Protected Routes**
  - Middleware for authentication check
  - Automatic redirect to login for unauthenticated users
  - CallbackUrl preservation for post-login redirect
  - Open redirect prevention

- **Audit Logging**
  - Security event tracking (REGISTER, LOGIN_SUCCESS, LOGIN_FAILED)
  - IP address and user agent logging

## 🛠️ Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript 5.x
- **Authentication**: NextAuth.js v5 (Auth.js)
- **Database**: PostgreSQL + Prisma ORM v6
- **Validation**: Zod
- **Styling**: Tailwind CSS
- **Password Hashing**: bcryptjs

## 📋 Prerequisites

- Node.js 20+ (npm included)
- PostgreSQL 14+
- Google OAuth credentials (optional)
- Kakao OAuth credentials (optional)

## 🚀 Getting Started

### 1. Install Dependencies

```bash
npm install
```

### 2. Database Setup

Create a PostgreSQL database and update `.env.local` with your connection string.

### 3. Run Database Migrations

```bash
npx prisma migrate dev
```

### 4. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the application.

## 🔐 Security Features

- Password requirements: min 8 characters, alphanumeric
- bcrypt hashing with 12 rounds
- Account lockout after 5 failed attempts (15-minute duration)
- JWT tokens with 24-hour expiration
- CSRF protection via NextAuth
- Open redirect prevention in callbackUrl
- Audit logging for security events

## 👥 User Roles

### STUDENT (Default)
- Access to community pages and settings

### MENTOR
- All STUDENT permissions
- Access to feedback page (only when status = ACTIVE)

### ADMIN
- Full access to all pages
- User management capabilities
- Mentor approval workflow

## 📝 License

This project is part of the Grim platform development.
