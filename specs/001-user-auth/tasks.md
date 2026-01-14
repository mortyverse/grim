# Tasks: 사용자 인증 시스템 (User Authentication System)

**Feature**: 001-user-auth
**Input**: Design documents from `/specs/001-user-auth/`
**Prerequisites**: plan.md, spec.md, research.md, data-model.md, contracts/auth-actions.md

**Organization**: Tasks are grouped by user story to enable independent implementation and testing of each story.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2, US3)
- Include exact file paths in descriptions

---

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Project initialization and basic structure

- [X] T001 Initialize Next.js 16 project with TypeScript 5.x and App Router
- [X] T002 [P] Install core dependencies (next-auth@beta, @auth/prisma-adapter, prisma, @prisma/client, bcryptjs, zod)
- [X] T003 [P] Install dev dependencies (@types/bcryptjs)
- [X] T004 [P] Configure TypeScript strict mode in tsconfig.json
- [X] T005 [P] Setup project directory structure per plan.md (src/app/, src/components/, src/lib/, src/types/, prisma/)
- [X] T006 [P] Create .env.local with required environment variables (DATABASE_URL, AUTH_SECRET, AUTH_URL, GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, KAKAO_CLIENT_ID, KAKAO_CLIENT_SECRET)
- [X] T007 Generate AUTH_SECRET using openssl rand -base64 32

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Core infrastructure that MUST be complete before ANY user story can be implemented

**⚠️ CRITICAL**: No user story work can begin until this phase is complete

- [X] T008 Create Prisma schema with User, Account, Session, AuditLog models in prisma/schema.prisma
- [X] T009 [P] Define UserRole enum (STUDENT, MENTOR, ADMIN) in prisma/schema.prisma
- [X] T010 [P] Define MentorStatus enum (PENDING, ACTIVE, REJECTED) in prisma/schema.prisma
- [X] T009.5 [P] Add User.failedLoginAttempts (Int @default(0)) and User.lockedUntil (DateTime?) fields to User model in prisma/schema.prisma
- [X] T011 Run initial Prisma migration (npx prisma migrate dev --name init)
- [X] T012 Generate Prisma client (npx prisma generate)
- [X] T013 Create Prisma client instance in src/lib/db.ts
- [X] T014 Create NextAuth.js configuration in src/lib/auth.ts with JWT strategy
- [X] T015 [P] Configure Google OAuth provider in src/lib/auth.ts
- [X] T016 [P] Configure Kakao OAuth provider in src/lib/auth.ts
- [X] T017 [P] Configure Credentials provider for email/password in src/lib/auth.ts
- [X] T018 Extend NextAuth types for role field in src/types/next-auth.d.ts
- [X] T019 Create NextAuth API route handler in src/app/api/auth/[...nextauth]/route.ts
- [X] T020 Create Zod validation schemas (registerSchema, signInSchema) in src/lib/validations/auth.ts
- [X] T021 [P] Create base UI components (Button) in src/components/ui/button.tsx
- [X] T022 [P] Create base UI components (Input) in src/components/ui/input.tsx
- [X] T023 [P] Create base UI components (Form) in src/components/ui/form.tsx

**Checkpoint**: Foundation ready - user story implementation can now begin in parallel

---

## Phase 3: User Story 1 - 학생 회원가입 및 로그인 (Priority: P1) 🎯 MVP

**Goal**: 미술 입시생이 플랫폼에 가입하여 커뮤니티와 멘토 피드백 서비스에 접근할 수 있다.

**Independent Test**: 학생이 이메일 또는 소셜 계정으로 회원가입하고, 로그인하여 커뮤니티 페이지에 접근하는 것으로 테스트 가능.

### Implementation for User Story 1

