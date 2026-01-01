import { useSelector } from "react-redux"
import type { RootState} from "../lib/store"
import { Navbar } from "../components/Navbar"
import { Footer } from "../components/Footer"
import { ProfileHeader } from "../components/profile/ProfileHeader"
import { ProfileForm } from "../components/profile/ProfileForm"
import BookingHistory from "../components/booking/BookingHistory"
import Settings from "../components/Settings"
import { useFetchProfile } from "../lib/hooks/useFetchProfile";

export default function UserProfilePage() {
    useFetchProfile(); 
    const selectedSection = useSelector((state: RootState) => state.user.selectedSection)

    return (
        <main className="min-h-screen bg-background">
            <Navbar />
                <div className="container mx-auto md:px-6">
                    <ProfileHeader />
                    {selectedSection === "contact" && <ProfileForm />}
                    {selectedSection === "history" && <BookingHistory />}
                    {selectedSection === "settings" && <Settings />}
                </div>
            <Footer />
        </main>
    )
}