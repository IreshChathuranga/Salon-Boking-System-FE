import { Footer } from "../components/Footer"
import { Hero } from "../components/Hero"
import { Navbar } from "../components/Navbar"
import { ServicesSection } from "../components/Service"
import { FeaturedSection } from "../components/FeaturedSection"
import {Contact} from "../components/Contact"
import {Map} from "../components/Map"
export default function HomePage() {
    return (
        <main className="min-h-screen bg-background">
            <Navbar />
            <Hero />
            <ServicesSection />
            <FeaturedSection />
            <Contact/>
            <Map/>
        </main>
    )
}