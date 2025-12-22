import { Footer } from "../components/Footer"
export function Map() {
    return (
        <section id="map" className="relative h-screen sticky top-0 bg-gradient-to-b from-white to-gray-100 border-t rounded-t-[70px] z-50 flex flex-col justify-center">
            <div className="container mx-auto px-4 md:px-6">
                <div className="relative flex flex-col top-20 items-center text-center mx-auto">
                    <h2 className="font-serif text-4xl md:text-5xl text-primary text-center mb-2 tracking-[0.2em]">Find Us</h2>
                    <div className="w-full h-60 bg-secondary rounded-xl overflow-hidden shadow-lg border mb-13 border-border/50">
                        <iframe
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3304.7489220129646!2d-118.40129!3d34.073844!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x80c2b9b9b9b9b9b9%3A0x0!2sBeverly%20Hills%2C%20CA!5e0!3m2!1sen!2sus!4v1234567890"
                            width="100%"
                            height="100%"
                            style={{ border: "none" }}
                            allowFullScreen
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                        />
                    </div>
                </div>
                               
                <Footer/>
            </div>
        </section>
    )
}