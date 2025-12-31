import { useSelector } from "react-redux"
import type { RootState } from "../../lib/store"

export const AdminHeader = ({ title }: { title: string }) => {
  const admin = useSelector((state: RootState) => state.user.profile)

  return (
    <header className="bg-white shadow px-6 py-4 flex justify-between items-center">
      <h2 className="text-2xl font-semibold">{title}</h2>

      <div className="flex items-center gap-3">
        <span className="text-sm text-gray-600">
          {admin?.name || "Admin"}
        </span>

        {admin?.avatarUrl ? (
          <img
            src={admin.avatarUrl}
            className="w-9 h-9 rounded-full object-cover"
          />
        ) : (
          <div className="w-9 h-9 bg-black text-white rounded-full flex items-center justify-center">
            {admin?.name?.charAt(0).toUpperCase() || "A"}
          </div>
        )}
      </div>
    </header>
  )
}
