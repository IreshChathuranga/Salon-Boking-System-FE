import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"

const contactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  phone: z.string().optional(),
  subject: z.string().min(3, "Subject must be at least 3 characters"),
  message: z.string().min(10, "Message must be at least 10 characters"),
})

type ContactFormData = z.infer<typeof contactSchema>

export function ContactForm() {
  const [submitted, setSubmitted] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  })

  const onSubmit = (data: ContactFormData) => {
    console.log("Form submitted:", data)
    setSubmitted(true)
    reset()
    setTimeout(() => setSubmitted(false), 3000)
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

        <div className="space-y-4">

          <div className="grid gap-2">
            <label htmlFor="name" className="text-foreground font-medium">Full Name</label>
            <input
              id="name"
              placeholder="Jane Doe"
              {...register("name")}
              className="border-primary/20 bg-background focus:border-primary"
            />
            {errors.name && <p className="text-destructive text-sm">{errors.name.message}</p>}
          </div>

          <div className="grid gap-2">
            <label htmlFor="email" className="text-foreground font-medium">Email Address</label>
            <input
              id="email"
              type="email"
              placeholder="jane@example.com"
              {...register("email")}
              className="border-primary/20 bg-background focus:border-primary"
            />
            {errors.email && <p className="text-destructive text-sm">{errors.email.message}</p>}
          </div>

        </div>

        <div className="space-y-4">

          <div className="grid gap-2">
            <label htmlFor="phone" className="text-foreground font-medium">Phone (Optional)</label>
            <input
              id="phone"
              type="tel"
              placeholder="+1 (555) 123-4567"
              {...register("phone")}
              className="border-primary/20 bg-background focus:border-primary"
            />
          </div>

          <div className="grid gap-2">
            <label htmlFor="subject" className="text-foreground font-medium">Subject</label>
            <input
              id="subject"
              placeholder="How can we help?"
              {...register("subject")}
              className="border-primary/20 bg-background focus:border-primary"
            />
            {errors.subject && <p className="text-destructive text-sm">{errors.subject.message}</p>}
          </div>

        </div>

      </div>


      <div className="grid gap-2">
        <label htmlFor="message" className="text-foreground font-medium">Message</label>
        <textarea
          id="message"
          placeholder="Tell us about your inquiry..."
          rows={5}
          {...register("message")}
          className="w-full px-3 py-2 border border-primary/20 rounded-md bg-background focus:border-primary focus:ring-2 focus:ring-primary/20 resize-none"
        />
        {errors.message && <p className="text-destructive text-sm">{errors.message.message}</p>}
      </div>

      <button
        type="submit"
        className="w-full mt-6 bg-primary btn-gold text-primary-foreground hover:bg-primary/90 py-2 h-auto rounded-full font-medium text-base"
      >
        {submitted ? "Message Sent!" : "Send Message"}
      </button>

    </form>
  )
}
