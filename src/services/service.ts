import api from "./api";

export type ServiceType = {
  _id: string;
  name: string;
  description?: string;
  price: number;
  duration: number;
};

export const fetchServices = async (): Promise<ServiceType[]> => {
  const res = await api.get("/service"); 
  return res.data;
};
