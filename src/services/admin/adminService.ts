import api from "../api"

export const getAllService = async () => {
  const res = await api.get("/service")
  return res.data
}


export const addService = async (data: {
  name: string
  description?: string
  price: number
  duration: number
}) => {
  const res = await api.post("/service", data)
  return res.data
}

export const updateService = async (
  id: string,
  data: {
    name: string
    description?: string
    price: number
    duration: number
  }
) => {
  const res = await api.put(`/service/${id}`, data)
  return res.data
}

export const deleteService = async (id: string) => {
  const res = await api.delete(`/service/${id}`)
  return res.data
}
