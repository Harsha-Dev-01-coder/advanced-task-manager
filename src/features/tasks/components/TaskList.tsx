import type { Task } from "../../../types/task";
import TaskCard from "./TaskCard";

interface TaskListProps {
  tasks: Task[];
  onDelete: (id: string) => void;
}

function TaskList({ tasks, onDelete }: TaskListProps) {
  if (tasks.length === 0) {
    return (
      <div className="rounded-lg border border-gray-200 p-8 text-center">
        <h2 className="text-xl font-semibold">No tasks found</h2>
        <p className="mt-2 text-gray-500">
          Try changing your search or create a new task.
        </p>
      </div>
    );
  }

  return (
    <div className="grid gap-4">
      {tasks.map((task) => (
        <TaskCard key={task.id} task={task} onDelete={onDelete} />
      ))}
    </div>
  );
}

export default TaskList;