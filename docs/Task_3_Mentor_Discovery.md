# Task 3: Mentor Discovery & Profile

## 1. Objective
Build the interface and search logic for Students to find the "Right" Mentor.
This involves complex filtering and a trustworthy profile presentation.

## 2. Context & Requirements
(Refer to PRD Section 4.2)

### 2.1 Search & Filtering
Users need to filter mentors by explicit criteria to match their specific exam goals.
*   **Major**: Western Painting (Su-chae-hwa), Oriental Painting, Design, Sculpture.
*   **School**: Specific Universities (Hongik, SNU, K-Arts, etc.).
*   **Status**: Online/Offline (Active Now).

### 2.2 Mentor Profile Page
Must establish credibility instantly.
*   **Badges**: Visual indicators of verified status (e.g., "🎓 Hongik Univ Verified", "🏆 Award Winner").
*   **Stats**:
    *   Rating (Average star score).
    *   Response Rate / Average Response Time.
    *   "Review Tags": Aggregated keywords from students (e.g., #Detailed, #HarshButTrue).
*   **Portfolio (Gallery)**:
    *   A grid of previous public feedback given by this mentor.
    *   Crucial for students to judge the mentor's drawing/teaching style.

## 3. Technical Considerations (AI Agent Guidance)
*   **Database Indexing**:
    *   `MentorProfiles` table needs indexes on `major`, `university`, and `rating` for fast filtering.
*   **Search Engine**:
    *   For MVP, SQL `WHERE` clauses are sufficient.
    *   For Scalability, consider readying architecture for Keyword Search (Elasticsearch/Algolia) later.
*   **Privacy**:
    *   Mentors need a toggle to "Hide Profile" or set "Not Taking Requests" status.

## 4. Deliverables
### 4.1 Backend APIs
*   [ ] **Search API**: Implement `GET /api/mentors` with filters (major, university) and sorting.
*   [ ] **Profile API**: Implement `GET /api/mentors/:id` (Basic Info + Stats).
*   [ ] **Portfolio API**: Implement `GET /api/mentors/:id/portfolio` (Recent feedback items).

### 4.2 Frontend Components
*   [ ] **Mentor Card**: Reusable card component showing Avatar, Name, Badge, Major, Rating.
*   [ ] **Discovery Page**: Layout with Sidebar (Filters) and Main Grid (Mentor Cards).
*   [ ] **Profile Detail**: Full page view with Portfolio Grid and Sticky "Request Feedback" CTA.
