import { useEffect, useState } from "react"
import Swal from "sweetalert2"
import {
  getAllUsers,
  addAdmin,
  updateAdmin,
  deleteAdmin,
} from "../../services/admin/adminUsers"
import defaultAvatar from "../../assets/usermainpic.jpg"

type User = {
  _id: string
  email: string
  roles: string[]
  name?: string
  phone?: string
  gender?: string
  avatarUrl?: string
}

const ROWS_PER_PAGE = 7

export default function AdminUsersPage() {
  const [users, setUsers] = useState<User[]>([])
  const [view, setView] = useState<"USERS" | "ADMINS">("USERS")
  const [currentPage, setCurrentPage] = useState(1)
  const [loading, setLoading] = useState(true)

  const loadUsers = async () => {
    try {
      setLoading(true)
      const data = await getAllUsers()
      setUsers(data)
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadUsers()
  }, [])

  const filteredUsers =
    view === "ADMINS"
      ? users.filter((u) => u.roles.includes("ADMIN"))
      : users.filter((u) => u.roles.includes("USER"))

  const totalPages = Math.ceil(filteredUsers.length / ROWS_PER_PAGE)
  const startIndex = (currentPage - 1) * ROWS_PER_PAGE
  const paginatedUsers = filteredUsers.slice(startIndex, startIndex + ROWS_PER_PAGE)

  const switchView = (type: "USERS" | "ADMINS") => {
    setView(type)
    setCurrentPage(1)
  }

  const handleAddAdmin = async () => {
    const { value: formValues } = await Swal.fire({
      title: "Add Admin",
      html: `
      <input id="swal-name" class="swal2-input" placeholder="Name">
      <input id="swal-email" class="swal2-input" placeholder="Email">
      <input id="swal-password" type="password" class="swal2-input" placeholder="Password">
      <input id="swal-phone" class="swal2-input" placeholder="Phone">
      <select id="swal-gender" class="swal2-input">
        <option value="">Select Gender</option>
        <option value="Male">Male</option>
        <option value="Female">Female</option>
        <option value="Other">Other</option>
      </select>
      <input id="swal-avatar" type="file" class="swal2-file" accept="image/*">
    `,
      focusConfirm: false,
      preConfirm: () => {
        const name = (document.getElementById("swal-name") as HTMLInputElement).value
        const email = (document.getElementById("swal-email") as HTMLInputElement).value
        const password = (document.getElementById("swal-password") as HTMLInputElement).value
        const phone = (document.getElementById("swal-phone") as HTMLInputElement).value
        const gender = (document.getElementById("swal-gender") as HTMLSelectElement).value
        const avatar = (document.getElementById("swal-avatar") as HTMLInputElement).files?.[0]

        if (!name || !email || !password) {
          Swal.showValidationMessage("Name, Email, Password required")
          return
        }

        return { name, email, password, phone, gender, avatar }
      },
    })

    if (formValues) {
      try {
        const formData = new FormData()
        formData.append("name", formValues.name)
        formData.append("email", formValues.email)
        formData.append("password", formValues.password)
        formData.append("phone", formValues.phone)
        formData.append("gender", formValues.gender)
        if (formValues.avatar) {
          formData.append("avatar", formValues.avatar)
        }

        await addAdmin(formData)
        Swal.fire("Success", "Admin added successfully", "success")
        loadUsers()
      } catch (err: any) {
        Swal.fire("Error", err.response?.data?.message || "Failed to add admin", "error")
      }
    }
  }


  const handleEditAdmin = async (admin: User) => {
    const { value: formValues } = await Swal.fire({
      title: "Edit Admin",
      html: `
      <img src="${admin.avatarUrl || defaultAvatar}" 
           style="width:80px;height:80px;border-radius:50%;margin:auto;display:block" />

      <input id="swal-name" class="swal2-input" placeholder="Name" value="${admin.name || ""}">
      <input id="swal-email" class="swal2-input" placeholder="Email" value="${admin.email}" disabled>
      <input id="swal-phone" class="swal2-input" placeholder="Phone" value="${admin.phone || ""}">
      
      <select id="swal-gender" class="swal2-input">
        <option value="">Select Gender</option>
        <option value="Male" ${admin.gender === "Male" ? "selected" : ""}>Male</option>
        <option value="Female" ${admin.gender === "Female" ? "selected" : ""}>Female</option>
        <option value="Other" ${admin.gender === "Other" ? "selected" : ""}>Other</option>
      </select>

      <input id="swal-avatar" type="file" class="swal2-file" accept="image/*">
    `,
      focusConfirm: false,
      preConfirm: () => {
        const name = (document.getElementById("swal-name") as HTMLInputElement).value
        const phone = (document.getElementById("swal-phone") as HTMLInputElement).value
        const gender = (document.getElementById("swal-gender") as HTMLSelectElement).value
        const avatar = (document.getElementById("swal-avatar") as HTMLInputElement).files?.[0]

        if (!name) {
          Swal.showValidationMessage("Name is required")
          return
        }

        return { name, phone, gender, avatar }
      },
    })

    if (formValues) {
      try {
        const formData = new FormData()
        formData.append("name", formValues.name)
        formData.append("phone", formValues.phone)
        formData.append("gender", formValues.gender)

        if (formValues.avatar) {
          formData.append("avatar", formValues.avatar)
        }

        await updateAdmin(admin._id, formData)

        Swal.fire("Success", "Admin updated successfully", "success")
        loadUsers()
      } catch (err: any) {
        Swal.fire("Error", err.response?.data?.message || "Update failed", "error")
      }
    }
  }


  const handleDeleteAdmin = async (admin: User) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: `Delete admin ${admin.name}?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
    })

    if (result.isConfirmed) {
      try {
        await deleteAdmin(admin._id)
        Swal.fire("Deleted!", "Admin has been deleted.", "success")
        loadUsers()
      } catch (err: any) {
        Swal.fire("Error", err.response?.data?.message || "Failed to delete admin", "error")
      }
    }
  }

  if (loading) return <p>Loading...</p>

  return (
    <div className="bg-white rounded-xl shadow p-6">
      <div className="flex gap-3 mb-5">
        <button
          onClick={() => switchView("USERS")}
          className={`px-4 py-2 rounded ${view === "USERS" ? "bg-black text-white" : "border"}`}
        >
          Users
        </button>
        <button
          onClick={() => switchView("ADMINS")}
          className={`px-4 py-2 rounded ${view === "ADMINS" ? "bg-black text-white" : "border"}`}
        >
          Admins
        </button>
      </div>

      <h2 className="text-lg font-semibold mb-4">{view === "ADMINS" ? "Admins List" : "Users List"}</h2>
      {view === "ADMINS" && (
        <div className="mb-3 text-right">
          <button onClick={handleAddAdmin} className="px-4 py-2 bg-green-600 text-white rounded">
            + Add Admin
          </button>
        </div>
      )}

      <table className="w-full text-sm">
        <thead>
          <tr className="border-b text-left">
            <th className="py-2">Avatar</th>
            <th>Name</th>
            <th>Email</th>
            <th>Gender</th>
            <th>Phone</th>
            <th>Role</th>
            {view === "ADMINS" && <th>Actions</th>}
          </tr>
        </thead>
        <tbody>
          {paginatedUsers.map((user) => (
            <tr key={user._id} className="border-b hover:bg-gray-50">
              <td className="py-3">
                <img src={user.avatarUrl || defaultAvatar} className="w-10 h-10 rounded-full border" />
              </td>
              <td>{user.name || <span className="text-gray-400">N/A</span>}</td>
              <td>{user.email}</td>
              <td>{user.gender || <span className="text-gray-400">N/A</span>}</td>
              <td>{user.phone || <span className="text-gray-400">N/A</span>}</td>
              <td>{user.roles.join(", ")}</td>
              {view === "ADMINS" && (
                <td className="flex gap-2 py-2">
                  <button onClick={() => handleEditAdmin(user)} className="px-2 py-1 text-blue-600 border rounded">Edit</button>
                  <button onClick={() => handleDeleteAdmin(user)} className="px-2 py-1 text-red-600 border rounded">Delete</button>
                </td>
              )}
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
