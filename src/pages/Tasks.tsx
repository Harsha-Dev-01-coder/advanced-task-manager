import { useState } from "react";
import {
  useAppDispatch,
  useAppSelector,
} from "../hooks/redux";
import { deleteTask } from "../features/tasks/taskSlice";
import TaskList from "../features/tasks/components/TaskList";
import { useNavigate } from "react-router-dom";
import type { TaskPriority, TaskStatus } from "../types/task";

type SortOption =
  | "newest"
  | "oldest"
  | "dueDate"
  | "titleAsc"
  | "titleDesc";

function Tasks() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  // Get tasks from Redux
  const tasks = useAppSelector((state) => state.tasks.tasks);

  // Search and filter states
  const [searchQuery, setSearchQuery] = useState("");

  const [statusFilter, setStatusFilter] = useState<
    "all" | TaskStatus
  >("all");

  const [priorityFilter, setPriorityFilter] = useState<
    "all" | TaskPriority
  >("all");

  const [sortOption, setSortOption] =
    useState<SortOption>("newest");

  // Clear all search and filter controls
  const handleClearFilters = () => {
    setSearchQuery("");
    setStatusFilter("all");
    setPriorityFilter("all");
    setSortOption("newest");
  };

  // Normalize search query
  const normalizedQuery = searchQuery.trim().toLowerCase();

  // Search and filter tasks
  const filteredTasks = tasks.filter((task) => {
    const matchesSearch =
      task.title.toLowerCase().includes(normalizedQuery) ||
      task.description.toLowerCase().includes(normalizedQuery);

    const matchesStatus =
      statusFilter === "all" ||
      task.status === statusFilter;

    const matchesPriority =
      priorityFilter === "all" ||
      task.priority === priorityFilter;

    return matchesSearch && matchesStatus && matchesPriority;
  });

  // Sort filtered tasks without mutating Redux state
  const sortedTasks = [...filteredTasks].sort((a, b) => {
    switch (sortOption) {
      case "newest":
        return (
          new Date(b.createdAt).getTime() -
          new Date(a.createdAt).getTime()
        );

      case "oldest":
        return (
          new Date(a.createdAt).getTime() -
          new Date(b.createdAt).getTime()
        );

      case "dueDate": {
        // Tasks without due dates should appear last
        if (!a.dueDate && !b.dueDate) {
          return 0;
        }

        if (!a.dueDate) {
          return 1;
        }

        if (!b.dueDate) {
          return -1;
        }

        return (
          new Date(a.dueDate).getTime() -
          new Date(b.dueDate).getTime()
        );
      }

      case "titleAsc":
        return a.title.localeCompare(b.title);

      case "titleDesc":
        return b.title.localeCompare(a.title);

      default:
        return 0;
    }
  });

  // Delete task
  const handleDeleteTask = (id: string) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this task?",
    );

    if (!confirmed) {
      return;
    }

    dispatch(deleteTask(id));
  };

  return (
    <div className="mx-auto max-w-5xl px-4 py-6">
      {/* Header */}
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <h1 className="text-3xl font-bold">Tasks</h1>

        <button
          type="button"
          onClick={() => navigate("/tasks/new")}
          className="rounded-lg bg-blue-600 px-4 py-2 font-medium text-white transition hover:bg-blue-700"
        >
          + New Task
        </button>
      </div>

      {/* Search */}
      <div className="mb-6">
        <label
          htmlFor="task-search"
          className="mb-2 block text-sm font-medium text-gray-700"
        >
          Search tasks
        </label>

        <input
          id="task-search"
          type="search"
          value={searchQuery}
          onChange={(event) =>
            setSearchQuery(event.target.value)
          }
          placeholder="Search by title or description..."
          className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
        />
      </div>

      {/* Status and Priority Filters */}
      <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
        {/* Status Filter */}
        <div>
          <label
            htmlFor="status-filter"
            className="mb-2 block text-sm font-medium text-gray-700"
          >
            Filter by status
          </label>

          <select
            id="status-filter"
            value={statusFilter}
            onChange={(event) =>
              setStatusFilter(
                event.target.value as "all" | TaskStatus,
              )
            }
            className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
          >
            <option value="all">All Statuses</option>
            <option value="todo">To Do</option>
            <option value="in-progress">In Progress</option>
            <option value="completed">Completed</option>
          </select>
        </div>

        {/* Priority Filter */}
        <div>
          <label
            htmlFor="priority-filter"
            className="mb-2 block text-sm font-medium text-gray-700"
          >
            Filter by priority
          </label>

          <select
            id="priority-filter"
            value={priorityFilter}
            onChange={(event) =>
              setPriorityFilter(
                event.target.value as "all" | TaskPriority,
              )
            }
            className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
          >
            <option value="all">All Priorities</option>
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
        </div>
      </div>

      {/* Clear Filters */}
      <div className="mb-6">
        <button
          type="button"
          onClick={handleClearFilters}
          className="rounded-lg border border-gray-300 px-4 py-2 font-medium text-gray-700 transition hover:bg-gray-100"
        >
          Clear Filters
        </button>
      </div>

      {/* Sorting */}
      <div className="mb-6">
        <label
          htmlFor="sort-tasks"
          className="mb-2 block text-sm font-medium text-gray-700"
        >
          Sort tasks by
        </label>

        <select
          id="sort-tasks"
          value={sortOption}
          onChange={(event) =>
            setSortOption(
              event.target.value as SortOption,
            )
          }
          className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 sm:w-80"
        >
          <option value="newest">Newest First</option>
          <option value="oldest">Oldest First</option>
          <option value="dueDate">
            Due Date: Earliest First
          </option>
          <option value="titleAsc">Title: A–Z</option>
          <option value="titleDesc">Title: Z–A</option>
        </select>
      </div>

      {/* Results Count */}
      <p
        className="mb-4 text-sm text-gray-600"
        aria-live="polite"
      >
        Showing {sortedTasks.length}{" "}
        {sortedTasks.length === 1 ? "task" : "tasks"}
      </p>

      {/* Empty States and Task List */}
      {tasks.length === 0 ? (
        <div className="rounded-lg border border-gray-200 p-8 text-center">
          <h2 className="text-xl font-semibold">
            No tasks yet
          </h2>

          <p className="mt-2 text-gray-500">
            Create your first task to get started.
          </p>

          <button
            type="button"
            onClick={() => navigate("/tasks/new")}
            className="mt-4 rounded-lg bg-blue-600 px-4 py-2 font-medium text-white transition hover:bg-blue-700"
          >
            Create Your First Task
          </button>
        </div>
      ) : sortedTasks.length === 0 ? (
        <div className="rounded-lg border border-gray-200 p-8 text-center">
          <h2 className="text-xl font-semibold">
            No matching tasks
          </h2>

          <p className="mt-2 text-gray-500">
            Try changing your search or filters.
          </p>

          <button
            type="button"
            onClick={handleClearFilters}
            className="mt-4 rounded-lg border border-gray-300 px-4 py-2 font-medium text-gray-700 transition hover:bg-gray-100"
          >
            Clear Filters
          </button>
        </div>
      ) : (
        <TaskList
          tasks={sortedTasks}
          onDelete={handleDeleteTask}
        />
      )}
    </div>
  );
}

export default Tasks;