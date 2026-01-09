import { Link, useLocation } from "react-router-dom"
import { LayoutDashboard, Users, Calendar, Settings, LogOut } from "lucide-react"
import dashboardImg from "../../assets/dashboard.png"


export const AdminSidebar = () => {
  const location = useLocation()

  const navItemClass = (path: string) =>
    `flex items-center gap-3 px-4 py-3 rounded-xl border border-white/20
     transition-all duration-300
     ${
       location.pathname === path
         ? "bg-white/20 text-white"
         : "hover:bg-white/10"
     }`

  return (
    <aside className="w-64 bg-black text-white flex flex-col">

      <div className="flex items-center gap-3 px-6 py-6 border-b border-white/20">
        <img
          src={dashboardImg}
          alt="Dashboard"
          className="w-18 h-7 rounded-xl border border-white/30 object-cover"
        />
        <h1 className="text-lg font-semibold tracking-wide">
          Admin Panel
        </h1>
      </div>

      <nav className="flex-1 flex flex-col justify-center gap-4 px-4">

        <Link to="/admin" className={navItemClass("/admin")}>
          <LayoutDashboard size={18} />
          Dashboard
        </Link>

        <Link to="/admin/users" className={navItemClass("/admin/users")}>
          <Users size={18} />
          Users
        </Link>

        <Link to="/admin/staffs" className={navItemClass("/admin/staffs")}>
          <Users size={18} />
          Staffs
        </Link>

        <Link to="/admin/services" className={navItemClass("/admin/services")}>
          <Users size={18} />
          Services
        </Link>

        <Link to="/admin/bookings" className={navItemClass("/admin/bookings")}>
          <Calendar size={18} />
          Bookings
        </Link>

        <Link to="/admin/payments" className={navItemClass("/admin/payments")}>
          <Calendar size={18} />
          Payments
        </Link>

        <Link to="/admin/settings" className={navItemClass("/admin/settings")}>
          <Settings size={18} />
          Settings
        </Link>

      </nav>

      <div className="px-4 pb-6">
        <button
          onClick={() => {
            localStorage.clear()
            window.location.href = "/login"
          }}
          className="
            flex items-center gap-3 w-full px-4 py-3
            rounded-xl border border-red-400/40
            text-red-400 hover:bg-red-500/10
            transition-all duration-300
          "
        >
          <LogOut size={18} />
          Logout
        </button>
      </div>

    </aside>
  )
}
