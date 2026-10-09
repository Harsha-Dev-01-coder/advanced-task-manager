import { useForm } from "react-hook-form";
import type { Task } from "../../../types/task";

interface TaskFormProps {
  initialData?: Task;
  onSubmit: (
    data: Omit<Task, "id" | "createdAt" | "updatedAt">
  ) => void;
}

type TaskFormValues = Omit<Task, "id" | "createdAt" | "updatedAt">;

function TaskForm({ initialData, onSubmit }: TaskFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TaskFormValues>({
    defaultValues: {
      title: initialData?.title ?? "",
      description: initialData?.description ?? "",
      priority: initialData?.priority ?? "medium",
      status: initialData?.status ?? "todo",
      dueDate: initialData?.dueDate ?? "",
    },
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      {/* Title */}
      <div>
        <label htmlFor="title" className="mb-1 block font-medium">
          Title
        </label>

        <input
          id="title"
          type="text"
          {...register("title", {
            required: "Title is required",
            minLength: {
              value: 3,
              message: "Title must be at least 3 characters",
            },
            maxLength: {
              value: 100,
              message: "Title cannot exceed 100 characters",
            },
          })}
          className="w-full rounded-lg border p-3"
          placeholder="Enter task title"
        />

        {errors.title && (
          <p className="mt-1 text-sm text-red-600" role="alert">
            {errors.title.message}
          </p>
        )}
      </div>

      {/* Description */}
      <div>
        <label htmlFor="description" className="mb-1 block font-medium">
          Description
        </label>

        <textarea
          id="description"
          {...register("description", {
            required: "Description is required",
            minLength: {
              value: 10,
              message: "Description must be at least 10 characters",
            },
          })}
          className="w-full rounded-lg border p-3"
          placeholder="Describe your task"
          rows={4}
        />

        {errors.description && (
          <p className="mt-1 text-sm text-red-600" role="alert">
            {errors.description.message}
          </p>
        )}
      </div>

      {/* Priority */}
      <div>
        <label htmlFor="priority" className="mb-1 block font-medium">
          Priority
        </label>

        <select
          id="priority"
          {...register("priority")}
          className="w-full rounded-lg border p-3"
        >
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>
      </div>

      {/* Status */}
      <div>
        <label htmlFor="status" className="mb-1 block font-medium">
          Status
        </label>

        <select
          id="status"
          {...register("status")}
          className="w-full rounded-lg border p-3"
        >
          <option value="todo">Todo</option>
          <option value="in-progress">In Progress</option>
          <option value="completed">Completed</option>
        </select>
      </div>

      {/* Due Date */}
      <div>
        <label htmlFor="dueDate" className="mb-1 block font-medium">
          Due Date
        </label>

        <input
          id="dueDate"
          type="date"
          {...register("dueDate")}
          className="w-full rounded-lg border p-3"
        />
      </div>

      {/* Submit */}
      <button
        type="submit"
        className="rounded-lg bg-blue-600 px-5 py-3 font-medium text-white transition hover:bg-blue-700"
      >
        {initialData ? "Save Changes" : "Create Task"}
      </button>
    </form>
  );
}

export default TaskForm;