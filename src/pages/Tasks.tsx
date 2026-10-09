import { useAppDispatch } from "../hooks/redux";
import { deleteTask } from "../features/tasks/taskSlice";
import TaskList from "../features/tasks/components/TaskList";
import { useNavigate } from "react-router-dom";

function Tasks() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleDeleteTask = (id: string) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this task?"
    );

    if (!confirmed) {
      return;
    }

    dispatch(deleteTask(id));
  };

  return (
    <div className="mx-auto max-w-5xl">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-3xl font-bold">Tasks</h1>

        <button
          type="button"
          onClick={() => navigate("/tasks/new")}
          className="rounded-lg bg-blue-600 px-4 py-2 font-medium text-white hover:bg-blue-700"
        >
          + New Task
        </button>
      </div>

      <TaskList onDelete={handleDeleteTask} />
    </div>
  );
}

export default Tasks;