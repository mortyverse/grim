# Task 4: Drawing Feedback Engine (Core Feature)

## 1. Objective
Develop the interactive "Over-painting" canvas that allows Mentors to draw directly on top of Student submissions.
This is the **USP (Unique Selling Point)** of the platform.

## 2. Context & Requirements
(Refer to PRD Section 4.3)

### 2.1 The Feedback Workflow
1.  **Student Upload**: Upload original image (Student Layer).
2.  **Mentor View**: Load Student Layer as background (Locked).
3.  **Drawing**: Mentor draws on a separate "Feedback Layer" (Transparent background).
4.  **Completion**: Save both the Feedback Layer state and a flattened preview for the gallery.

### 2.2 Canvas Tools Specification
*   **Technologies**: Recommend using `Konva.js` or `Fabric.js` for object model handling over raw HTML5 Canvas.
*   **Essential Tools**:
    *   **Brush**: Adjustable Color (Hex), Size (px), Opacity (%).
    *   **Highlighter**: Fixed low opacity brush for emphasizing areas.
    *   **Shapes**: Simple line/arrow/circle drawing for structural corrections.
    *   **Undo/Redo**: Critical for usability.
    *   **Zoom/Pan**: Essential for high-res artwork details.

### 2.3 Result Viewer
*   **Before/After Slider**: A slider UI to drag across the image, revealing the feedback layer over the original.
*   **Opacity Toggle**: Button to toggle visibility of the Mentor's drawing.

## 3. Technical Considerations (AI Agent Guidance)
*   **Storage**:
    *   Store the *Original Image* (S3/Cloudinary).
    *   Store the *Feedback Vector Data* (JSON) if using Konva/Fabric to allow re-editing later, OR store the *Feedback Layer Image* (PNG with transparency) for simpler MVP.
    *   **Recommendation**: Store **Both**. JSON for future edits, PNG for quick display in feeds.
*   **Performance**: Large images (20MB) can lag browser canvas. Implement image downscaling for display/interaction while keeping high-res for final output if possible.
*   **Mobile Support**: Touch events must be distinguished from scroll/zoom gestures.

## 4. Deliverables
*   [ ] Reusable `CanvasEditor` Component (React/Vue/etc.).
*   [ ] Tool Toolbar UI (Brush, Eraser, Color Picker).
*   [ ] Logic to load image from URL into Canvas background.
*   [ ] "Save Feedback" function generating a PNG blob.
*   [ ] "Comparison Viewer" Component for the result page.
