import React from "react"
import { Check } from "lucide-react"

type StepServiceProps = {
  services: any[]
  selectedService: string | null
  setSelectedService: (id: string) => void
  onNext: () => void
  canProceed: boolean
}

export const StepService = ({
  services,
  selectedService,
  setSelectedService,
  onNext,
  canProceed,
}: StepServiceProps) => {
  return (
    <div className="border border-gray-300 rounded-lg p-6">
      <h2
        className="
          font-serif
          uppercase
          text-3xl
          text-primary
          mb-6
          tracking-[0.2em]
        "
      >
        Choose Your Service
      </h2>

      <div className="grid md:grid-cols-2 gap-4">
        {services.map((service) => {
          const Icon = service.icon
          return (
            <div
              key={service.id}
              onClick={() => setSelectedService(service.id)}
              className={`cursor-pointer p-4 border rounded flex gap-4 items-center transition
                ${
                  selectedService === service.id
                    ? "border-primary bg-primary/5"
                    : "border-gray-300 hover:border-primary/50"
                }
              `}
            >
              <Icon className="w-6 h-6 text-primary" />

              <div className="flex-1">
                <h3 className="font-semibold">{service.name}</h3>
                <p className="text-sm text-muted-foreground">
                  {service.duration} • {service.price}
                </p>
              </div>

              {selectedService === service.id && (
                <Check className="w-5 h-5 text-primary" />
              )}
            </div>
          )
        })}
      </div>

      <button
        type="button"
        disabled={!canProceed}
        onClick={onNext}
        className="
          mt-6
          w-full
          bg-primary
          text-white
          py-2
          rounded
          disabled:opacity-50
          tracking-[0.2em]
          uppercase
        "
      >
        Continue
      </button>
    </div>
  )
}
