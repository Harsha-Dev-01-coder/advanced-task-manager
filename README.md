# Advanced Task Manager

A responsive task-management application built with React,
TypeScript, Redux Toolkit, and Tailwind CSS.

## Live Demo

[Open the live application](YOUR_DEPLOYED_URL)

## Overview

Advanced Task Manager helps users organize tasks, track progress,
manage priorities, and monitor upcoming deadlines.

## Features

- Create, view, edit, and delete tasks
- Organize tasks by status and priority
- Search tasks by title and description
- Filter tasks by status and priority
- Sort tasks using multiple options
- View dashboard statistics
- Track upcoming and overdue tasks
- Persist tasks using browser localStorage
- Responsive dashboard and task-management interface

## Tech Stack

- React
- TypeScript
- Vite
- Tailwind CSS
- Redux Toolkit
- React Redux
- React Hook Form
- React Router
- localStorage

## Getting Started

### Prerequisites

- Node.js
- npm

### Installation

Clone the repository:

```bash
git clone https://github.com/Harsha-Dev-01-coder/advanced-task-manager
```

Navigate into the project:

```bash
cd task-manager
```

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

## Production Build

```bash
npm run build
```

## Project Structure

```text
src/
├── components/
├── features/
│   └── tasks/
│       ├── components/
│       ├── utils/
│       └── taskSlice.ts
├── hooks/
├── layouts/
├── pages/
├── store/
├── types/
└── utils/
```

Adjust this structure to match your actual repository.

## Data Persistence

Tasks are stored in browser localStorage and restored when
the application initializes.

Data is stored locally in the browser and is not synchronized
across devices.

## Future Improvements

- Backend API integration
- User authentication
- Cloud synchronization
- Collaborative task management
- Notifications and reminders

## Author

Harsha