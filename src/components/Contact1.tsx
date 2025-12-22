import { Footer } from "./Footer"
import { ContactForm } from "./ContactFrom"
import { Mail, MapPin, Phone, Clock } from "lucide-react"

export function ContactPage() {
  return (
    <section id="contact" className="relative h-screen sticky top-0 bg-gradient-to-b from-white to-gray-100 border-t rounded-t-[70px] z-50 flex flex-col justify-center">
      <section className="pt-32 pb-16 bg-secondary/30">
        <div className="container mx-auto px-4 md:px-6 pt-32 pb-16 bg-secondary/30">
          <div className="max-w-3xl">
            <div className="inline-block border-b border-primary/30 pb-1 mb-6">
              <span className="text-primary font-medium tracking-wider text-sm uppercase">Get in Touch</span>
            </div>
            <h1 className="font-serif text-5xl md:text-6xl font-medium text-primary mb-6">
              We'd Love to Hear From You
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl leading-relaxed">
              Have questions about our services or want to book a consultation? Reach out to the Lumière team and let's
              create your perfect salon experience.
            </p>
          </div>
        </div>
      </section>

      <section className="py-24 bg-background">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid md:grid-cols-2 gap-16">
            <div className="space-y-12">
              <div>
                <h2 className="font-serif text-3xl md:text-4xl text-primary mb-10">Contact Information</h2>
              </div>

              <div className="flex gap-6">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                    <MapPin className="w-6 h-6 text-primary" />
                  </div>
                </div>
                <div>
                  <h3 className="font-serif text-lg font-medium text-primary mb-2">Visit Us</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    123 Beauty Lane
                    <br />
                    Beverly Hills, CA 90210
                    <br />
                    United States
                  </p>
                </div>
              </div>

              <div className="flex gap-6">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                    <Phone className="w-6 h-6 text-primary" />
                  </div>
                </div>
                <div>
                  <h3 className="font-serif text-lg font-medium text-primary mb-2">Call Us</h3>
                  <p className="text-muted-foreground">
                    <a href="tel:+15551234567" className="hover:text-primary transition-colors">
                      (555) 123-4567
                    </a>
                    <br />
                    Available Mon-Sat, 10am-7pm PST
                  </p>
                </div>
              </div>

              <div className="flex gap-6">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                    <Mail className="w-6 h-6 text-primary" />
                  </div>
                </div>
                <div>
                  <h3 className="font-serif text-lg font-medium text-primary mb-2">Email</h3>
                  <p className="text-muted-foreground">
                    <a href="mailto:hello@lumieresalon.com" className="hover:text-primary transition-colors">
                      hello@lumieresalon.com
                    </a>
                  </p>
                </div>
              </div>

              <div className="flex gap-6">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                    <Clock className="w-6 h-6 text-primary" />
                  </div>
                </div>
                <div>
                  <h3 className="font-serif text-lg font-medium text-primary mb-2">Hours</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    Monday - Friday: 10am - 7pm
                    <br />
                    Saturday: 9am - 6pm
                    <br />
                    Sunday: Closed
                    <br />
                    <span className="text-primary/70">Holidays by appointment</span>
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-card border border-border rounded-xl p-8 shadow-lg h-fit sticky top-32">
              <h2 className="font-serif text-2xl text-primary mb-6">Send us a Message</h2>
              <ContactForm />
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 bg-secondary/30">
        <div className="container mx-auto px-4 md:px-6">
          <h2 className="font-serif text-4xl md:text-5xl text-primary text-center mb-12">Find Us</h2>
          <div className="w-full h-96 bg-secondary rounded-xl overflow-hidden shadow-lg border border-border/50">
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
      </section>

      <Footer />
    </section>
  )
}
