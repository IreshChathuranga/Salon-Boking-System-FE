import type { BookingCardData } from "../lib/bookingType"
type Props = {
  data: BookingCardData
  onRemove: (id: string) => void
}

export function BookingCard({ data , onRemove }: Props) {
  return (
    <div className="max-w-3xl mx-auto mt-10 bg-black/40 backdrop-blur-md border border-[#d4af37] rounded-3xl p-6 text-white space-y-4">
      <div className="flex items-center gap-4">
        {data.avatarUrl && (
          <img src={data.avatarUrl} className="w-16 h-16 rounded-full" />
        )}
        <div>
          <p className="text-xl font-semibold">{data.userName}</p>
          <p className="text-sm text-gray-300">{data.userPhone}</p>
        </div>
      </div>

      <hr className="border-[#d4af37]/40" />

      <p><b>Service:</b> {data.serviceName}</p>
      <p><b>Price:</b> Rs.{data.servicePrice}</p>
      <p><b>Duration:</b> {data.serviceDuration} mins</p>

      <p><b>Date:</b> {data.bookingDate}</p>
      <p><b>Time:</b> {data.bookingTime}</p>

      <p><b>Stylist:</b> {data.stylistName} ({data.stylistRole})</p>
      <p>Status: {data.status}</p>

      <button
        onClick={() => onRemove(data.id)}
        className="mt-4 text-red-400 underline"
      >
        Remove Booking
      </button>
    </div>
  )
}
