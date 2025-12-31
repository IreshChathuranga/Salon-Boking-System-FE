import { useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import type { RootState } from "../../lib/store"
import Swal from "sweetalert2"
import { updateUserProfile as updateUserProfileApi, updateCredentials } from "../../services/auth"
import { updateUserProfile as updateUserProfileRedux } from "../../lib/features/user-slice"

export default function AdminSettingsPage() {
    const admin = useSelector((state: RootState) => state.user.profile)

    const [name, setName] = useState(admin?.name || "")
    const [email, setEmail] = useState(admin?.email || "")
    const [oldPassword, setOldPassword] = useState("")
    const [newPassword, setNewPassword] = useState("")
    const [avatar, setAvatar] = useState<File | null>(null)
    const [loading, setLoading] = useState(false)

    const dispatch = useDispatch()

    const handleSave = async () => {
        try {
            setLoading(true)

            const response = await updateUserProfileApi(
                {
                    name,
                    email,
                    phone: admin?.phone,
                },
                avatar
            )

            dispatch(updateUserProfileRedux(response.data))

            if (oldPassword && newPassword) {
                await updateCredentials(oldPassword, newPassword, email)
            }

            Swal.fire("Success", "Admin settings updated", "success")
        } catch (err: any) {
            Swal.fire("Error", err.message || "Update failed", "error")
        } finally {
            setLoading(false)
        }
    }


    return (
        <div className="max-w-3xl bg-white rounded-xl shadow p-6">
            <h2 className="text-lg font-semibold mb-6">Admin Settings</h2>

            <div className="space-y-4">

                <div>
                    <label className="block text-sm font-medium">Profile Image</label>
                    <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => setAvatar(e.target.files?.[0] || null)}
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium">Name</label>
                    <input
                        className="w-full border px-3 py-2 rounded"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium">Email</label>
                    <input
                        className="w-full border px-3 py-2 rounded"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium">Old Password</label>
                    <input
                        type="password"
                        className="w-full border px-3 py-2 rounded"
                        value={oldPassword}
                        onChange={(e) => setOldPassword(e.target.value)}
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium">New Password</label>
                    <input
                        type="password"
                        className="w-full border px-3 py-2 rounded"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                    />
                </div>

                <button
                    disabled={loading}
                    onClick={handleSave}
                    className="w-full bg-black text-white py-2 rounded hover:bg-gray-800"
                >
                    Save Changes
                </button>
            </div>
        </div>
    )
}
