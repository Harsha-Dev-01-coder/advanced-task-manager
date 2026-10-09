import { NavLink, Outlet } from "react-router-dom";

function DashboardLayout() {
  const navLinkClasses = ({ isActive }: { isActive: boolean }) =>
    `block rounded-lg px-4 py-3 text-sm font-medium transition-colors ${
      isActive
        ? "bg-blue-600 text-white"
        : "text-gray-700 hover:bg-gray-100 hover:text-gray-900"
    }`;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top Navigation */}
      <header className="sticky top-0 z-10 border-b border-gray-200 bg-white">
        <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
          <NavLink
            to="/dashboard"
            className="text-lg font-bold tracking-tight text-gray-900 sm:text-xl"
          >
            Task Manager
          </NavLink>

          <NavLink
            to="/tasks/new"
            className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-blue-700"
          >
            + New Task
          </NavLink>
        </nav>
      </header>

      {/* Main Layout */}
      <div className="mx-auto flex max-w-7xl flex-col md:flex-row">
        {/* Sidebar */}
        <aside className="border-b border-gray-200 bg-white p-4 md:min-h-[calc(100vh-65px)] md:w-60 md:shrink-0 md:border-r md:border-b-0">
          <p className="mb-3 px-4 text-xs font-semibold uppercase tracking-wider text-gray-400">
            Workspace
          </p>

          <nav aria-label="Main navigation" className="flex flex-row gap-2 md:flex-col">
            <NavLink to="/dashboard" className={navLinkClasses} end>
              Dashboard
            </NavLink>

            <NavLink to="/tasks" className={navLinkClasses} end>
              Tasks
            </NavLink>

            <NavLink to="/tasks/new" className={navLinkClasses}>
              Create Task
            </NavLink>
          </nav>
        </aside>

        {/* Page Content */}
        <main className="min-w-0 flex-1 p-4 sm:p-6 lg:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default DashboardLayout;