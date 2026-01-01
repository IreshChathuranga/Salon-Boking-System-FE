import { useEffect, useState } from "react";
import { getMyBookings } from "../../services/booking";

interface Booking {
  _id: string;
  serviceName: string;
  bookingDate: string;
  bookingTime: string;
  servicePrice: number;
  status: "PENDING" | "PAID";
}

export default function BookingHistory() {
  const [history, setHistory] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadHistory = async () => {
      try {
        const data = await getMyBookings();
        setHistory(data);
      } catch (err) {
        console.error("Failed to load booking history", err);
      } finally {
        setLoading(false);
      }
    };

    loadHistory();
  }, []);

  const statusClasses = {
    PAID: "text-green-600 bg-green-100",
    PENDING: "text-yellow-600 bg-yellow-100",
  };

  if (loading) return <p>Loading booking history...</p>;

  if (history.length === 0) {
    return <p className="text-gray-500">No bookings found.</p>;
  }

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-6">Booking History</h2>

      <div className="space-y-4">
        {history.map((item) => (
          <div
            key={item._id}
            className="p-4 rounded-xl border bg-white shadow-sm flex justify-between items-center"
          >
            <div>
              <p className="font-semibold">{item.serviceName}</p>
              <p className="text-sm text-gray-500">
                {item.bookingDate} • {item.bookingTime}
              </p>
            </div>

            <div className="text-right">
              <p className="font-bold">Rs {item.servicePrice}</p>
              <span
                className={`px-3 py-1 text-sm rounded-full ${statusClasses[item.status]}`}
              >
                {item.status}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
