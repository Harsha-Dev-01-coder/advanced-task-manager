import { useAppSelector } from "../hooks/redux";

function Dashboard() {
  const tasks = useAppSelector((state) => state.tasks.tasks);

  // Calculate task statistics
  const totalTasks = tasks.length;

  const completedTasks = tasks.filter(
    (task) => task.status === "completed",
  ).length;

  const pendingTasks = tasks.filter(
    (task) => task.status === "todo",
  ).length;

  const inProgressTasks = tasks.filter(
    (task) => task.status === "in-progress",
  ).length;

  // Calculate priority statistics
  const highPriorityTasks = tasks.filter(
    (task) => task.priority === "high",
  ).length;

  const mediumPriorityTasks = tasks.filter(
    (task) => task.priority === "medium",
  ).length;

  const lowPriorityTasks = tasks.filter(
    (task) => task.priority === "low",
  ).length;

  // Calculate completion percentage
  const completionPercentage =
    totalTasks > 0
      ? Math.round((completedTasks / totalTasks) * 100)
      : 0;

  // Use local calendar dates to compare due dates consistently
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const sevenDaysFromToday = new Date(today);
  sevenDaysFromToday.setDate(sevenDaysFromToday.getDate() + 7);

  const getDueDate = (dueDate: string): Date | null => {
    if (!dueDate) {
      return null;
    }

    const parsedDate = new Date(`${dueDate}T00:00:00`);

    if (Number.isNaN(parsedDate.getTime())) {
      return null;
    }

    return parsedDate;
  };

  // Upcoming tasks: today through the next seven days
  const upcomingTasks = tasks
    .filter((task) => {
      if (task.status === "completed") {
        return false;
      }

      const dueDate = getDueDate(task.dueDate);

      return (
        dueDate !== null &&
        dueDate >= today &&
        dueDate <= sevenDaysFromToday
      );
    })
    .sort(
      (a, b) =>
        getDueDate(a.dueDate)!.getTime() -
        getDueDate(b.dueDate)!.getTime(),
    );

  // Overdue tasks: due before today and not completed
  const overdueTasks = tasks
    .filter((task) => {
      if (task.status === "completed") {
        return false;
      }

      const dueDate = getDueDate(task.dueDate);

      return dueDate !== null && dueDate < today;
    })
    .sort(
      (a, b) =>
        getDueDate(a.dueDate)!.getTime() -
        getDueDate(b.dueDate)!.getTime(),
    );

  const statistics = [
    {
      title: "Total Tasks",
      count: totalTasks,
      description: "All tasks",
      color: "border-blue-500",
      textColor: "text-blue-600",
    },
    {
      title: "Completed",
      count: completedTasks,
      description: "Finished tasks",
      color: "border-green-500",
      textColor: "text-green-600",
    },
    {
      title: "Pending",
      count: pendingTasks,
      description: "Tasks not started",
      color: "border-yellow-500",
      textColor: "text-yellow-600",
    },
    {
      title: "In Progress",
      count: inProgressTasks,
      description: "Tasks being worked on",
      color: "border-purple-500",
      textColor: "text-purple-600",
    },
  ];

  const priorityStatistics = [
    {
      title: "High Priority",
      count: highPriorityTasks,
      description: "Requires urgent attention",
      color: "border-red-500",
      textColor: "text-red-600",
    },
    {
      title: "Medium Priority",
      count: mediumPriorityTasks,
      description: "Normal importance",
      color: "border-orange-500",
      textColor: "text-orange-600",
    },
    {
      title: "Low Priority",
      count: lowPriorityTasks,
      description: "Lower urgency",
      color: "border-teal-500",
      textColor: "text-teal-600",
    },
  ];

  const renderStatisticCard = (statistic: {
    title: string;
    count: number;
    description: string;
    color: string;
    textColor: string;
  }) => (
    <article
      key={statistic.title}
      className={`rounded-xl border border-gray-200 border-l-4 ${statistic.color} bg-white p-5 shadow-sm transition-shadow hover:shadow-md`}
    >
      <p className="text-sm font-medium text-gray-500">
        {statistic.title}
      </p>

      <p className={`mt-3 text-3xl font-bold ${statistic.textColor}`}>
        {statistic.count}
      </p>

      <p className="mt-2 text-sm text-gray-500">
        {statistic.description}
      </p>
    </article>
  );

  const formatDueDate = (dueDate: string) => {
    const date = getDueDate(dueDate);

    if (!date) {
      return "Invalid due date";
    }

    return new Intl.DateTimeFormat("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
    }).format(date);
  };

  const renderDueTask = (
    task: (typeof tasks)[number],
    overdue: boolean,
  ) => (
    <article
      key={task.id}
      className="flex flex-col gap-2 rounded-lg border border-gray-200 p-4 sm:flex-row sm:items-center sm:justify-between"
    >
      <div className="min-w-0">
        <h3 className="break-words font-medium text-gray-900">
          {task.title}
        </h3>

        <p className="mt-1 text-sm text-gray-500">
          {task.status === "in-progress" ? "In Progress" : "To Do"}
          {" · "}
          {task.priority.charAt(0).toUpperCase() +
            task.priority.slice(1)}{" "}
          priority
        </p>
      </div>

      <p
        className={`shrink-0 text-sm font-medium ${
          overdue ? "text-red-600" : "text-blue-600"
        }`}
      >
        {overdue ? "Overdue: " : "Due: "}
        {formatDueDate(task.dueDate)}
      </p>
    </article>
  );

  return (
    <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight text-gray-900">
          Dashboard
        </h1>

        <p className="mt-2 text-gray-600">
          Track your productivity and stay on top of your tasks.
        </p>
      </div>

      {/* Empty State */}
      {totalTasks === 0 && (
        <div className="mb-8 rounded-xl border border-gray-200 bg-white p-8 text-center shadow-sm">
          <h2 className="text-xl font-semibold text-gray-900">
            No tasks yet
          </h2>

          <p className="mt-2 text-gray-600">
            Create your first task to start tracking your productivity.
          </p>
        </div>
      )}

      {/* Task Statistics */}
      <section aria-labelledby="task-statistics-heading">
        <h2
          id="task-statistics-heading"
          className="mb-4 text-lg font-semibold text-gray-900"
        >
          Task Statistics
        </h2>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {statistics.map(renderStatisticCard)}
        </div>
      </section>

      {/* Completion Overview */}
      <section className="mt-8 rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-lg font-semibold text-gray-900">
              Completion Overview
            </h2>

            <p className="mt-1 text-sm text-gray-500">
              Your completed tasks compared with your total tasks.
            </p>
          </div>

          <p className="text-2xl font-bold text-green-600">
            {completionPercentage}%
          </p>
        </div>

        <div
          className="mt-5 h-3 overflow-hidden rounded-full bg-gray-100"
          role="progressbar"
          aria-label="Task completion"
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={completionPercentage}
        >
          <div
            className="h-full rounded-full bg-green-500 transition-all duration-300"
            style={{ width: `${completionPercentage}%` }}
          />
        </div>
      </section>

      {/* Priority Statistics */}
      <section
        aria-labelledby="priority-statistics-heading"
        className="mt-8"
      >
        <h2
          id="priority-statistics-heading"
          className="mb-4 text-lg font-semibold text-gray-900"
        >
          Tasks by Priority
        </h2>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {priorityStatistics.map(renderStatisticCard)}
        </div>
      </section>

      {/* Upcoming Tasks */}
      <section
        aria-labelledby="upcoming-tasks-heading"
        className="mt-8 rounded-xl border border-gray-200 bg-white p-6 shadow-sm"
      >
        <div className="mb-4 flex items-center justify-between gap-4">
          <div>
            <h2
              id="upcoming-tasks-heading"
              className="text-lg font-semibold text-gray-900"
            >
              Upcoming Tasks
            </h2>

            <p className="mt-1 text-sm text-gray-500">
              Tasks due today or within the next seven days.
            </p>
          </div>

          <span className="rounded-full bg-blue-100 px-3 py-1 text-sm font-semibold text-blue-700">
            {upcomingTasks.length}
          </span>
        </div>

        {upcomingTasks.length === 0 ? (
          <p className="rounded-lg bg-gray-50 p-4 text-sm text-gray-500">
            No upcoming tasks. You're all caught up!
          </p>
        ) : (
          <div className="space-y-3">
            {upcomingTasks.map((task) =>
              renderDueTask(task, false),
            )}
          </div>
        )}
      </section>

      {/* Overdue Tasks */}
      <section
        aria-labelledby="overdue-tasks-heading"
        className="mt-6 rounded-xl border border-gray-200 bg-white p-6 shadow-sm"
      >
        <div className="mb-4 flex items-center justify-between gap-4">
          <div>
            <h2
              id="overdue-tasks-heading"
              className="text-lg font-semibold text-gray-900"
            >
              Overdue Tasks
            </h2>

            <p className="mt-1 text-sm text-gray-500">
              Uncompleted tasks with past due dates.
            </p>
          </div>

          <span
            className={`rounded-full px-3 py-1 text-sm font-semibold ${
              overdueTasks.length > 0
                ? "bg-red-100 text-red-700"
                : "bg-green-100 text-green-700"
            }`}
          >
            {overdueTasks.length}
          </span>
        </div>

        {overdueTasks.length === 0 ? (
          <p className="rounded-lg bg-gray-50 p-4 text-sm text-gray-500">
            No overdue tasks. Great work!
          </p>
        ) : (
          <div className="space-y-3">
            {overdueTasks.map((task) =>
              renderDueTask(task, true),
            )}
          </div>
        )}
      </section>
    </div>
  );
}

export default Dashboard;