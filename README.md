# Advanced Task Manager

A modern task management application built with React, TypeScript, Redux Toolkit, React Router, and Tailwind CSS.

The application is designed with a scalable feature-based architecture, reusable components, centralized state management, and validated forms to demonstrate practical frontend engineering skills.

---

## 🚀 Tech Stack

- **React 19** — Component-based UI development
- **TypeScript** — Static typing and type safety
- **Vite** — Development server and build tooling
- **Tailwind CSS** — Utility-first styling
- **Redux Toolkit** — Centralized state management
- **React Redux** — Connecting React components to Redux
- **React Router** — Client-side navigation and routing
- **React Hook Form** — Form handling and validation
- **ESLint** — Code quality and linting
- **Git & GitHub** — Version control and collaboration

---

## ✨ Features

### 📋 Task Management

- Create new tasks.
- View all tasks in a structured list.
- Edit existing tasks.
- Delete tasks with a confirmation dialog.
- Update task statuses.
- Display an informative empty state when no tasks exist.

### 📝 Task Details

Each task contains:

- **Title** — The name of the task.
- **Description** — Additional information about the task.
- **Priority** — Low, Medium, or High.
- **Status** — Todo, In Progress, or Completed.
- **Due Date** — An optional deadline.

### ✅ Form Validation

Task forms include validation to prevent invalid submissions.

**Title**
- Required field.
- Minimum length: 3 characters.
- Maximum length: 100 characters.

**Description**
- Required field.
- Minimum length: 10 characters.

Validation errors are displayed alongside the corresponding form fields.

### 🎯 State Management

Redux Toolkit manages task data through a centralized store.

Implemented actions include:

- `addTask` — Adds a new task.
- `updateTask` — Updates an existing task.
- `deleteTask` — Removes a task.
- `updateTaskStatus` — Changes a task's status.

Typed Redux hooks provide type-safe access to application state and dispatch.

### 🧩 Reusable Components

The application uses reusable components to keep the code organized and maintainable.

- `TaskForm` — Handles task creation and editing.
- `TaskCard` — Displays individual task information.
- `TaskList` — Renders the collection of tasks.
- `DashboardLayout` — Provides the shared application layout.

### 🧭 Navigation

React Router manages navigation between application pages.

| Route | Description |
|---|---|
| `/dashboard` | Dashboard |
| `/tasks` | View all tasks |
| `/tasks/new` | Create a new task |
| `/tasks/:id` | View or edit a task |

---

## 📂 Project Structure

```text
src/
├── assets/
├── components/
├── features/
│   └── tasks/
│       ├── components/
│       │   ├── TaskCard.tsx
│       │   ├── TaskForm.tsx
│       │   └── TaskList.tsx
│       └── taskSlice.ts
├── hooks/
│   └── redux.ts
├── layouts/
│   └── DashboardLayout.tsx
├── pages/
│   ├── Dashboard.tsx
│   ├── NewTask.tsx
│   ├── TaskDetails.tsx
│   └── Tasks.tsx
├── store/
│   └── store.ts
├── types/
│   └── task.ts
├── utils/
├── App.tsx
├── App.css
├── index.css
└── main.tsx
```

---

## ⚙️ Getting Started

### Prerequisites

- Node.js
- npm
- Git

### Installation

Clone the repository:

```bash
git clone <your-repository-url>
```

Navigate to the project directory:

```bash
cd advanced-task-manager
```

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

Open the local URL displayed in your terminal to access the application.

---

## 🏗️ Production Build

Run the TypeScript checks and generate an optimized production build:

```bash
npm run build
```

To preview the production build locally:

```bash
npm run preview
```

---

## ⚠️ Current Limitations

- Task data is stored in Redux memory.
- Refreshing the browser resets the task list.
- Tasks are not persisted in localStorage or a database.
- Backend integration has not yet been implemented.
- Authentication and user-specific task management are not yet implemented.

These limitations can be addressed through future enhancements.

---

## 🔮 Future Improvements

- Persist tasks using localStorage or a backend database.
- Add task search, filtering, and sorting.
- Build a dashboard with task statistics.
- Add pagination for large task lists.
- Improve accessibility and keyboard navigation.
- Add responsive layouts for mobile, tablet, and desktop.
- Integrate a backend API.
- Implement authentication and user accounts.
- Add automated tests.

---

## 🎯 Project Objectives

This project demonstrates practical experience with:

- React component architecture
- TypeScript and type-safe development
- Redux Toolkit and centralized state management
- CRUD operations
- Form handling and validation
- Client-side routing
- Reusable components
- Feature-based folder organization
- Git and GitHub workflows
- Production build verification

---

## 👨‍💻 Author

Frontend Developer focused on building practical, maintainable, and scalable web applications.