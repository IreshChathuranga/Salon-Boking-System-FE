import api from "../api"

export const getAllUsers = async () => {
  const res = await api.get("/admin/users")
  return res.data
}

export const addAdmin = async (data: FormData) => {
  const res = await api.post("/admin/add", data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  })
  return res.data
}

export const updateAdmin = async (id: string, data: FormData) => {
  const res = await api.put(`/admin/${id}`, data)
  return res.data
}

export const deleteAdmin = async (id: string) => {
  const res = await api.delete(`/admin/${id}`)
  return res.data
}
