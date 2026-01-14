# Task 5: Community & Gallery Feed

## 1. Objective
Create the public feed where students view passing artworks and shared feedback.
This functionality drives user retention and discovery.

## 2. Context & Requirements
(Refer to PRD Section 4.4)

### 2.1 Masonry Grid Layout
*   Artworks have varying aspect ratios (often vertical).
*   Use a Pinterest-style layout to maximize screen real estate and aesthetic appeal.
*   **Infinite Scroll**: Load more items as the user scrolls down.

### 2.2 Feed Item Content
*   **Thumbnail**: High-quality crop.
*   **Meta**: Title, Student Name (Anonymized option), Mentor Name (if feedback is present).
*   **Status**: `Looking for Feedback` vs `Feedback Complete`.

### 2.3 Interactions
*   **Detail View**: Modal or separate page showing the artwork + comments.
*   **Comments**: Standard text thread.
    *   **Mentor Highlight**: If a verified Mentor comments, their background/badge should make the comment stand out (e.g., Gold border).

## 3. Technical Considerations (AI Agent Guidance)
*   **Frontend**:
    *   Library: `react-masonry-css` or plain CSS Grid `grid-template-rows: masonry` (experimental) -> Stick to JS-based solutions for cross-browser compatibility.
*   **Optimization**:
    *   **Blurhash**: Display a blurred placeholder while the image loads.
    *   **Pagination**: Cursor-based pagination (using `created_at` or `id`) for the feed API.

## 4. Deliverables
### 5.1 Backend
*   [ ] **Feed API**: Implement `GET /api/feed` with cursor-based pagination.
*   [ ] **Filtering**: Add query params for `status` (All, Waiting, Completed).

### 5.2 Frontend Components
*   [ ] **Masonry Layout**: Implement responsive grid (using `react-masonry-css` or similar).
*   [ ] **Feed Card**: specific card design showing Artwork + Title + Mentor Name.
*   [ ] **Interaction**: Implement Comment section (with Mentor badge highlighting) and Like button.
