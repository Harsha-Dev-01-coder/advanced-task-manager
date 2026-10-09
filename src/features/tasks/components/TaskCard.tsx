import { Link } from "react-router-dom";
import type { Task } from "../../../types/task";

interface TaskCardProps {
  task: Task;
  onDelete: (id: string) => void;
}

function TaskCard({ task, onDelete }: TaskCardProps) {
  return (
    <article className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
      <div className="mb-3 flex items-start justify-between gap-4">
        <h2 className="text-xl font-semibold text-gray-900">
          {task.title}
        </h2>

        <span className="rounded-full bg-gray-100 px-3 py-1 text-sm">
          {task.status}
        </span>
      </div>

      <p className="mb-4 text-gray-600">{task.description}</p>

      <div className="mb-4 flex flex-wrap gap-3 text-sm">
        <span className="rounded-md bg-blue-50 px-3 py-1 text-blue-700">
          Priority: {task.priority}
        </span>

        <span className="rounded-md bg-gray-50 px-3 py-1 text-gray-700">
          Due: {task.dueDate || "No due date"}
        </span>
      </div>

      <div className="flex gap-3">
        <Link
          to={`/tasks/${task.id}`}
          className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
        >
          Edit
        </Link>

        <button
          type="button"
          onClick={() => onDelete(task.id)}
          className="rounded-lg bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700"
        >
          Delete
        </button>
      </div>
    </article>
  );
}

export default TaskCard;