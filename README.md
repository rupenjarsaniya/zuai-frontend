# IB Coursework Evaluation Platform

## Objective

This project is a web application for evaluating International Baccalaureate (IB) coursework. It is built using **Next.js 14**, **TailwindCSS**, **Zustand** for state management, and **Shadcn UI** for the component library. The interface closely follows the design provided in the Figma link.

[Figma Design](https://www.figma.com/design/zxoVX8TMExUAZOMdOFStMi/Web-Task---ZuAI?node-id=0-1&t=pLJAY80MGdlbaAYl-1)

## Tech Stack

-   **Next.js 14** ✅
-   **TailwindCSS** ✅
-   **Zustand (State Management)** ✅
-   **Shadcn UI Components** ✅

---

## Assumptions and Design Decisions

-   **Local storage** is used to store uploaded files, coursework metadata, and evaluation results to ensure persistence across page reloads.
-   **Zustand** is chosen for state management to keep global state minimal and easy to maintain, while managing local state directly in components.
-   The **Shadcn UI component library** is selected for consistency in the design and ease of development.
-   **Dummy data** is used for the evaluation and score breakdowns, as there is no real backend integration at this stage.
-   **Next.js 14 features** such as the App Router and Server Components are used where beneficial for server-side rendering, but since the app is client-heavy (due to local storage and state), most of the rendering happens on the client side.

## List of Implemented Features

### 1. File Upload ✅

-   Drag-and-drop functionality for PDF file uploads.
-   Manual file upload option.
-   File size limit display (up to 25 MB).
-   Uploaded files are stored in local storage.

### 2. Local Storage Implementation ✅

-   Uploaded files and their metadata are stored locally.
-   Data persistence across page reloads is ensured.
-   Efficient retrieval of stored files and metadata.

### 3. Coursework Details Form ✅

-   Dropdowns for "Coursework Type" and "Subject."
-   Text input for the essay title.
-   Coursework details are stored locally with the associated file.

### 4. Evaluation Display ✅

-   Dummy data is used to display overall scores with a circular progress indicator.
-   Criteria breakdown (A, B, C) and evaluation date are displayed.
-   Evaluation results are stored and retrieved from local storage.

### 5. Coursework List ✅

-   Displays a list of previously uploaded coursework from local storage.
-   Coursework items include title, subject, word count, and other relevant details.

### 6. Explore Coursework Section ✅

-   Implemented a tabbed interface for different coursework categories.
-   Created a grid layout for coursework examples.

## Bonus Points

### 1. User Gratification ✅

-   Congratulatory messages for good scores are displayed.

### 2. Advanced Local Storage Features ✅

-   Implemented options to clear local storage or individual files.
-   Gracefully handled storage limitations by providing user feedback.

---

## Challenges Faced & Solutions

### 1. Production Build Fails on Next.js Due to pdfjs Global Worker

**Problem**: The production build failed because of an issue with `pdfjs`'s global worker in Next.js.

**Solution**: The issue was resolved by following the solution provided in [this GitHub issue](https://github.com/wojtekmaj/react-pdf/issues/1824#issuecomment-2257251458), which involves configuring the worker properly.

### 2. ReferenceError: window is Not Defined

**Problem**: The error occurred when trying to access the `window` object during server-side rendering in Next.js, particularly in `src/hook/useBreakpoint.ts`.

**Solution**: The `useBreakpoint` hook was updated to check if the `window` object exists. The `useState` hook now uses a function initializer to check for `window`, and `useEffect` ensures the resize event listener is only set up when `window` is defined, preventing SSR issues.

---

## Future Improvements

-   **Animations & Micro-interactions**: Though basic transitions are implemented, more advanced animations and micro-interactions could enhance user experience.
-   **Accessibility**: ARIA attributes and keyboard navigation support need to be fully implemented.
-   **Testing**: Unit and integration tests for critical components and user flows need to be added to ensure stability and reliability.

---

## How to Run the Project

### Prerequisites

-   **Node.js** (14 or higher)
-   **npm** or **yarn**

### Installation

1. Clone the repository:

    ```bash
    git clone https://github.com/rupenjarsaniya/zuai-frontend.git
    cd zuai-frontend
    ```

2. Install dependencies:

    ```bash
    npm install
    ```

3. Run the development server:

    ```bash
    npm run dev
    ```

4. Access the application at `http://localhost:3000`.

### Building for Production

```bash
npm run build
```

Start the production server:

```bash
npm start
```

---

## License

This project is licensed under the MIT License.
