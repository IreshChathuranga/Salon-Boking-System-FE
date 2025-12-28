import api from "../api"

export const getAllStaff = async () => {
  const res = await api.get("/staff")
  return res.data
}

export const addStaff = async (data: FormData) => {
  const res = await api.post("/staff", data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  })
  return res.data
}

export const updateStaff = async (id: string, data: FormData) => {
  const res = await api.put(`/staff/${id}`, data)
  return res.data
}

export const deleteStaff = async (id: string) => {
  const res = await api.delete(`/staff/${id}`)
  return res.data
}