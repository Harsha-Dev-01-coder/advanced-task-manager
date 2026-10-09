import { useNavigate, useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../hooks/redux";
import { updateTask } from "../features/tasks/taskSlice";
import TaskForm from "../features/tasks/components/TaskForm";
import type { Task } from "../types/task";

function TaskDetails() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const task = useAppSelector((state) =>
    state.tasks.tasks.find((task) => task.id === id)
  );

  if (!task) {
    return (
      <div className="p-6">
        <h1 className="text-2xl font-bold">Task not found</h1>

        <button
          type="button"
          onClick={() => navigate("/tasks")}
          className="mt-4 rounded-lg bg-blue-600 px-4 py-2 text-white"
        >
          Back to Tasks
        </button>
      </div>
    );
  }

  const handleUpdateTask = (
    data: Omit<Task, "id" | "createdAt" | "updatedAt">
  ) => {
    const updatedTask: Task = {
      ...task,
      ...data,
      updatedAt: new Date().toISOString(),
    };

    dispatch(updateTask(updatedTask));

    navigate("/tasks");
  };

  return (
    <div className="mx-auto max-w-2xl">
      <h1 className="mb-6 text-3xl font-bold">Edit Task</h1>

      <TaskForm
        key={task.id}
        initialData={task}
        onSubmit={handleUpdateTask}
      />
    </div>
  );
}

export default TaskDetails;