# Grim Design System

This document outlines the design system for the **Grim** platform, based on the "Professional SaaS" aesthetic. It prioritizes data clarity, professional typography, and modern glassmorphism effects to build trust and authority.

## 1. Design Philosophy
- **Professional & Trustworthy:** Uses a strict neutral color palette and clean sans-serif typography.
- **Data-Driven:** Emphasis on clear visualization of metrics and progress (Charts, Bento Grids).
- **Modern Depth:** Subtle use of glassmorphism and blurs to establish hierarchy without clutter.
- **Clean Layouts:** Generous whitespace and structured grids.

---

## 2. Core Foundations

### 2.1 Color Palette
The system relies heavily on a refined neutral scale.

| Token | Hex | Usage |
|-------|-----|-------|
| `neutral-900` | `#111111` | Primary Text, Primary Buttons, Strong Headings |
| `neutral-800` | `#1f1f1f` | Hover states for dark elements |
| `neutral-500` | `#737373` | Secondary Text, Subtitles, Icons |
| `neutral-100` | `#f5f5f5` | Page Backgrounds, Secondary Buttons |
| `neutral-50` | `#fafafa` | Card Backgrounds, Light Areas |
| `white` | `#ffffff` | Card Backgrounds, Input Fields |

**Semantic Colors:**
- **Brand/Action:** Black (`neutral-900`) is the primary brand color.
- **Success:** Green (e.g., `#22c55e` - inferred for charts/growth).
- **Rating/Highlight:** Orange (`#f97316`) for star ratings and highlights.

### 2.2 Typography
**Font Family:** `Inter`, sans-serif.

| Style | Class (Tailwind) | Specs | Usage |
|-------|------------------|-------|-------|
| **Display Heading** | `text-5xl md:text-7xl font-bold tracking-tight` | Leading: 1.1 | Hero section main titles. |
| **Section Heading** | `text-4xl font-bold` | Leading: tight | Major section titles. |
| **Card Heading** | `text-2xl font-bold` | - | Feature card titles. |
| **Body Large** | `text-lg text-gray-500` | Leading: relaxed | Introductions, sub-heroes. |
| **Body Default** | `text-base` | - | Standard content. |
| **Label/Caption** | `text-xs font-bold uppercase tracking-wide` | - | Badges, tiny metadata. |

### 2.3 Effects & Shadows
Glassmorphism is a key differentiator.

- **Glass Shadow:** `shadow-glass` -> `0 8px 32px 0 rgba(31, 38, 135, 0.07)`
- **Light Glass:** `bg-white/70 backdrop-blur-md border border-white/50`
- **Dark Glass:** `bg-black/60 backdrop-blur-xl border border-white/10`

---

## 3. UI Components

### 3.1 Buttons
**Primary Button**
```tsx
<button className="bg-neutral-900 text-white px-8 py-4 rounded-xl font-medium text-base hover:bg-neutral-800 transition-all flex items-center gap-2">
  Button Text
</button>
```

**Secondary Button**
```tsx
<button className="bg-white border border-gray-200 text-neutral-900 px-8 py-4 rounded-xl font-medium text-base hover:bg-gray-50 transition-all">
  Button Text
</button>
```

### 3.2 Cards
**Standard Card (Bento Item)**
```tsx
<div className="bg-gray-50 border border-gray-100 rounded-2xl p-6 hover:border-gray-300 transition-colors">
  {/* Content */}
</div>
```

**Glass Overlay Card**
Used for floating stats or feedback on top of images.
```tsx
<div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6 text-white shadow-2xl">
  {/* Content */}
</div>
```

### 3.3 Badges
**Rating/Highlight Badge**
```tsx
<div className="inline-flex items-center gap-2 px-3 py-1 bg-orange-50 border border-orange-100 rounded-full">
    <span className="text-orange-500">★</span>
    <span className="text-xs font-bold text-orange-700 tracking-wide">LABEL</span>
</div>
```

### 3.4 Navigation
Fixed, translucent navbar.
```tsx
<nav className="fixed w-full z-50 bg-white/90 backdrop-blur-md border-b border-gray-100">
  {/* Content */}
</nav>
```

---

## 4. Implementation (Tailwind v4)

Add these variables to your `src/app/globals.css` inside the `@theme` block.

```css
@import "tailwindcss";

@theme {
  /* Fonts */
  --font-sans: "Inter", sans-serif;

  /* Neutral Color Scale */
  --color-neutral-900: #111111;
  --color-neutral-800: #1f1f1f;
  --color-neutral-500: #737373;
  --color-neutral-100: #f5f5f5;
  --color-neutral-50: #fafafa;

  /* Shadows */
  --shadow-glass: 0 8px 32px 0 rgba(31, 38, 135, 0.07);
}
```