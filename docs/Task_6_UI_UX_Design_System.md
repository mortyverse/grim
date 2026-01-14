# Task 6: UI/UX Design System

## 1. Objective
Establish the global look and feel of "ArtFeedback" (Grim-Feedback).
Given the artistic audience, the design must be **Premium, Dark Mode-first, and highly responsive**.

## 2. Context & Requirements
(Refer to PRD Section 5)

### 2.1 Visual Identity
*   **Theme**: Dark Mode is default. (Artworks often have white backgrounds/paper; Dark UI provides better contrast and less eye strain).
*   **Accent Color**: Use a sophisticated accent (e.g., Deep Purple or Neon Lime) sparingly. Avoid generic Bootstrap/Tailwind defaults.
*   **Typography**: Clean sans-serif (Inter, Pretendard) for readability.

### 2.2 Global Components
*   **Navigation**:
    *   Mobile: Bottom Tab Bar (Home, Mentor, Upload, Community, My Page).
    *   Desktop: Top Navigation Header.
*   **Buttons**: Distinct styles for Primary (CTA), Secondary, and Ghost buttons.
*   **Modals/Drawers**: Use Bottom Sheets for mobile interactions (e.g., selecting filter options).

### 2.3 Responsive Behavior
*   The "Canvas" (Feedback tool) is the hardest part.
*   **Mobile**: Remove sidebars, maximize drawing area. Tools might need to be in a floating palette.
*   **Desktop**: Show full toolbars and layer panels on the side.

## 3. Technical Considerations (AI Agent Guidance)
*   **CSS Framework**: usage of Tailwind CSS is recommended for speed.
*   **Configuration**:
    *   Define `tailwind.config.js` with custom colors (`brand-black`, `brand-primary`).
    *   Set up a `ThemeProvider` if switching between Light/Dark is required (though Dark only is acceptable for MVP).
*   **Animations**:
    *   Use `framer-motion` for smooth page transitions and micro-interactions (e.g., heart icon pop).

## 4. Deliverables
### 6.1 Design Foundation
*   [ ] **Tailwind Config**: Define colors (`brand-black`, `brand-primary`) and fonts in `tailwind.config.js`.
*   [ ] **Global Styles**: Setup basic CSS reset and dark mode defaults.

### 6.2 Component Library
*   [ ] **Atoms**: Create `Button` (Variants: Primary, Ghost), `Input`, `Badge` components.
*   [ ] **Layouts**: Create `AppShell` (Header/Mobile Tab Bar) and `Container` components.
*   [ ] **Canvas Layout**: Create a specific full-screen layout wrapper for the Drawing Engine.
