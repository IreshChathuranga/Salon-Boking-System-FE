import { Navigate } from "react-router-dom"
import type { ReactNode } from "react"

type Props = {
  children: ReactNode
}

export const AdminOnlyAuth = ({ children }: Props) => {
  const token = localStorage.getItem("accessToken")
  const role = localStorage.getItem("role")

  if (!token) {
    return <Navigate to="/login" replace />
  }

  if (role !== "ADMIN") {
    return <Navigate to="/" replace />
  }

  return <>{children}</>
}
