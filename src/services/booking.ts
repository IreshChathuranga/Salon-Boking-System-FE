import api from "./api"

export const createBooking = async (payload: any) => {
  const res = await api.post("/booking", payload)
  return res.data
}

export const deleteBooking = async (id: string) => {
  await api.delete(`/booking/${id}`)
}

export const getMyBookings = async () => {
  const res = await api.get("/booking/my");
  return res.data;
};
