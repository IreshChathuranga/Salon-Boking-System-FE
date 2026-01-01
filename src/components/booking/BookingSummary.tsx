import { BookingCard } from "./BookingCard"
import type { BookingCardData } from "../../lib/bookingType"
import { useState } from "react"
import { StripeCheckout } from "../StripeCheckout"
import { createCheckoutSession } from "../../services/payment"

type Props = {
  bookings: BookingCardData[]
  onRemove: (id: string) => void
  onPay: () => void
}

export function BookingSummary({ bookings, onRemove}: Props) {
  const total = bookings.reduce(
    (sum, b) => sum + b.servicePrice,
    0
  )
  
  const handlePay = async () => {
  try {
    if (bookings.length === 0) return;

    const bookingIds = bookings.map(b => b.id);

    const res = await createCheckoutSession(bookingIds);

    if (!res?.url) {
      throw new Error("Stripe URL not returned");
    }

    window.location.href = res.url;
  } catch (err: any) {
    console.error("Payment error:", err);
    alert(err.response?.data?.message || "Payment failed. Please try again.");
  }
};

  if (bookings.length === 0) return null


  return (
    <div className="max-w-3xl mx-auto mt-10 bg-black/40 backdrop-blur-md
                    border border-[#d4af37] rounded-3xl p-6 space-y-6">

      <h2 className="text-2xl text-white font-serif">
        Booking Summary
      </h2>

      <div className="space-y-4">
        {bookings.map((b, i) => (
          <BookingCard key={b.id} data={b} onRemove={onRemove} />
        ))}
      </div>

      <hr className="border-[#d4af37]/40" />

      <div className="flex justify-between text-white text-lg">
        <span>Total</span>
        <span>Rs.{total}</span>
      </div>

      <button
        onClick={handlePay}
        className="w-full btn-gold py-3 rounded-2xl text-white text-lg"
      >
        Proceed to Payment
      </button>
    </div>
  )
}
