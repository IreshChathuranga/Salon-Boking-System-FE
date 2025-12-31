import api from "../api"

export const getAllPayments = async () => {
  const res = await api.get("/payment")
  return res.data
}