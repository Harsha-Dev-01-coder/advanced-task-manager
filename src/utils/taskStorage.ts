import type { Task } from "../types/task";

const STORAGE_KEY = "advanced-task-manager-tasks";

// Validate an individual task
function isValidTask(value: unknown): value is Task {
  if (typeof value !== "object" || value === null) {
    return false;
  }

  const task = value as Record<string, unknown>;

  return (
    typeof task.id === "string" &&
    typeof task.title === "string" &&
    typeof task.description === "string" &&
    (task.status === "todo" ||
      task.status === "in-progress" ||
      task.status === "completed") &&
    (task.priority === "low" ||
      task.priority === "medium" ||
      task.priority === "high") &&
    typeof task.dueDate === "string" &&
    typeof task.createdAt === "string" &&
    typeof task.updatedAt === "string"
  );
}

// Load tasks from localStorage
export function loadTasks(): Task[] {
  try {
    const storedData = localStorage.getItem(STORAGE_KEY);

    if (!storedData) {
      return [];
    }

    const parsedData: unknown = JSON.parse(storedData);

    if (!Array.isArray(parsedData)) {
      return [];
    }

    return parsedData.filter(isValidTask);
  } catch {
    return [];
  }
}

// Save tasks to localStorage
export function saveTasks(tasks: Task[]): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
  } catch (error) {
    console.error("Failed to save tasks to localStorage:", error);
  }
}