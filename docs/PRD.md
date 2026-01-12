# 🚀 PRD: Mentoring & Community Platform for Art School Applicants (ArtFeedback)

## 1. Project Overview
*   **Project Purpose**: A platform connecting art school applicants (Mentees) with verified mentors (Art Majors/Instructors) to share artwork and provide professional 1:1 visual feedback (critique/correction).
*   **Core Values**:
    *   **Reliability**: A pool of mentors verified through various documentation methods.
    *   **Intuitiveness**: An intuitive feedback experience involving direct drawing/notes on the image.
    *   **Affordability**: Reasonable 1:1 coaching using a point system, alleviating the burden of expensive academy fees.

---

## 2. Target Users & User Stories (Personas)
*Specific situations and needs of users that this project aims to address.*

### 2.1 Personas

#### 👩‍🎨 Persona A: "Anxious Applicant from a Small Town" Min-ji Kim (18, High School Senior)
*   **Situation**: Attends a local art academy in a small city. Feels the teacher's style doesn't fit her or is anxious about having a limited perspective compared to students in Seoul.
*   **Needs**:
    *   "How would seniors who got into top-tier art schools in Seoul evaluate my drawing?"
    *   "Traveling to Seoul for special weekend classes is too burdensome in terms of time and cost."
    *   "Instead of long text evaluations, **I want someone to fix the incorrect parts directly on my drawing.**"

#### 🎨 Persona B: "Efficiency-Seeking Art Student Mentor" Jun-ho Lee (21, Sophomore)
*   **Situation**: Design major at Hongik University. Wants to do tutoring for pocket money but finds travel time and schedule coordination burdensome.
*   **Needs**:
    *   "I want to earn some pocket money during spare time between classes or 30 minutes before bed."
    *   "It's hard to find tutoring gigs; I want to build a portfolio to prove my skills."
    *   "I want to provide practical help to students who will become my juniors."

#### 🖌️ Persona C: "Instructor Expanding Expertise" Su-jin Park (29, Art Academy Instructor)
*   **Situation**: Full-time instructor at a franchise art academy. Wants to promote her teaching skills to a wider range of students beyond her current workplace.
*   **Needs**:
    *   "I want to generate side income non-face-to-face outside of work hours."
    *   "I want to archive my feedback style and use it for promotion when I open my own class later."

### 2.2 Key User Stories

| Category | Role | User Story (As a..., I want to..., So that...) |
| :--- | :--- | :--- |
| **Discovery** | Student | **I want to filter mentors** who share my target university/major. <br> *So that I can get advice aligned with my entrance exam direction.* |
| **Trust** | Student | **I want to see public feedback (portfolio)** left by the mentor previously. <br> *So that I can verify their skills before spending my points (money).* |
| **Request** | Student | **I want to set my drawing to 'Private'** when asking a question. <br> *So that I can get feedback without showing my skills to the public because I am shy.* |
| **Feedback** | Mentor | **I want to 'Over-paint' directly** on a layer above the student's image. <br> *Because correcting form or tone directly is much faster and more accurate than explaining with words.* |
| **Reward** | Mentor | **I want to leave feedback in my spare time and earn points.** <br> *So that I can generate income without time or space constraints unlike offline tutoring.* |
| **Verify** | Admin | **I want to review various types of proof documents** (Enrollment/Graduation/Employment). <br> *So that I can expand the mentor pool to include current instructors while maintaining credibility.* |

---

## 3. User Roles & Signup Process Details

### 3.1 Student
*   **Sign Up**: Email / Social Login.
*   **Initial Benefit**: Free points granted upon sign-up (e.g., 1,000 P) → Induce first question.
*   **Permissions**: Community activity, requesting 1:1 questions (consumes points), writing mentor evaluations.

### 3.2 Mentor
*   **Eligibility**: Users who can prove their expertise.
*   **Proof Document Upload (Required)**: Must submit at least one of the following documents:
    *   **Certificate of Enrollment / Leave of Absence** (University Students)
    *   **Certificate of Graduation / Degree** (Graduates)
    *   **Certificate of Employment** (Art Academy Instructors, Designers, Artists, etc.)
    *   **Certificate of Award** (Major competition winners, optionally accepted)
*   **Approval Process**:
    *   `Pending`: Can only view the community immediately after signup. Cannot perform feedback activities.
    *   `Active`: Upon Admin approval of documents, a 'Mentor Badge' is granted, and activities begin.

### 3.3 Admin
*   **Mentor Review**: Check the authenticity of uploaded documents and process as `[Approve]` or `[Reject]` (with reason).

---

## 4. Functional Requirements

### 4.1 Point System (Economy)
*   **Structure**: Manage point balance per user and record transaction history.
*   **Transactions**: Record acquisition (charge/event) and consumption (question) to ensure transparency.
*   **Policies**:
    *   Sign-up/Attendance: `+N` Points (Reward).
    *   1:1 Question Request: `-N` Points (Payment).
    *   *(Vision)* Future consideration for mentors to cash out points or exchange for gift cards.

### 4.2 Mentor Discovery & Profile
*   **Entry Points**: [Find Mentor] Tab or Community Feed.
*   **Filtering**: By Major (Western Painting/Oriental Painting/Design/Sculpture), By School, Activity Status (Online).
*   **Mentor Profile**:
    *   **Verification Badge**: Marks based on documents (e.g., 🎓 Hongik Univ, 💼 Certified Instructor).
    *   **Feedback Gallery**: Thumbnails of 'Public' feedback cases.
    *   **Reputation System**: Rating (5.0) and Tag-style reviews (e.g., "Meticulous", "Easy explanation").

### 4.3 1:1 Question & Drawing Feedback (Core Feature)
*   **[Student] Ask a Question**:
    1.  Select Mentor and click `Ask`.
    2.  Upload Image (High-quality support).
    3.  Write Question (e.g., "The metal texture looks too awkward.").
    4.  **Set Visibility** (Public/Private; Private might cost extra points).
*   **[Mentor] Provide Feedback (Canvas Tool)**:
    1.  Load student image as background.
    2.  **Drawing Tools**: Brush (Color/Size), Highlighter (Opacity), Shapes (Arrow/Circle).
    3.  **Layers**: Overlay method to draw on top without damaging the original.
    4.  **Text Comment**: Write theoretical supplementary explanations not conveyed by drawing.
*   **[Common] Check Result**:
    *   Before (Original) / After (Feedback) comparison feature (Slider or Tab toggle).

### 4.4 Community (Gallery Feed)
*   **Purpose**: Sharing exam info, viewing passing artworks, and mutual encouragement.
*   **UI**: Pinterest-style Masonry Grid layout.
*   **Feature**: Comments left by mentors are **Highlighted** to provide credibility.

---

## 5. UI/UX Design Requirements
*   **Tone & Manner**: Immersive 'Dark Mode' (to prevent color perception distortion) or clean 'Minimal White'.
*   **Responsive Viewer**: Canvas features must support both PC (Mouse) and Mobile/Tablet (Touch, Pencil) environments.
*   **Loading Optimization**: Use Progressive Loading in gallery lists (load low-res thumbnail first, high-res original on click).

---

## 6. Technical Constraints
*   **File Upload**: Single file size limit set to 20MB.
*   **Image Aspect Ratio**: Since exam artworks are often vertically long (e.g., 4-6 size paper), a viewer design that maintains original ratio while filling the screen is required.