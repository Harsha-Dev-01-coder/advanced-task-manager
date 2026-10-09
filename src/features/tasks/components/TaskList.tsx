import { useAppSelector } from "../../../hooks/redux";
import TaskCard from "./TaskCard";

interface TaskListProps {
  onDelete: (id: string) => void;
}

function TaskList({ onDelete }: TaskListProps) {
  const tasks = useAppSelector((state) => state.tasks.tasks);

  if (tasks.length === 0) {
    return (
      <div className="rounded-xl border border-dashed p-10 text-center">
        <h2 className="text-xl font-semibold">No tasks yet</h2>
        <p className="mt-2 text-gray-500">
          Create your first task to get started.
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