import { Outlet, useLocation } from "react-router-dom"
import { AdminSidebar } from "../admin/AdminSidebar"
import { AdminHeader } from "../admin/AdminHeader"

export const AdminLayout = () => {
  const location = useLocation()

  const getTitle = () => {
    if (location.pathname === "/admin") return "Dashboard"
    if (location.pathname === "/admin/users") return "Users"
    if (location.pathname === "/admin/bookings") return "Bookings"
    if (location.pathname === "/admin/services") return "Services"
    if (location.pathname === "/admin/staffs") return "Staffs"
    return "Admin"
  }

  return (
    <div className="flex min-h-screen bg-gray-50">
      <AdminSidebar />

      <div className="flex-1 flex flex-col">
        <AdminHeader title={getTitle()} />

        <main className="p-6">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
