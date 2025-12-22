import { useState, useEffect } from "react"
import b1 from "../assets/b1.jpg"
import b2 from "../assets/b2.jpg"
import b3 from "../assets/b3.jpg"
import b4 from "../assets/b4.jpg"
import { fetchPublicStaff } from "../services/staff";
import type {PublicStaffType} from "../services/staff";

export function FeaturedSection() {

  const [staff, setStaff] = useState<PublicStaffType[]>([]);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const loadStaff = async () => {
      try {
        const data = await fetchPublicStaff();
        setStaff(data);
      } catch (err) {
        console.error("Failed to load staff", err);
      }
    };
    loadStaff();
  }, []);

  useEffect(() => {
    if (staff.length === 0) return;

    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % staff.length);
    }, 6000);

    return () => clearInterval(interval);
  }, [staff]);

  if (staff.length === 0) return null;

  return (
    <section id="about" className="h-screen sticky top-0 py-24 bg-secondary/30 relative z-30 bg-gradient-to-b from-white to-gray-100 border-t rounded-t-[70px]">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid md:grid-cols-2 gap-12 items-center">

           <div className="relative h-[500px] rounded-2xl overflow-hidden shadow-xl">

            <img
              src={staff[index].avatarUrl}
              alt={staff[index].name}
              className="w-full h-full object-cover rounded-2xl transition-opacity duration-700"
            />

            <div className="absolute top-5 left-5 bg-black/60 backdrop-blur-md px-4 py-3 rounded-xl shadow-lg text-white transition-opacity duration-700">
              <h3 className="text-xl font-bold animate-shine-word">
                {staff[index].name}
              </h3>
              <p className="text-sm opacity-80 animate-shine-word">
                Age: {staff[index].age}
              </p>
              <p className="text-sm opacity-80 animate-shine-word">
                {staff[index].role}
              </p>
            </div>

          </div>

          <div className="space-y-6">
            <h2 className="font-serif text-4xl md:text-5xl text-primary tracking-[0.2em]">
              WHERE ARTISTRY MEETS PASSION
            </h2>

            <p className="text-lg text-muted-foreground leading-relaxed tracking-[0.2em]">
              Founded on the belief that hair care is a form of self-expression, Lumière has been transforming looks
              and lives since 2024. Our team of master stylists stays ahead of global trends while honoring timeless
              techniques.
            </p>

            <p className="text-lg text-muted-foreground leading-relaxed tracking-[0.2em]">
              We use only eco-friendly, premium products that nourish your hair and the planet. Every visit is more
              than just a service—it's a ritual of renewal.
            </p>

            <button className="text-[#aa860f] border-b border-primary pb-1 hover:opacity-80 transition-opacity uppercase tracking-widest text-sm font-medium">
              Meet Our Team
            </button>
          </div>

        </div>
      </div>
    </section>
  )
}
