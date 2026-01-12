# Task 1: Authentication & User Role Management

## 1. Objective
Implement the authentication system and user role management logic as described in the PRD (Section 3).
This forms the foundation of the platform, distinguishing between **Students**, **Mentors**, and **Admins**.

## 2. Context & Requirements

### 2.1 User Roles
*   **Student**: Default role upon signup. Can view community, recharge points, and request feedback.
*   **Mentor**: Requires strict verification.
    *   **Pending**: Signed up but not verified. Can only view community.
    *   **Active**: Documents approved by Admin. Can receive requests and earn points.
*   **Admin**: Special role for managing mentor approvals.

### 2.2 Signup & Onboarding Flow
1.  **Common**: Email/Social Login (Google/Kakao).
2.  **Student Specific**:
    *   Grant **1,000 Points** welcome bonus immediately upon signup to encourage first interaction.
3.  **Mentor Specific**:
    *   **Document Upload Interface**: Multi-file upload for proof of expertise (Enrollment/Graduation/Employment/Awards).
    *   **Status Tracking**: Dashboard showing "Pending Verification" status.

### 2.3 Admin Dashboard (MVP)
*   **Mentor Review List**: View users with `Pending` status.
*   **Action**:
    *   View uploaded documents.
    *   **Approve**: Changes status to `Active`, sends notification, awards "Mentor Badge".
    *   **Reject**: Changes status to `Rejected` (or reverts to Student), requires entering a Reason.

## 3. Technical Considerations (AI Agent Guidance)
*   **Database Schema**:
    *   `Users` table: `id`, `email`, `role` (enum: STUDENT, MENTOR, ADMIN), `status` (PENDING, ACTIVE, REJECTED), `point_balance`.
    *   `MentorProfiles` table: `user_id`, `university`, `major`, `bio`, `verification_documents` (JSON array of URLs).
*   **Security**: Ensure `verification_documents` are stored in a private bucket/folder, accessible only by Admin rules.
*   **Scalability**: Design the role system to be extensible (e.g., potential future 'Pro Mentor' or 'Organization' roles).

## 4. Deliverables
*   [ ] Database Schema creation/migration for Users and Profiles.
*   [ ] Authentication API (Signup/Login/Logout).
*   [ ] File Upload API for mentor documents.
*   [ ] Admin API for reviewing and updating mentor status.
*   [ ] Frontend: Login Page, Signup Page (Role selection), Mentor Application Form, Admin Review Panel.
