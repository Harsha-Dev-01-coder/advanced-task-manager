import { useNavigate } from "react-router-dom";
import TaskForm from "../features/tasks/components/TaskForm";
import { useAppDispatch } from "../hooks/redux";
import { addTask } from "../features/tasks/taskSlice";
import type { Task } from "../types/task";

function NewTask() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleCreateTask = (
    data: Omit<Task, "id" | "createdAt" | "updatedAt">
  ) => {
    const now = new Date().toISOString();

    const newTask: Task = {
      ...data,
      id: crypto.randomUUID(),
      createdAt: now,
      updatedAt: now,
    };

    dispatch(addTask(newTask));

    navigate("/tasks");
  };

  return (
    <div className="mx-auto max-w-2xl">
      <h1 className="mb-6 text-3xl font-bold">Create New Task</h1>

      <TaskForm onSubmit={handleCreateTask} />
    </div>
  );
}

export default NewTask;