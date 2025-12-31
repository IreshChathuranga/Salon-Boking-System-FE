import api from "../api"

export const getAllBooking = async () => {
  const res = await api.get("/booking")
  return res.data
}

export const updateBooking = async (id: string, data: any) => {
  const res = await api.put(`/booking/${id}`, data)
  return res.data
}

export const deleteBooking = async (id: string) => {
  const res = await api.delete(`/booking/${id}`)
  return res.data
}
