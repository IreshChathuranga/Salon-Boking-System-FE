import { useEffect, useState } from "react"
import Swal from "sweetalert2"
import {
    getAllService,
    addService,
    updateService,
    deleteService
} from "../../services/admin/adminService"

type Service = {
    _id: string
    name: string
    description?: string;
    price: number;
    duration: number;
}

const ROWS_PER_PAGE = 7

export default function AdminServicePage() {
    const [service, setService] = useState<Service[]>([])
    const [currentPage, setCurrentPage] = useState(1)
    const [loading, setLoading] = useState(true)

    const loadService = async () => {
        try {
            setLoading(true)
            const data = await getAllService()
            setService(data)
        } catch (err) {
            console.error(err)
        } finally {
            setLoading(false)
        }
    }
    useEffect(() => {
        loadService()
    }, [])


    const handleAddService = async () => {
        const { value } = await Swal.fire({
            title: "Add Service",
            html: `
      <input id="name" class="swal2-input" placeholder="Service Name">
      <input id="price" type="number" class="swal2-input" placeholder="Price">
      <input id="duration" type="number" class="swal2-input" placeholder="Duration (mins)">
      <textarea id="description" class="swal2-textarea" placeholder="Description"></textarea>
    `,
            preConfirm: () => {
                const name = (document.getElementById("name") as HTMLInputElement).value
                const price = Number((document.getElementById("price") as HTMLInputElement).value)
                const duration = Number((document.getElementById("duration") as HTMLInputElement).value)
                const description = (document.getElementById("description") as HTMLTextAreaElement).value

                if (!name || !price || !duration) {
                    Swal.showValidationMessage("Name, Price, Duration required")
                    return
                }
                return { name, price, duration, description }
            },
        })

        if (value) {
            await addService(value)
            Swal.fire("Success", "Service added", "success")
            loadService()
        }
    }

    const handleEditService = async (service: Service) => {
        const { value } = await Swal.fire({
            title: "Edit Service",
            html: `
      <input id="name" class="swal2-input" value="${service.name}">
      <input id="price" type="number" class="swal2-input" value="${service.price}">
      <input id="duration" type="number" class="swal2-input" value="${service.duration}">
      <textarea id="description" class="swal2-textarea">${service.description || ""}</textarea>
    `,
            preConfirm: () => {
                return {
                    name: (document.getElementById("name") as HTMLInputElement).value,
                    price: Number((document.getElementById("price") as HTMLInputElement).value),
                    duration: Number((document.getElementById("duration") as HTMLInputElement).value),
                    description: (document.getElementById("description") as HTMLTextAreaElement).value,
                }
            },
        })

        if (value) {
            await updateService(service._id, value)
            Swal.fire("Updated", "Service updated", "success")
            loadService()
        }
    }

    const handleDeleteService = async (service: Service) => {
        const result = await Swal.fire({
            title: "Delete Service?",
            text: service.name,
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Delete",
        })

        if (result.isConfirmed) {
            await deleteService(service._id)
            Swal.fire("Deleted", "Service removed", "success")
            loadService()
        }
    }

    const totalPages = Math.ceil(service.length / ROWS_PER_PAGE)
    const startIndex = (currentPage - 1) * ROWS_PER_PAGE
    const paginatedService = service.slice(startIndex, startIndex + ROWS_PER_PAGE)

    if (loading) return <p>Loading...</p>

    return (
        <div className="bg-white rounded-xl shadow p-6">
            <h2 className="text-lg font-semibold mb-4">Service Management</h2>
            <div className="mb-3 text-right">
                <button onClick={handleAddService} className="px-4 py-2 bg-green-600 text-white rounded">
                    + Add Service
                </button>
            </div>
            <table className="w-full text-sm border-collapse">
                <thead>
                    <tr className="border-b text-left">
                        <th className="px-3 py-2">Name</th>
                        <th className="px-3 py-2">Price</th>
                        <th className="px-3 py-2">Duration</th>
                        <th className="px-3 py-2">Description</th>
                        <th className="px-3 py-2">Actions</th>
                    </tr>
                </thead>

                <tbody>
                    {paginatedService.map((service) => (
                        <tr
                            key={service._id}
                            className="hover:bg-gray-50 border-b" 
                        >
                            <td className="px-3 py-3 font-medium align-top">
                                {service.name || <span className="text-gray-400">N/A</span>}
                            </td>

                            <td className="px-3 py-3 align-top">
                                Rs. {service.price}
                            </td>

                            <td className="px-3 py-3 align-top">
                                {service.duration} mins
                            </td>

                            <td className="px-3 py-3 align-top leading-relaxed">
                                {service.description
                                    ? service.description
                                        .split(".")
                                        .filter(Boolean)
                                        .map((line, index) => (
                                            <span key={index}>
                                                {line.trim()}.
                                                <br />
                                            </span>
                                        ))
                                    : <span className="text-gray-400">N/A</span>
                                }
                            </td>

                            <td className="flex gap-2 px-3 py-3 items-start"> 
                                <button onClick={() => handleEditService(service)} className="px-2 py-1 text-blue-600 border rounded">Edit</button>
                                <button onClick={() => handleDeleteService(service)} className="px-2 py-1 text-red-600 border rounded">Delete</button>
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