- [X] T024 [P] [US1] Create register Server Action in src/app/actions/auth.ts (email/password registration with validation, bcrypt hashing, role=STUDENT, audit logging)
- [X] T025 [P] [US1] Create signInWithCredentials Server Action in src/app/actions/auth.ts (credential validation, account lock check, failed attempt tracking, audit logging)
- [X] T026 [P] [US1] Create LoginForm client component in src/components/auth/login-form.tsx (with useActionState for form state management)
- [X] T027 [P] [US1] Create RegisterForm client component in src/components/auth/register-form.tsx (with useActionState for form state management)
- [X] T028 [P] [US1] Create SocialButtons client component in src/components/auth/social-buttons.tsx (Google and Kakao OAuth buttons)
- [X] T029 [US1] Create auth layout in src/app/(auth)/layout.tsx (public layout for auth pages)
- [X] T030 [US1] Create login page in src/app/(auth)/login/page.tsx (integrating LoginForm and SocialButtons)
- [X] T031 [US1] Create register page in src/app/(auth)/register/page.tsx (integrating RegisterForm and SocialButtons)
- [X] T032 [US1] Implement email uniqueness check in register action
- [X] T033 [US1] Implement password hashing with bcryptjs (12 rounds) in register action
- [X] T034 [US1] Implement account lock mechanism (5 failures → 15min lock) in signInWithCredentials action using User.failedLoginAttempts and User.lockedUntil fields; reset failedLoginAttempts on successful login
- [X] T035 [US1] Add audit log creation for REGISTER event in register action
- [X] T036 [US1] Add audit log creation for LOGIN_SUCCESS and LOGIN_FAILED events in signInWithCredentials action
- [X] T037 [US1] Configure OAuth callback URLs for Google and Kakao in provider settings

**Checkpoint**: At this point, User Story 1 should be fully functional - users can register with email or social accounts and log in

---

## Phase 4: User Story 2 - 역할 기반 접근 제어 (Priority: P1)

**Goal**: 시스템이 사용자의 역할(Student, Mentor, Admin)에 따라 적절한 페이지와 기능에 대한 접근을 제어한다.

**Independent Test**: 각 역할의 사용자가 허용된 페이지에만 접근 가능하고, 비허용 페이지 접근 시 적절히 차단되는지 테스트 가능.

### Implementation for User Story 2

- [X] T038 [P] [US2] Create role utility functions in src/lib/auth.ts (hasRole, requireRole, canAccessResource)
- [X] T039 [P] [US2] Create protected layout with role check in src/app/(dashboard)/layout.tsx
- [X] T040 [P] [US2] Create community page (Student-accessible) in src/app/(dashboard)/community/page.tsx
- [X] T041 [P] [US2] Create mentor feedback page (Mentor/Admin-accessible) in src/app/(dashboard)/mentor/feedback/page.tsx
- [X] T042 [P] [US2] Create admin dashboard page (Admin-only) in src/app/(dashboard)/admin/page.tsx
- [X] T043 [US2] Implement role-based access control checks in protected layout
- [X] T044 [US2] Add unauthorized access error handling (403 Forbidden with appropriate message)
- [X] T045 [US2] Test Student role access (community: yes, mentor pages: no, admin: no)
- [X] T046 [US2] Test Mentor (Active) role access (community: yes, feedback: yes, admin: no)
- [X] T047 [US2] Test Admin role access (all pages: yes)
- [ ] T047.5 [US2] Create audit log viewer page (Admin-only) in src/app/(dashboard)/admin/audit-logs/page.tsx with filtering by event type (REGISTER, LOGIN_SUCCESS, LOGIN_FAILED, LOGOUT, ROLE_CHANGE, ACCOUNT_LINKED), user email, and date range

**Checkpoint**: Role-based access control is fully functional - users can only access pages appropriate to their role

---

## Phase 5: User Story 3 - 보호된 라우트 미들웨어 (Priority: P2)

**Goal**: 비로그인 사용자가 보호된 페이지에 접근하려고 할 때 로그인 페이지로 리다이렉트된다.

**Independent Test**: 비로그인 상태에서 보호된 URL에 직접 접근 시 로그인 페이지로 리다이렉트되고, 로그인 후 원래 URL로 돌아오는지 테스트 가능.

### Implementation for User Story 3

