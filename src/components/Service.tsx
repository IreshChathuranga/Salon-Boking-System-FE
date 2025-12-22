// import { useRef } from "react";
// import { motion, useScroll, useTransform } from "framer-motion";
import p1 from "../assets/pic1.jpg"
import p2 from "../assets/pic6.jpg"
import p3 from "../assets/pic4.jpg"
import p4 from "../assets/pic5.jpg"
import { useEffect, useState } from "react";
import { fetchServices} from "../services/service";
import type { ServiceType } from "../services/service";


const serviceImageMap: Record<string, string> = {
  "Cut & Style": p3,
  "Color Artistry": p2,
  "Shaving & Style": p1,
  "Treatments": p4,
};

export function ServicesSection() {
  const [services, setServices] = useState<ServiceType[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadServices = async () => {
      try {
        const data = await fetchServices();
        setServices(data);
      } catch (err) {
        console.error("Failed to load services", err);
      } finally {
        setLoading(false);
      }
    };
    loadServices();
  }, []);

  if (loading) {
    return <div className="text-center py-20">Loading services...</div>;
  }

  return (
    <section id="services" className="relative h-screen sticky top-0 bg-gradient-to-b from-white to-gray-100 border-t rounded-t-[70px] z-20 flex flex-col justify-center">
      <div className="absolute inset-0 -z-10">
        <div className="w-full h-full bg-primary/5"></div>
      </div>

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="font-serif text-4xl md:text-5xl text-primary mb-4 tracking-[0.2em]">OUR  SERVICES</h2>
          <div className="h-1 w-20 bg-primary/20 mx-auto mb-6" />
          <p className="text-muted-foreground text-lg tracking-[0.2em]">
            We offer a comprehensive range of hair and beauty treatments designed to enhance your natural beauty.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4">
           {services.map((service, index) => {
            const image =
              serviceImageMap[service.name] ?? p3; 

            return (
              <div
                key={service._id}
                className={`group relative ${
                  index === 0 ? "rounded-l-2xl overflow-hidden" : ""
                } ${
                  index === services.length - 1
                    ? "rounded-r-2xl overflow-hidden"
                    : ""
                }`}
              >
                <div className="relative w-full h-100 bg-black overflow-hidden group">
                  <img
                    src={image}
                    alt={service.name}
                    className="w-full h-full object-cover transition duration-500 group-hover:opacity-50 group-hover:translate-x-1/3"
                  />

                  <div className="absolute top-70 left-5 px-3 py-2 rounded-md shadow text-left">
                    <h1 className="animate-shine-word text-white uppercase leading-tight font-bold text-[30px] leading-5">
                      {service.name.split(" ").slice(0, 2).join(" ")}
                      <br/>
                      {service.name.split(" ").slice(2).join(" ")}
                    </h1>
                  </div>

                  <div
                    className="absolute inset-0 w-[70%] h-full opacity-0
                    group-hover:opacity-100 transition-all duration-500
                    backdrop-blur-md border-r border-[#d4af37]
                    flex flex-col items-center justify-center p-5 text-center"
                  >
                    <p className="text-white text-sm mb-3">
                      {service.description}
                    </p>
                    <h1 className="text-white text-xl font-bold">
                      LKR {service.price}
                    </h1>

                    <button className="mt-4 px-4 w-[100px] py-2 btn-gold text-white rounded-md text-md font-bold">
                      BOOK
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  )
}