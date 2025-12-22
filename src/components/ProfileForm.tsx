import { useSelector, useDispatch } from "react-redux"
import type { TypedUseSelectorHook } from "react-redux"
import type { RootState } from "../lib/store"
import { toggleEditMode, updateUserProfile as updateUserProfileRedux } from "../lib/features/user-slice"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { useState, useEffect } from "react"
import { updateUserProfile } from "../services/auth"
import { useNavigate } from "react-router-dom"

const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector
const profileSchema = z.object({
    name: z.string().min(2, "Name must be at least 2 characters"),
    email: z.string().email("Invalid email address"),
    phone: z.string().min(10, "Phone must be at least 10 characters"),
    gender: z.enum(["Male", "Female", "Other"]).optional(),
    avatarUrl: z.string().optional(),
})

type ProfileFormData = z.infer<typeof profileSchema>

export function ProfileForm() {
    const navigate = useNavigate()
    const profile = useTypedSelector((state) => state.user.profile)
    const isEditing = useTypedSelector((state) => state.user.isEditing)
    const dispatch = useDispatch()
    const [submitted, setSubmitted] = useState(false)
    const [avatarFile, setAvatarFile] = useState<File | null>(null)
    // const [setLoading] = useState(false)
    const { register, handleSubmit, formState: { errors }, reset } = useForm<ProfileFormData>({
        resolver: zodResolver(profileSchema),
        defaultValues: {
            name: profile?.name ?? "",
            email: profile?.email ?? "",
            phone: profile?.phone ?? "",
            gender: profile?.gender ?? undefined, 
            avatarUrl: profile?.avatarUrl ?? "",
        } as ProfileFormData,
    })

    useEffect(() => {
        if (profile) {
            reset({
                name: profile.name,
                email: profile.email,
                phone: profile.phone,
                gender: profile.gender ?? undefined,
                avatarUrl: profile.avatarUrl,
            });
        }
    }, [profile, isEditing, reset]);

    const onSubmit = async (data: ProfileFormData) => {
        if (!profile) return;

        try {
            const response = await updateUserProfile(data, avatarFile);

            const updatedProfile =
                response.data.profile ||
                response.data.updatedProfile ||
                response.data.data ||
                response.data;

            dispatch(updateUserProfileRedux(updatedProfile));

            reset({
                name: updatedProfile.name,
                email: updatedProfile.email,
                phone: updatedProfile.phone,
                gender: updatedProfile.gender ?? undefined,
                avatarUrl: updatedProfile.avatarUrl,
            });

            setSubmitted(true);
            setTimeout(() => setSubmitted(false), 2000);

            dispatch(toggleEditMode());
        } catch (err) {
            console.error("Failed to update profile:", err);
        }
    };


    const handleBookNow = () => {
        if (!profile) {
            alert("Please login first")
            navigate("/login")
            return
        }

        const { name, email, phone } = profile

        if (!name || !email || !phone) {
            alert("Please fill your contact information first")
            return
        }

        navigate("/booking")
    }



    if (!profile) return null

    return (
        <div className="space-y-8">
            <div className="bg-card rounded-3xl p-6 border-2 border-[#d4af37]">
                <h2 className="font-serif rounded-2xl text-white bg-black/50 text-2xl w-max text-primary px-2 border mb-6">Contact Information</h2>

                {isEditing ? (
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                        <div className="grid gap-2">
                            <label htmlFor="name" className="text-foreground">
                                Full Name
                            </label>
                            <input id="name" {...register("name")} className="border-primary/20" placeholder="Your full name" />
                            {errors.name && <p className="text-destructive text-sm">{errors.name.message}</p>}
                        </div>

                        <div className="grid gap-2">
                            <label htmlFor="email" className="text-foreground">
                                Email Address
                            </label>
                            <input
                                id="email"
                                type="email"
                                {...register("email")}
                                className="border-primary/20"
                                placeholder="your@email.com"
                            />
                            {errors.email && <p className="text-destructive text-sm">{errors.email.message}</p>}
                        </div>

                        <div className="grid gap-2">
                            <label htmlFor="phone" className="text-foreground">
                                Phone Number
                            </label>
                            <input id="phone" {...register("phone")} className="border-primary/20" placeholder="+1 (555) 000-0000" />
                            {errors.phone && <p className="text-destructive text-sm">{errors.phone.message}</p>}
                        </div>

                        <div className="grid gap-2">
                            <label htmlFor="gender" className="text-foreground">Gender</label>
                            <select
                                id="gender"
                                {...register("gender")}
                                className="border-primary/20 p-2 rounded-md"
                            >
                                <option value="">Select Gender</option>
                                <option value="Male">Male</option>
                                <option value="Female">Female</option>
                                <option value="Other">Other</option>
                            </select>

                            <div className="grid gap-2">
                                <label className="text-foreground">Profile Picture</label>

                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={(e) => setAvatarFile(e.target.files?.[0] || null)}
                                    className="border-primary/20"
                                />

                                {avatarFile && (
                                    <p className="text-green-500 text-sm">Image selected: {avatarFile.name}</p>
                                )}

                                {profile.avatarUrl && !avatarFile && (
                                    <img
                                        src={profile.avatarUrl}
                                        className="w-20 h-20 rounded-full border mt-2"
                                        alt="profile"
                                    />
                                )}
                            </div>

                        </div>


                        <button type="submit" className="w-full mt-6 bg-primary text-primary-foreground hover:bg-primary/90">
                            {submitted ? "Changes Saved!" : "Save Changes"}
                        </button>
                    </form>
                ) : (
                    <div className="space-y-4">
                        <div className="pb-4 border-b border-border">
                            <p className="text-sm text-muted-foreground mb-1">Full Name</p>
                            <p className="text-lg font-medium text-foreground">{profile.name}</p>
                        </div>
                        <div className="pb-4 border-b border-border">
                            <p className="text-sm text-muted-foreground mb-1">Email Address</p>
                            <p className="text-lg font-medium text-foreground">{profile.email}</p>
                        </div>
                        <div className="pb-4 border-b border-border">
                            <p className="text-sm text-muted-foreground mb-1">Phone Number</p>
                            <p className="text-lg font-medium text-foreground">{profile.phone}</p>
                        </div>
                        {profile.gender && (
                            <div className="pb-4 border-b border-border">
                                <p className="text-sm text-muted-foreground mb-1">Gender</p>
                                <p className="text-lg font-medium text-foreground">{profile.gender}</p>
                            </div>
                        )}
                    </div>
                )}
            </div>
            <div className="flex flex-col items-end gap-2">
                <p className="text-sm text-gray-500">
                    Obtain our service? Book your appointment now!
                </p>

                <button
                    type="button"
                    className="gold-btn w-60 h-12 bg-primary hover:bg-primary/90 font-semibold text-xl hover:scale-105 transition-all rounded-xl"
                    onClick={handleBookNow}
                >
                    BOOK NOW
                </button>
            </div>
        </div>
    )
}
