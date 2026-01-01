import { ContactForm } from "./ContactFrom"
import bg from "../../assets/contactbg.jpg"

export function Contact() {
    return (
        <section
            id="contact"
            className="relative h-screen sticky top-0 border-t rounded-t-[70px] z-40 flex flex-col justify-center bg-cover bg-center bg-no-repeat"
            style={{ backgroundImage: `url(${bg})` }}
        >             <div className="container mx-auto px-4 md:px-6">

                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">

                    <div className="bg-card border-2 border-[#aa860f] rounded-xl p-8 shadow-lg h-fit">
                        <h2 className="font-serif text-2xl text-primary mb-6">Send us a Message</h2>
                        <ContactForm />
                    </div>

                    <div className="relative flex flex-col top-20 items-center text-center max-w-2xl mx-auto">
                        <div className="inline-block border-b border-primary/30 pb-1 mb-6">
                            <span className="text-primary font-medium tracking-wider text-sm uppercase">
                                Get in Touch
                            </span>
                        </div>

                        <h2 className="font-serif text-4xl md:text-5xl text-primary mb-4 tracking-[0.2em]">
                            We'd Love to Hear From You
                        </h2>

                        <div className="h-1 w-20 bg-primary/20 mb-6" />

                        <p className="text-muted-foreground text-lg tracking-[0.2em]">
                            Have questions about our services or want to book a consultation?
                            Reach out to the Lumière team and let's create your perfect salon experience.
                        </p>
                    </div>


                </div>

            </div>
        </section>
    )
}