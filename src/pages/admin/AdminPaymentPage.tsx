import {
    getAllPayments
} from "../../services/admin/adminPayment"
import { useEffect, useState } from "react"
import Swal from "sweetalert2"

type PaymentUser = {
    _id: string
    email: string
    name: string
}

type BookingInfo = {
    _id: string
    serviceName: string
    bookingDate: string
    bookingTime: string
    servicePrice: number
}

type Payment = {
    _id: string
    user: PaymentUser
    bookingIds: BookingInfo[]
    stripeSessionId: string;
    amount: number;
    currency: string;
    status: string;
}

const ROWS_PER_PAGE = 7

export default function AdminPaymentPage() {
    const [payment, setPayment] = useState<Payment[]>([])
    const [currentPage, setCurrentPage] = useState(1)
    const [loading, setLoading] = useState(true)

    const loadPayment = async () => {
        try {
            setLoading(true)
            const data = await getAllPayments()
            setPayment(data)
        } catch (err) {
            console.error(err)
        } finally {
            setLoading(false)
        }
    }
    useEffect(() => {
        loadPayment()
    }, [])

    const totalPages = Math.ceil(payment.length / ROWS_PER_PAGE)
    const startIndex = (currentPage - 1) * ROWS_PER_PAGE
    const paginatedPayment = payment.slice(startIndex, startIndex + ROWS_PER_PAGE)

    if (loading) return <p>Loading...</p>
    return (
        <div className="bg-white rounded-xl shadow p-6">
            <h2 className="text-lg font-semibold mb-4">Payment Management</h2>
            <table className="w-full text-sm border-collapse">
                <thead>
                    <tr className="border-b text-left">
                        <th className="px-3 py-2">User Email</th>
                        <th className="px-3 py-2">Booking ID</th>
                        <th className="px-3 py-2">StripeSession ID</th>
                        <th className="px-3 py-2">Booking Count</th>
                        <th className="px-3 py-2">Currency</th>
                        <th className="px-3 py-2">Status</th>
                    </tr>
                </thead>

                <tbody>
                    {paginatedPayment.map((payment) => (
                        <tr key={payment._id} className="hover:bg-gray-50 border-b">
                            <td className="px-3 py-3 font-medium align-top">
                                {payment.user?.email || <span className="text-gray-400">N/A</span>}
                            </td>
                            <td className="px-3 py-3 align-top">
                                {payment.bookingIds?.map(b => b._id).join(", ") || "N/A"}
                            </td>

                            <td className="px-3 py-3 align-top">{payment.stripeSessionId || "N/A"}</td>
                            <td className="px-3 py-3 align-top">{payment.amount || "N/A"}</td>
                            <td className="px-3 py-3 align-top">{payment.currency || "N/A"}</td>
                            <td className="px-3 py-3 align-top">
                                <span
                                    className={`px-2 py-1 rounded text-white font-medium ${payment.status === "PAID" ? "bg-green-500" : "bg-yellow-500"
                                        }`}
                                >
                                    {payment.status}
                                </span>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <div className="flex justify-end items-center gap-3 mt-4">
                <button
                    disabled={currentPage === 1}
                    onClick={() => setCurrentPage((p) => p - 1)}
                    className="px-3 py-1 border rounded disabled:opacity-40"
                >
                    Prev
                </button>
                <span className="text-sm">Page {currentPage} of {totalPages}</span>
                <button
                    disabled={currentPage === totalPages}
                    onClick={() => setCurrentPage((p) => p + 1)}
                    className="px-3 py-1 border rounded disabled:opacity-40"
                >
                    Next
                </button>
            </div>
        </div>
    )
}