import { AdminSidebar } from "../components/admin/AdminSidebar"
import { AdminHeader } from "../components/admin/AdminHeader"
import { StatCard } from "../components/admin/StatCard"
import { Users, Calendar, CreditCard, Scissors } from "lucide-react"

export default function AdminDashboard() {
    return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard title="Total Users" value="120" icon={Users} />
        <StatCard title="Bookings" value="87" icon={Calendar} />
        <StatCard title="Payments" value="LKR 145,000" icon={CreditCard} />
        <StatCard title="Services" value="12" icon={Scissors} />
      </div>

      <div className="mt-10 bg-white rounded-xl shadow p-6">
        <h2 className="text-lg font-semibold mb-4">Recent Bookings</h2>

        <table className="w-full text-sm">
          <thead>
            <tr className="border-b text-left">
              <th className="py-2">Customer</th>
              <th>Date</th>
              <th>Service</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b">
              <td className="py-3">Kamal</td>
              <td>2025-01-12</td>
              <td>Hair Cut</td>
              <td className="text-green-600 font-medium">Confirmed</td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  )
}
