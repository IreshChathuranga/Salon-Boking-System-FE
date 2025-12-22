
import { useSelector, useDispatch } from "react-redux"
import type { RootState } from "../lib/store"
import { toggleEditMode, logout, setSection } from "../lib/features/user-slice"
import { LogOut, Edit2, User } from "lucide-react"
import { Link , useNavigate} from "react-router-dom"
import mainprofile from "../assets/usermainpic.jpg"

export function ProfileHeader() {
  const profile = useSelector((state: RootState) => state.user.profile)
  const isEditing = useSelector((state: RootState) => state.user.isEditing)
  const currentSection = useSelector((state: RootState) => state.user.selectedSection);
  const isEditingAllowed = currentSection === "contact";
  const dispatch = useDispatch()
  const navigate = useNavigate();

  if (!profile) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground">Please log in to view your profile.</p>
        <Link to="/login">
          <button className="mt-4 bg-primary hover:bg-primary/90">Sign In</button>
        </Link>
      </div>
    )
  }

  const handleLogout = () => {
    dispatch(logout())
    navigate("/login") 
  }

  return (
    <div className="relative h-[350px] mb-8 overflow-hidden w-full">

      <div
        className="absolute inset-0 bg-cover bg-center filter blur-[5px]"
        style={{ backgroundImage: `url(${mainprofile})` }}
      ></div>

      <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-transparent"></div>

      <div className="relative flex h-full p-8 gap-8">

        <div className="flex flex-col justify-end gap-2 w-70 p-4 rounded-lg items-start">
          <button onClick={() => dispatch(setSection("contact"))} className="flex text-[#d4af37] w-50 border border-[#d4af37] bg-black/70 rounded-3xl justify-center top-30 gap-2 p-2
    transition-all duration-300 hover:bg-black/90 hover:text-[#f7d774] hover:border-[#f7d774]">
            Contact Information
          </button>

          <button onClick={() => dispatch(setSection("history"))} className="flex text-[#d4af37] w-50 border border-[#d4af37] bg-black/70 rounded-3xl justify-center top-30 gap-2 p-2
    transition-all duration-300 hover:bg-black/90 hover:text-[#f7d774] hover:border-[#f7d774]">
            Booking History
          </button>

          <button onClick={() => dispatch(setSection("settings"))} className="flex text-[#d4af37] w-50 border border-[#d4af37] bg-black/70 rounded-3xl justify-center top-30 gap-2 p-2
    transition-all duration-300 hover:bg-black/90 hover:text-[#f7d774] hover:border-[#f7d774]">
            Settings
          </button>
        </div>

        <div className="flex-1 flex justify-end items-center gap-4">

          <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-primary shadow-lg">
            <img
              src={profile.avatarUrl || mainprofile}
              alt="Profile"
              className="w-full h-full object-cover"
            />
          </div>

          <div className="flex flex-col justify-center items-end text-right">
            <h1 className="font-sans !text-[30px] font-bold text-primary mb-1 text-white">
              {profile.name}
            </h1>
            <p className="text-muted-foreground flex items-center gap-2 justify-end">
              <User size={16} />
              Member since {new Date(profile.joinDate).toLocaleDateString()}
            </p>
          </div>

          <div className="absolute top-70 right-8 flex flex-row gap-2">
            <button
              onClick={() => isEditingAllowed && dispatch(toggleEditMode())}
              className={`flex items-center gap-1 px-3 py-1 rounded-3xl ${isEditing ? "bg-red-500 text-white" : "bg-black text-white"}`}
            >
              <Edit2 size={16} />
              {isEditing ? "Cancel" : "Edit"}
            </button>

            <button
              onClick={handleLogout}
              className="flex items-center gap-1 px-3 py-1 rounded-3xl bg-black text-white"
            >
              <LogOut size={16} />
              Logout
            </button>
          </div>

        </div>
      </div>
    </div>
  )
}
