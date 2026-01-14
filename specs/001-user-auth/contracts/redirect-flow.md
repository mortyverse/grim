# Redirect Flow Contract

## Post-Login Redirect Behavior

### Flow

1. User attempts to access protected page `/dashboard/community`
2. Middleware detects unauthenticated request
3. Middleware redirects to `/login?callbackUrl=%2Fdashboard%2Fcommunity`
4. User completes login
5. NextAuth redirects to decoded callbackUrl: `/dashboard/community`

### Implementation

**Middleware (middleware.ts)**:
```typescript
const callbackUrl = encodeURIComponent(request.nextUrl.pathname)
return NextResponse.redirect(new URL(`/login?callbackUrl=${callbackUrl}`, request.url))
```

**Login Page (app/(auth)/login/page.tsx)**:
```typescript
const searchParams = useSearchParams()
const callbackUrl = searchParams.get('callbackUrl') || '/dashboard'

// Validate to prevent open redirect
const isValidCallback = callbackUrl.startsWith('/')
const safeCallbackUrl = isValidCallback ? callbackUrl : '/dashboard'

// Pass to signIn
await signIn('credentials', {
  email,
  password,
  callbackUrl: safeCallbackUrl
})
```

### Security

- **Open Redirect Prevention**: Only allow relative paths (must start with `/`)
- **Encoding**: Use `encodeURIComponent` for URL safety
- **Default Fallback**: If callbackUrl invalid or missing, redirect to `/dashboard`

### Edge Cases

- Missing callbackUrl: Default to `/dashboard`
- External URL (e.g., `https://evil.com`): Reject, use `/dashboard`
- Already authenticated: Redirect to callbackUrl immediately (skip login)

### Test Cases

1. **Valid relative path**:
   - Input: `callbackUrl=/dashboard/community`
   - Expected: Redirect to `/dashboard/community` after login

2. **External URL attack**:
   - Input: `callbackUrl=https://evil.com`
   - Expected: Reject, redirect to `/dashboard`

3. **Protocol-relative URL attack**:
   - Input: `callbackUrl=//evil.com`
   - Expected: Reject, redirect to `/dashboard`

4. **Missing callbackUrl**:
   - Input: (no parameter)
   - Expected: Redirect to `/dashboard` after login

5. **Encoded URL**:
   - Input: `callbackUrl=%2Fdashboard%2Fsettings`
   - Expected: Redirect to `/dashboard/settings` after login

### References

- NextAuth.js callback URL: https://next-auth.js.org/configuration/pages#credentials-sign-in
- OWASP Open Redirect: https://cheatsheetseries.owasp.org/cheatsheets/Unvalidated_Redirects_and_Forwards_Cheat_Sheet.html
