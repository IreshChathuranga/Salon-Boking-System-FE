type Props = {
  title: string
}

export const AdminHeader =  ({ title }: Props) => {
  return (
    <header className="bg-white shadow px-6 py-4 flex justify-between items-center">
      <h2 className="text-lg font-semibold">{title}</h2>

      <div className="flex items-center gap-3">
        <span className="text-sm text-gray-600">Admin</span>
        <div className="w-9 h-9 bg-black text-white rounded-full flex items-center justify-center">
          A
        </div>
      </div>
    </header>
  )
}
