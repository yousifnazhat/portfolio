# Blueprint: Interactive Portfolio Website

## 1. Overview

This project is a modern, single-page interactive portfolio for Yousif Nazhat, an IT & Security Specialist. The goal is to create a visually impressive and engaging user experience that showcases his skills, experience, and projects in a professional and aesthetically pleasing manner. The design is dark-themed, using a card-based grid layout that is fully responsive for both desktop and mobile viewing.

## 2. Implemented Features & Design

This section documents the current state of the application, including all design choices and implemented features.

### 2.1. Overall Design & Style

*   **Theme:** Dark mode, with a black background (`bg-black`) and light text (`text-slate-200`).
*   **Typography:** A clean sans-serif font (`font-sans`).
*   **Layout:** A responsive grid system (`grid`) built with Tailwind CSS. It uses a 4-column layout on medium screens and above (`md:grid-cols-4`) and a single-column layout on smaller screens.
*   **Aesthetics:**
    *   **Cards:** Content is organized into cards with rounded corners (`rounded-3xl`), a `slate-900` background, and subtle borders (`border-white/10`).
    *   **Hover Effects:** Cards have interactive hover effects, including a slight lift (`hover:-translate-y-2`) and a colored shadow glow (`hover:shadow-lg hover:shadow-blue-500/10`), to provide visual feedback.
    *   **Color Palette:** The primary color is a vibrant blue (`text-blue-400`, `bg-blue-500`), used for highlights, buttons, and links to create a consistent and modern feel. Accent colors (green, yellow, purple, orange, red) are used to add visual interest to specific sections.
*   **Accessibility:** The selection color is customized (`selection:bg-blue-500/30`) for better visibility.

### 2.2. Core Components & Sections

*   **Hero Section (Card 1):**
    *   **Purpose:** Introduces Yousif Nazhat and his specialization.
    *   **Content:** A prominent headline, a brief bio, and an "Available for Hire" status badge.
    *   **Actions:**
        *   **`Download Resume` Button:** A traditional link to download the `resume.pdf` file.
        *   **`Interactive Resume` Button:** Triggers a modal window for an in-depth, interactive view of the resume.

*   **Project Showcase (Image-based Cards):**
    *   **Purpose:** To visually highlight key projects and direct users to detailed project pages.
    *   **Functionality:** Each project image is a link (`<Link>`) that navigates the user to a separate page for that project (e.g., `/project-daedalus`, `/arduino-logic`).
    *   **Visuals:** Uses high-quality images with a subtle gradient overlay and text to provide context. Images have a zoom effect on hover (`group-hover:scale-105`).

*   **Tech Stack Ticker (Card 3):**
    *   **Purpose:** To provide a quick, scannable overview of core technical skills.
    *   **Design:** A full-width banner that lists key technologies in a clean, monochromatic style.

*   **Featured Project Deep Dive (Card 4):**
    *   **Purpose:** To provide a more detailed look at a specific engineering achievement ("Engineering The Data Loop").
    *   **Content:** Combines a narrative description with key performance indicators (KPIs) presented in visually distinct sub-cards (e.g., "Theoretical T/W" vs. "Validated T/W").

*   **Software Engineering Projects (Cards 6-9):**
    *   **Purpose:** A series of smaller cards to concisely showcase a range of software projects.
    *   **Design:** Each card uses a colored icon and a tag to categorize the project (e.g., "Architecture," "Algorithms").

### 2.3. The Interactive Resume Feature

This feature was added to provide a rich, user-friendly alternative to downloading the PDF resume.

*   **Trigger:** Activated by clicking the "Interactive Resume" button in the hero section.
*   **Component:** `src/components/ResumeModal.tsx`
    *   A self-contained React component that renders the resume content.
*   **Functionality:**
    *   Displays a modal overlay (`fixed inset-0`) that covers the main page.
    *   The modal can be closed by clicking the "X" button or by clicking on the dark background area outside the modal content.
*   **Design:**
    *   The modal has a `slate-900` background, a blue border highlight (`border-blue-500/30`), and a layout that organizes resume content into logical sections (Education, Skills, Experience, Projects).
    *   It uses a two-column layout on larger screens to present the information clearly and concisely.
    *   Skills are displayed as styled "pills" or tags for quick scanning.
    *   Projects are listed in individual styled boxes to separate them visually.

### 2.4. Project Detail Pages

*   **Purpose:** To provide in-depth information about specific projects.
*   **Current Pages:**
    *   `/project-daedalus`: A detailed page showcasing the "Project Daedalus" aircraft, including a mission brief, key metrics, and an image gallery.
    *   `/arduino-logic`: A detailed page showcasing the custom Arduino-based data acquisition system, including a mission brief, key features, and a code snippet.
    *   `/thrust-stand`: A detailed page showcasing the custom-built thrust stand, its features, and a data visualization.
    *   `/ecalc-data`: A detailed page showcasing the analysis and comparison of eCalc's theoretical models with real-world data.

## 3. Current Action Plan: Build Out Project Pages

This section outlines the plan for the current development task.

*   **Request:** The user wants to build out the project detail pages linked from the main portfolio.
*   **Implementation Steps:**
    1.  **Create "Project Daedalus" Page:** (Complete)
    2.  **Create "Arduino Logic" Page:** (Complete)
    3.  **Create "Thrust Stand" Page:** (Complete)
    4.  **Create "eCalc Data" Page:** (Complete)
*   **Next Steps:** All project pages are complete. The project is feature-complete as per the user's request.