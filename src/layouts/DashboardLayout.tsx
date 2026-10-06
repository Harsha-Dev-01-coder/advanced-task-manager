import { NavLink, Outlet } from "react-router-dom";

function DashboardLayout() {
  return (
    <div className="min-h-screen">
      <nav className="border-b p-4">
        <NavLink to="/dashboard">
          Dashboard
        </NavLink>
      </nav>

      <div className="flex">
        <aside className="w-64 border-r p-4">
          <div className="flex flex-col gap-4">
            <NavLink to="/dashboard">
              Dashboard
            </NavLink>

            <NavLink to="/tasks">
              Tasks
            </NavLink>

            <NavLink to="/tasks/new">
              New Task
            </NavLink>

            <NavLink to="/tasks/1">
              Task
            </NavLink>
          </div>
        </aside>

        <main className="flex-1 p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default DashboardLayout;