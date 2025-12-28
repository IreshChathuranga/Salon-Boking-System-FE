import type { LucideIcon } from "lucide-react"

type Props = {
  title: string
  value: string
  icon: LucideIcon
}

export const StatCard = ({ title, value, icon: Icon }: Props) => {
  return (
    <div className="bg-white rounded-xl shadow p-6 flex justify-between items-center">
      <div>
        <p className="text-sm text-gray-500">{title}</p>
        <h3 className="text-xl font-bold mt-1">{value}</h3>
      </div>

      <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
        <Icon className="text-primary" />
      </div>
    </div>
  )
}
