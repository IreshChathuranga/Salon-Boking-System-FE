import { useEffect, useState } from "react"
import Swal from "sweetalert2"
import {
    getAllStaff,
    addStaff,
    updateStaff,
    deleteStaff
} from "../../services/admin/adminStaff"

type Staff = {
    _id: string
    email: string
    role: string[]
    name: string
    phone: string
    age: string
    avatarUrl?: string
}

const ROWS_PER_PAGE = 7

export default function AdminStaffPage() {
    const [staff, setStaff] = useState<Staff[]>([])
    const [currentPage, setCurrentPage] = useState(1)
    const [loading, setLoading] = useState(true)

    const loadStaff = async () => {
        try {
            setLoading(true)
            const data = await getAllStaff()
            setStaff(data)
        } catch (err) {
            console.error(err)
        } finally {
            setLoading(false)
        }
    }
    useEffect(() => {
        loadStaff()
    }, [])

    const handleAddStaff = async () => {
        const { value: formValues } = await Swal.fire({
            title: "Add Staff",
            html: `
          <input id="swal-name" class="swal2-input" placeholder="Name">
          <input id="swal-email" class="swal2-input" placeholder="Email">
          <input id="swal-age" type="number" class="swal2-input" placeholder="Age">
          <input id="swal-phone" class="swal2-input" placeholder="Phone">
          <input id="swal-role" class="swal2-input" placeholder="Role">
          <input id="swal-avatar" type="file" class="swal2-file" accept="image/*">
        `,
            focusConfirm: false,
            preConfirm: () => {
                const name = (document.getElementById("swal-name") as HTMLInputElement).value
                const email = (document.getElementById("swal-email") as HTMLInputElement).value
                const age = (document.getElementById("swal-age") as HTMLInputElement).value
                const phone = (document.getElementById("swal-phone") as HTMLInputElement).value
                const role = (document.getElementById("swal-role") as HTMLInputElement).value
                const avatar = (document.getElementById("swal-avatar") as HTMLInputElement).files?.[0]

                if (!name || !email) {
                    Swal.showValidationMessage("Name, Email, Password required")
                    return
                }

                return { name, email, age, phone, role, avatar }
            },
        })

        if (formValues) {
            try {
                const formData = new FormData()
                formData.append("name", formValues.name)
                formData.append("email", formValues.email)
                formData.append("age", formValues.age)
                formData.append("phone", formValues.phone)
                formData.append("role", formValues.role)
                if (formValues.avatar) {
                    formData.append("avatar", formValues.avatar)
                }

                await addStaff(formData)
                Swal.fire("Success", "Staff added successfully", "success")
                loadStaff()
            } catch (err: any) {
                Swal.fire("Error", err.response?.data?.message || "Failed to add admin", "error")
            }
        }
    }

    const handleEditStaff = async (staff: Staff) => {
        const { value: formValues } = await Swal.fire({
            title: "Edit Staff",
            html: `
          <img src="${staff.avatarUrl}" 
               style="width:80px;height:80px;border-radius:50%;margin:auto;display:block" />
    
          <input id="swal-name" class="swal2-input" placeholder="Name" value="${staff.name || ""}">
          <input id="swal-email" class="swal2-input" placeholder="Email" value="${staff.email}">
          <input id="swal-age" class="swal2-input" placeholder="Age" value="${staff.age || ""}">
          <input id="swal-phone" class="swal2-input" placeholder="Phone" value="${staff.phone || ""}">
          <input id="swal-role" class="swal2-input" placeholder="Role" value="${Array.isArray(staff.role) ? staff.role.join(", ") : staff.role}">
          <input id="swal-avatar" type="file" class="swal2-file" accept="image/*">
        `,
            focusConfirm: false,
            preConfirm: () => {
                const name = (document.getElementById("swal-name") as HTMLInputElement).value
                const email = (document.getElementById("swal-email") as HTMLInputElement).value
                const age = (document.getElementById("swal-age") as HTMLInputElement).value
                const phone = (document.getElementById("swal-phone") as HTMLInputElement).value
                const role = (document.getElementById("swal-role") as HTMLInputElement).value
                const avatar = (document.getElementById("swal-avatar") as HTMLInputElement).files?.[0]

                if (!name) {
                    Swal.showValidationMessage("Name is required")
                    return
                }

                return { name, email, age, phone, role, avatar }
            },
        })

        if (formValues) {
            try {
                const formData = new FormData()
                formData.append("name", formValues.name)
                formData.append("email", formValues.email)
                formData.append("age", formValues.age)
                formData.append("phone", formValues.phone)
                formData.append("role", formValues.role)

                if (formValues.avatar) {
                    formData.append("avatar", formValues.avatar)
                }

                await updateStaff(staff._id, formData)

                Swal.fire("Success", "Staff updated successfully", "success")
                loadStaff()
            } catch (err: any) {
                Swal.fire("Error", err.response?.data?.message || "Update failed", "error")
            }
        }
    }

    const handleDeleteStaff = async (staff: Staff) => {
        const result = await Swal.fire({
          title: "Are you sure?",
          text: `Delete staff ${staff.name}?`,
          icon: "warning",
          showCancelButton: true,
          confirmButtonText: "Yes, delete it!",
        })
    
        if (result.isConfirmed) {
          try {
            await deleteStaff(staff._id)
            Swal.fire("Deleted!", "Staff has been deleted.", "success")
            loadStaff()
          } catch (err: any) {
            Swal.fire("Error", err.response?.data?.message || "Failed to delete admin", "error")
          }
        }
      }

    const totalPages = Math.ceil(staff.length / ROWS_PER_PAGE)
    const startIndex = (currentPage - 1) * ROWS_PER_PAGE
    const paginatedStaff = staff.slice(startIndex, startIndex + ROWS_PER_PAGE)

    if (loading) return <p>Loading...</p>

    return (
        <div className="bg-white rounded-xl shadow p-6">
            <h2 className="text-lg font-semibold mb-4">Staff Management</h2>
            <div className="mb-3 text-right">
                <button onClick={handleAddStaff} className="px-4 py-2 bg-green-600 text-white rounded">
                    + Add Staff
                </button>
            </div>
            <table className="w-full text-sm">
                <thead>
                    <tr className="border-b text-left">
                        <th className="py-2">Avatar</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Age</th>
                        <th>Phone</th>
                        <th>Role</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {paginatedStaff.map((staff) => (
                        <tr key={staff._id} className="border-b hover:bg-gray-50">
                            <td className="py-3">
                                <img src={staff.avatarUrl} className="w-10 h-10 rounded-full border" />
                            </td>
                            <td>{staff.name || <span className="text-gray-400">N/A</span>}</td>
                            <td>{staff.email}</td>
                            <td>{staff.age || <span className="text-gray-400">N/A</span>}</td>
                            <td>{staff.phone || <span className="text-gray-400">N/A</span>}</td>
                            <td>{Array.isArray(staff.role) ? staff.role.join(", ") : staff.role}</td>
                            <td className="flex gap-2 py-2">
                                <button onClick={() => handleEditStaff(staff)} className="px-2 py-1 text-blue-600 border rounded">Edit</button>
                                <button onClick={() => handleDeleteStaff(staff)} className="px-2 py-1 text-red-600 border rounded">Delete</button>
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