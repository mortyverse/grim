# GEMINI.md

## Project Overview

This project, "Grim," is a web application for an art school entrance exam community and mentoring platform. It is built with Next.js (App Router) and TypeScript.

The application features a robust user authentication system using NextAuth.js, with support for email/password, Google, and Kakao OAuth providers. It implements role-based access control (RBAC) with three roles: `STUDENT`, `MENTOR`, and `ADMIN`.

The backend is powered by a PostgreSQL database with Prisma as the ORM. The database schema includes models for users, accounts, sessions, and audit logs. Security is a key focus, with features like password hashing using bcrypt, account lockout policies, and CSRF protection.

The frontend is built with React and styled with Tailwind CSS. It includes a custom UI component library. The application is a single-page application (SPA) with protected routes and a middleware for authentication checks.

## Building and Running

### Prerequisites

- Node.js 20+
- PostgreSQL 14+

### 1. Install Dependencies

```bash
npm install
```

### 2. Database Setup

Create a PostgreSQL database and set the `DATABASE_URL` environment variable in a `.env.local` file.

### 3. Run Database Migrations

```bash
npx prisma migrate dev
```

### 4. Run Development Server

```bash
npm run dev
```

The application will be available at [http://localhost:3000](http://localhost:3000).

### Other Commands

- **Build for production:** `npm run build`
- **Start production server:** `npm run start`
- **Lint the code:** `npm run lint`

## Development Conventions

### Code Style

- The project uses ESLint with the `eslint-config-next` configuration for code style and quality.
- The configuration is in `eslint.config.mjs`.
- TypeScript is used throughout the project with strict mode enabled.
- The `tsconfig.json` file defines the TypeScript compiler options.

### Authentication

- Authentication is handled by NextAuth.js v5.
- The configuration is in `lib/auth.ts`.
- It supports credentials (email/password), Google, and Kakao providers.
- Server Actions are used for registration and sign-in logic (`app/actions/auth.ts`).

### Database

- Prisma is used as the ORM for interacting with the PostgreSQL database.
- The database schema is defined in `prisma/schema.prisma`.
- The `db.ts` file in the `lib` directory likely contains the Prisma client instance.

### UI Components

- The project has a custom UI component library in `components/ui`.
- The `Button` component in `components/ui/button.tsx` is an example of a custom component with different variants and sizes.

### Routing and Middleware

- The application uses the Next.js App Router.
- The `middleware.ts` file implements protected routes by checking for an authentication token in the cookies.
- Unauthenticated users are redirected to the `/login` page.
