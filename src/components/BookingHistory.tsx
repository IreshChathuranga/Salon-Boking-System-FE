// src/pages/BookingHistory.tsx
import { useEffect, useState } from "react";

interface Booking {
  id: string;
  service: string;
  date: string;
  time: string;
  price: number;
  status: "completed" | "pending" | "canceled";
}

export default function BookingHistory() {
  const [history, setHistory] = useState<Booking[]>([]);

  useEffect(() => {
    setHistory([
      {
        id: "001",
        service: "Hair Cut",
        date: "2025-01-10",
        time: "10:30 AM",
        price: 2500,
        status: "completed",
      },
      {
        id: "002",
        service: "Facial Treatment",
        date: "2025-01-15",
        time: "02:00 PM",
        price: 5500,
        status: "pending",
      },
      {
        id: "003",
        service: "Hair Color",
        date: "2025-01-20",
        time: "01:00 PM",
        price: 7500,
        status: "canceled",
      },
    ]);
  }, []);

  const statusClasses = {
    completed: "text-green-600 bg-green-100",
    pending: "text-yellow-600 bg-yellow-100",
    canceled: "text-red-600 bg-red-100",
  };

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-6">Booking History</h2>

      <div className="space-y-4">
        {history.map((item) => (
          <div
            key={item.id}
            className="p-4 rounded-xl border bg-white shadow-sm flex justify-between items-center"
          >
            <div>
              <p className="font-semibold">{item.service}</p>
              <p className="text-sm text-gray-500">
                {item.date} • {item.time}
              </p>
            </div>

            <div className="text-right">
              <p className="font-bold">Rs {item.price}</p>
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
