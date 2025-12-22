import { createSlice, type PayloadAction } from "@reduxjs/toolkit"

interface UserProfile {
  name: string
  email: string
  phone?: string
  avatarColor: string
  joinDate: string
  gender?: "Male" | "Female" | "Other"
  loyaltyPoints: number
  preferredServices?: string[]
  lastVisit?: string
  avatarUrl?: string
}

interface UserState {
  profile: UserProfile | null
  isEditing: boolean
  selectedSection: "contact" | "history" | "settings"
}

const initialState: UserState = {
  profile: null,
  isEditing: false,
  selectedSection: "contact",
}

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setProfile: (state, action: PayloadAction<UserProfile>) => {
      state.profile = action.payload
    },

    toggleEditMode: (state) => {
      state.isEditing = !state.isEditing
    },

    updateUserProfile: (state, action: PayloadAction<Partial<UserProfile>>) => {
      if (state.profile) {
        state.profile = { ...state.profile, ...action.payload };

        if (action.payload.avatarUrl) {
          state.profile.avatarUrl = action.payload.avatarUrl;
        }
      }
    },

    logout: (state) => {
      state.profile = null
      state.isEditing = false
    },

    updateAvatar: (state, action) => {
      if (state.profile) {
        state.profile.avatarUrl = action.payload;
      }
    },
    setSection: (state, action: PayloadAction<"contact" | "history" | "settings">) => {
      state.selectedSection = action.payload
      if (action.payload !== "contact") {
        state.isEditing = false;
      }
    },
  },
})

export const { setProfile, toggleEditMode, updateUserProfile, logout, setSection, updateAvatar } = userSlice.actions
export default userSlice.reducer
