import { BookingCard } from "./BookingCard"
import type { BookingCardData } from "../lib/bookingType"

type Props = {
  bookings: BookingCardData[]
  onRemove: (id: string) => void
  onPay: () => void
}

export function BookingSummary({ bookings, onRemove, onPay }: Props) {
  const total = bookings.reduce(
    (sum, b) => sum + b.servicePrice,
    0
  )

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
        onClick={onPay}
        className="w-full btn-gold py-3 rounded-2xl text-white text-lg"
      >
        Proceed to Payment
      </button>
    </div>
  )
}
