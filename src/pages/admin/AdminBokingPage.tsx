import {
    getAllBooking,
    updateBooking,
    deleteBooking
} from "../../services/admin/adminBooking"
import { useEffect, useState } from "react"
import Swal from "sweetalert2"

type BookingUser = {
    _id: string
    email: string
    name: string
}


type Booking = {
    _id: string
    user: BookingUser
    serviceName: string
    servicePrice: number
    serviceDuration: number
    bookingDate: string
    bookingTime: string
    stylistName: string
    stylistRole: string
    status: string
}

const ROWS_PER_PAGE = 7

export default function AdminBookingPage() {
    const [booking, setBooking] = useState<Booking[]>([])
    const [currentPage, setCurrentPage] = useState(1)
    const [loading, setLoading] = useState(true)

    const loadBooking = async () => {
        try {
            setLoading(true)
            const data = await getAllBooking()
            setBooking(data)
        } catch (err) {
            console.error(err)
        } finally {
            setLoading(false)
        }
    }
    useEffect(() => {
        loadBooking()
    }, [])

    const handleEditBooking = async (booking: Booking) => {
        const { value: status } = await Swal.fire({
            title: "Update Booking Status",
            input: "select",
            inputOptions: {
                PENDING: "PENDING",
                PAID: "PAID",
            },
            inputValue: booking.status,
            showCancelButton: true,
        })

        if (!status) return

        await updateBooking(booking._id, { status })

        Swal.fire("Updated!", "Booking updated successfully", "success")
        loadBooking()
    }

    const handleDeleteBooking = async (booking: Booking) => {
        const confirm = await Swal.fire({
            title: "Are you sure?",
            text: "This booking will be permanently deleted",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Yes, delete it",
        })

        if (!confirm.isConfirmed) return

        await deleteBooking(booking._id)

        Swal.fire("Deleted!", "Booking deleted successfully", "success")
        loadBooking()
    }

    const totalPages = Math.ceil(booking.length / ROWS_PER_PAGE)
    const startIndex = (currentPage - 1) * ROWS_PER_PAGE
    const paginatedBooking = booking.slice(startIndex, startIndex + ROWS_PER_PAGE)

    if (loading) return <p>Loading...</p>

    return (
        <div className="bg-white rounded-xl shadow p-6">
            <h2 className="text-lg font-semibold mb-4">Booking Management</h2>
            <table className="w-full text-sm border-collapse">
                <thead>
                    <tr className="border-b text-left">
                        <th className="px-3 py-2">User Email</th>
                        <th className="px-3 py-2">Service Name</th>
                        <th className="px-3 py-2">Service Price</th>
                        <th className="px-3 py-2">Service Duration</th>
                        <th className="px-3 py-2">Stylist Name</th>
                        <th className="px-3 py-2">Stylist Role</th>
                        <th className="px-3 py-2">Booking Date</th>
                        <th className="px-3 py-2">Booking Time</th>
                        <th className="px-3 py-2">Status</th>
                        <th className="px-3 py-2">Actions</th>
                    </tr>
                </thead>

                <tbody>
                    {paginatedBooking.map((booking) => (
                        <tr key={booking._id} className="hover:bg-gray-50 border-b">
                            <td className="px-3 py-3 font-medium align-top">
                                {booking.user?.email || <span className="text-gray-400">N/A</span>}
                            </td>
                            <td className="px-3 py-3 align-top">{booking.serviceName || "N/A"}</td>
                            <td className="px-3 py-3 align-top">Rs. {booking.servicePrice}</td>
                            <td className="px-3 py-3 align-top">{booking.serviceDuration} mins</td>
                            <td className="px-3 py-3 align-top">{booking.stylistName || "N/A"}</td>
                            <td className="px-3 py-3 align-top">{booking.stylistRole || "N/A"}</td>
                            <td className="px-3 py-3 align-top">{booking.bookingDate || "N/A"}</td>
                            <td className="px-3 py-3 align-top">{booking.bookingTime || "N/A"}</td>
                            <td className="px-3 py-3 align-top">
                                <span
                                    className={`px-2 py-1 rounded text-white font-medium ${booking.status === "PAID" ? "bg-green-500" : "bg-yellow-500"
                                        }`}
                                >
                                    {booking.status}
                                </span>
                            </td>
                            <td className="flex gap-2 px-3 py-3 items-start">
                                <button
                                    disabled={booking.status === "PAID"}
                                    onClick={() => handleEditBooking(booking)}
                                    className={`px-2 py-1 border rounded
                                                ${booking.status === "PAID"
                                            ? "text-gray-400 border-gray-300 cursor-not-allowed"
                                            : "text-blue-600 border-blue-600 hover:bg-blue-50"
                                        }`}>
                                    Edit
                                </button>

                                <button
                                    disabled={booking.status === "PAID"}
                                    onClick={() => handleDeleteBooking(booking)}
                                    className={`px-2 py-1 border rounded
                                                ${booking.status === "PAID"
                                            ? "text-gray-400 border-gray-300 cursor-not-allowed"
                                            : "text-red-600 border-red-600 hover:bg-red-50"
                                        }`}>
                                    Delete
                                </button>
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