import { Navigate } from "react-router-dom"
import type { ReactNode } from "react"

type Props = {
  children: ReactNode
}

export const RequiredAuth = ({ children }: Props) => {
  const token = localStorage.getItem("accessToken")

  if (!token) {
    return <Navigate to="/login" replace />
  }

  return <>{children}</>
}
