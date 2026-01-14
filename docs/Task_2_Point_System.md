# Task 2: Point System (Economy)

## 1. Objective
Implement the internal currency system ("Points") that drives the platform's economy.
This covers point acquisition (Charging/Rewards) and consumption (Payments for Feedback).

## 2. Context & Requirements
(Refer to PRD Section 4.1)

### 2.1 Core Logic
*   **Currency**: "Points" (Integer).
*   **Wallet**: Each user has a `point_balance`. Cannot be negative.
*   **Ledger**: EVERY change in points must have a corresponding Transaction Record (Audit trail).

### 2.2 Transaction Types
1.  **Reward (Source: System)**
    *   `SIGNUP_BONUS`: +1,000 P (Triggered one-time on account creation).
    *   `ATTENDANCE_DAILY`: +N P (Optional future feature, keep architecture open).
2.  **Payment (Source: Student -> Destination: Mentor/Platform)**
    *   `QUESTION_FEE`: -N P (Student).
    *   `MENTOR_EARNING`: +M P (Mentor) - *Consider platform fee logic here if needed, or 1:1 transfer for MVP.*
3.  **Charge (Source: External Payment)**
    *   `PURCHASE`: +N P (Real money purchase - PG integration or simple mock for MVP).

## 3. Technical Considerations (AI Agent Guidance)
*   **Database Schema**:
    *   `Transactions` table: `id`, `user_id`, `amount` (+/-), `type` (ENUM), `related_entity_id` (e.g., question_id), `created_at`.
    *   **Atomicity**: Point deduction and Service provision must happen in a Transaction (DB Transaction).
*   **Race Conditions**: Prevent double-spending. Use database row locking (`SELECT FOR UPDATE`) or optimistic locking when updating balance.
*   **Security**: Server-side validation of point sufficiency before processing any request.

## 4. Deliverables
### 4.1 Database & Core Logic
*   [ ] **Schema Design**: Create `Transactions` table (Id, UserId, Amount, Type, RelatedId).
*   [ ] **Transaction Service**: Implement `processTransaction()` with ACID compliance (using DB transactions).
*   [ ] **Signup Bonus**: Add hook in Auth service to trigger `processTransaction(user, +1000, SIGNUP_BONUS)` on creation.

### 4.2 API & Integration
*   [ ] **History API**: Implement `GET /api/points/history` with pagination.
*   [ ] **Mock Payment**: Implement `POST /api/payments/mock` to simulate charging points (for Dev/Testing).
