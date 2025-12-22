import api from "./api";

export type PublicStaffType = {
  _id: string;
  name: string;
  age: number;
  role: string;
  avatarUrl?: string;
};

export const fetchPublicStaff = async (): Promise<PublicStaffType[]> => {
  const res = await api.get("/staff/public");
  return res.data;
};
