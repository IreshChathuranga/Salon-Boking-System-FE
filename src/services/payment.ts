import api from "./api"

export const createCheckoutSession = async (bookingIds: string[]) => {
  if (bookingIds.length === 0) throw new Error("No booking IDs");

  const res = await api.post(
    "/payment/create-checkout-session",
    { bookingIds },
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`, 
      },
    }
  );
  return res.data; 
};

export const confirmPayment = async (data: {
  bookingIds: string[];
  stripeSessionId: string;
  amount: number;
  currency: string;
}) => {
  const res = await api.post("/payment/confirm", data, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });

  return res.data;
};