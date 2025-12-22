import React from "react"
import { Check } from "lucide-react"


type BookingHeaderProps = {
  currentStep: number
}

export const BookingHeader: React.FC<BookingHeaderProps> = ({ currentStep }) => {
  const steps = [
    { id: 1, label: "Service" },
    { id: 2, label: "Date & Time" },
    { id: 3, label: "Details" },
  ]
  return (
    <>
      <section className="pt-32 pb-12 bg-gradient-to-b from-secondary/30 to-background text-center">
        <h1 className="font-serif text-4xl md:text-6xl text-primary mb-4 tracking-[0.2em]">
          Book Your Appointment
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto tracking-[0.2em]">
          Experience the art of transformation. Select your service and preferred time below.
        </p>
      </section>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-3xl mx-auto">
          <div className="relative flex items-center justify-between">

            <div className="absolute left-0 right-0 top-5 border h-0.5 bg-secondary" />
            <div
              className="absolute left-0 top-5 h-0.5 bg-primary transition-all"
              style={{
                width: `${((currentStep - 1) / (steps.length - 1)) * 100}%`,
              }}
            />

            {steps.map((step) => {
              const isCompleted = currentStep > step.id
              const isActive = currentStep === step.id

              return (
                <div key={step.id} className="relative z-10 flex flex-col items-center">

                  <div
                    className={`w-10 h-10 rounded-full flex items-center bg-white border justify-center transition-all ${isCompleted
                        ? "bg-white text-black"
                        : isActive
                          ? "bg-background text-primary ring-4 ring-primary/20"
                          : "bg-background text-muted-foreground"
                      }`}
                    style={
                      isCompleted
                        ? {
                          borderWidth: "2px",
                          borderStyle: "solid",
                          borderImage:
                            "linear-gradient(135deg, #d4af37, #f7d774, #d4af37) 1",
                        }
                        : undefined
                    }
                  >
                    {isCompleted ? <Check className="w-5 h-5" /> : step.id}
                  </div>

                  <span
                    className={`mt-2 text-xs tracking-widest ${isActive || isCompleted
                        ? "text-primary"
                        : "text-muted-foreground"
                      }`}
                  >
                    {step.label}
                  </span>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </>
  )
}