- [X] T048 [US3] Create Next.js middleware in middleware.ts at repository root
- [X] T049 [US3] Implement session check using NextAuth getToken in middleware.ts
- [X] T050 [US3] Define protected route patterns in middleware.ts (dashboard/* routes)
- [X] T051 [US3] Implement redirect to login page for unauthenticated users in middleware.ts
- [X] T052 [US3] Implement callbackUrl preservation for post-login redirect in middleware.ts using URLSearchParams 'callbackUrl' parameter; validate callbackUrl starts with '/' (prevent open redirect); encode with encodeURIComponent; pass to NextAuth signIn(provider, { callbackUrl })
- [X] T053 [US3] Configure middleware matcher to apply to protected routes only
- [X] T054 [US3] Test unauthenticated access to protected pages redirects to login
- [X] T055 [US3] Test authenticated access to protected pages allows normal access
- [X] T056 [US3] Test post-login redirect returns user to originally requested page

**Checkpoint**: Protected route middleware is fully functional - unauthenticated users are properly redirected

---

## Phase 6: User Story 4 - 세션 관리 (Priority: P2)

**Goal**: 사용자의 로그인 상태가 안전하게 유지되고, 로그아웃 시 세션이 완전히 종료된다.

**Independent Test**: 로그인 후 브라우저를 닫았다 다시 열어도 로그인 상태가 유지되고, 로그아웃 후에는 완전히 세션이 종료되는지 테스트 가능.

### Implementation for User Story 4

- [ ] T057 [US4] Configure JWT session expiration (24 hours) in src/lib/auth.ts
- [ ] T058 [US4] Implement JWT token refresh mechanism in src/lib/auth.ts
- [ ] T059 [US4] Create signOut Server Action in src/app/actions/auth.ts (with audit logging)
- [ ] T060 [US4] Create logout button component in src/components/auth/logout-button.tsx
- [ ] T061 [US4] Add logout button to protected layout in src/app/(dashboard)/layout.tsx
- [ ] T062 [US4] Add LOGOUT audit log creation in signOut action
- [ ] T063 [US4] Implement session persistence across browser restarts (within 24h expiry)
- [ ] T064 [US4] Implement cache headers to prevent cached page access after logout
- [ ] T065 [US4] Test session persistence after browser close/reopen
- [ ] T066 [US4] Test complete session termination after logout
- [ ] T067 [US4] Test no cached content accessible after logout (back button)

**Checkpoint**: Session management is fully functional - sessions persist appropriately and terminate cleanly

---

## Phase 7: User Story 5 - 기존 소셜 계정 연동 (Priority: P3)

**Goal**: 이메일로 가입한 사용자가 나중에 소셜 계정을 연동하거나, 동일 이메일의 소셜 계정으로 로그인할 수 있다.

**Independent Test**: 이메일로 가입한 계정에 Google/Kakao 계정을 연동하고, 이후 소셜 로그인으로도 같은 계정에 접근 가능한지 테스트 가능.

### Implementation for User Story 5

- [ ] T068 [P] [US5] Implement account linking logic in NextAuth callbacks (signIn callback) in src/lib/auth.ts
- [ ] T069 [P] [US5] Create settings page for account management in src/app/(dashboard)/settings/page.tsx
- [ ] T070 [US5] Add email matching logic to link social accounts to existing email accounts
- [ ] T071 [US5] Create social account linking UI in settings page
- [ ] T072 [US5] Implement linkAccount Server Action in src/app/actions/auth.ts
- [ ] T073 [US5] Add audit logging for ACCOUNT_LINKED events
- [ ] T074 [US5] Test existing email user can login with matching Google account
- [ ] T075 [US5] Test existing email user can login with matching Kakao account
- [ ] T076 [US5] Test manual account linking from settings page

**Checkpoint**: Account linking is fully functional - users can connect multiple auth methods to one account

---

## Phase 8: Polish & Cross-Cutting Concerns

**Purpose**: Improvements that affect multiple user stories

- [ ] T077 [P] Create admin seed script in prisma/seed.ts (create default admin account)
- [ ] T078 Run admin seed script (npx prisma db seed)
- [ ] T079 [P] Add comprehensive error handling for OAuth provider failures
- [ ] T080 [P] Add user-friendly error messages for all authentication errors
- [ ] T081 [P] Implement rate limiting display (show remaining lockout time)
- [ ] T082 [P] Add loading states to all authentication forms
- [ ] T083 [P] Add security headers configuration in next.config.js
- [ ] T084 [P] Verify all audit log events are properly recorded
- [ ] T085 [P] Test edge cases: duplicate email registration, 5+ failed logins, expired sessions
- [ ] T086 [P] Validate CSRF protection is working
- [ ] T087 [P] Test concurrent login attempts handling
- [ ] T088 Run complete quickstart.md validation
- [ ] T089 [P] Add JSDoc comments to public API functions
- [ ] T090 Update CLAUDE.md with authentication system implementation details

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies - can start immediately
- **Foundational (Phase 2)**: Depends on Setup completion - BLOCKS all user stories
- **User Stories (Phase 3-7)**: All depend on Foundational phase completion
  - User stories can then proceed in parallel (if staffed)
  - Or sequentially in priority order (P1 US1 → P1 US2 → P2 US3 → P2 US4 → P3 US5)
- **Polish (Phase 8)**: Depends on all desired user stories being complete

### User Story Dependencies

- **User Story 1 (P1)**: Can start after Foundational (Phase 2) - No dependencies on other stories
- **User Story 2 (P1)**: Can start after Foundational (Phase 2) - Integrates with US1 auth but independently testable
- **User Story 3 (P2)**: Can start after Foundational (Phase 2) - Uses US1 login but independently testable
- **User Story 4 (P2)**: Can start after US1 (needs login functionality) - Extends session behavior
- **User Story 5 (P3)**: Can start after US1 and US2 (needs basic auth and settings page) - Account linking feature

### Within Each User Story

- Server Actions before UI components that use them
- Core components before pages that integrate them
- Basic functionality before edge case handling
- Implementation before validation tests
- Story complete before moving to next priority

### Parallel Opportunities

**Phase 1 (Setup)**: T002, T003, T004, T005, T006 can run in parallel

**Phase 2 (Foundational)**:
- T009, T010 can run in parallel (enum definitions)
- T015, T016, T017 can run in parallel (OAuth provider configs)
- T021, T022, T023 can run in parallel (UI components)

**Phase 3 (User Story 1)**:
- T024, T025 can run in parallel (Server Actions)
- T026, T027, T028 can run in parallel (Auth components)

**Phase 4 (User Story 2)**:
- T038, T039, T040, T041, T042 can run in parallel (different files)

**Phase 7 (User Story 5)**:
- T068, T069 can run in parallel (different concerns)

**Phase 8 (Polish)**:
- T077, T079, T080, T081, T082, T083, T084, T085, T086, T087, T089 can all run in parallel

---

## Parallel Example: User Story 1 (MVP Core)

```bash
# Launch all Server Actions for User Story 1 together:
Task: "Create register Server Action in src/app/actions/auth.ts"
Task: "Create signInWithCredentials Server Action in src/app/actions/auth.ts"

# Then launch all UI components for User Story 1 together:
Task: "Create LoginForm client component in src/components/auth/login-form.tsx"
Task: "Create RegisterForm client component in src/components/auth/register-form.tsx"
Task: "Create SocialButtons client component in src/components/auth/social-buttons.tsx"
```

---

## Implementation Strategy

### MVP First (User Stories 1 & 2 Only - Both P1)

1. Complete Phase 1: Setup (T001-T007)
2. Complete Phase 2: Foundational (T008-T023) - CRITICAL: blocks all stories
3. Complete Phase 3: User Story 1 (T024-T037) - Basic registration and login
4. Complete Phase 4: User Story 2 (T038-T047) - Role-based access control
5. **STOP and VALIDATE**: Test that users can register, login, and access role-appropriate pages
6. Deploy/demo if ready

**Why US1 + US2 = MVP**: User registration/login alone (US1) is insufficient without role-based access control (US2) because the platform depends on Student/Mentor/Admin distinction for core workflows.

### Incremental Delivery

1. Complete Setup + Foundational → Foundation ready
2. Add User Stories 1 & 2 (both P1) → Test independently → Deploy/Demo (MVP!)
3. Add User Story 3 (P2) → Test independently → Deploy/Demo (protected routes)
4. Add User Story 4 (P2) → Test independently → Deploy/Demo (session management)
5. Add User Story 5 (P3) → Test independently → Deploy/Demo (account linking)
6. Add Phase 8: Polish → Final testing → Production deploy

### Parallel Team Strategy

With multiple developers:

1. Team completes Setup + Foundational together
2. Once Foundational is done:
   - Developer A: User Story 1 (T024-T037)
   - Developer B: User Story 2 (T038-T047)
   - Developer C: User Story 3 (T048-T056)
3. Stories complete and integrate independently
4. Test integration points
5. Proceed to remaining stories

---

## Notes

- **[P] tasks**: Different files, no dependencies - safe for parallel execution
- **[Story] label**: Maps task to specific user story for traceability
- Each user story should be independently completable and testable
- Commit after each task or logical group
- Stop at any checkpoint to validate story independently
- **MVP consists of User Stories 1 & 2 (both P1)**: Basic auth + role-based access control
- User Stories 3-5 add progressive enhancement: route protection, session management, account linking
- Phase 2 (Foundational) is CRITICAL and must be 100% complete before any user story work begins
- All NextAuth configuration happens in Phase 2 to enable all auth flows
- OAuth providers (Google, Kakao) are configured in Phase 2 and used throughout US1-US5
