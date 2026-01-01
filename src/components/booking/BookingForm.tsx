import React from "react"
import { useEffect, useState } from "react";
import { Check } from "lucide-react"
import type { ServiceType } from "../../services/service";
import type { PublicStaffType } from "../../services/staff";
import { Scissors, Sparkles, Droplets, Wand2 } from "lucide-react"

const serviceIconMap: Record<string, any> = {
  haircut: Scissors,
  hair: Scissors,

  color: Sparkles,
  colouring: Sparkles,

  treatment: Droplets,

  shaving: Wand2,
  style: Wand2,
};


export type BookingFormProps = {
  currentStep: number
  setCurrentStep: React.Dispatch<React.SetStateAction<number>>
  handleSubmit: (e: React.FormEvent) => void

  services: ServiceType[]
  timeSlots: string[]
  stylists: PublicStaffType[]

  selectedService: string | null
  setSelectedService: (id: string) => void

  selectedDate: string
  setSelectedDate: (v: string) => void

  selectedTime: string
  setSelectedTime: (v: string) => void

  selectedStylist: string
  setSelectedStylist: (v: string) => void

  canProceedToStep2: boolean
  canProceedToStep3: boolean
  canSubmit: boolean
}

export const BookingForm: React.FC<BookingFormProps> = ({
  currentStep,
  setCurrentStep,
  handleSubmit,
  services,
  timeSlots,
  stylists,
  selectedService,
  setSelectedService,
  selectedDate,
  setSelectedDate,
  selectedTime,
  setSelectedTime,
  selectedStylist,
  setSelectedStylist,
  canProceedToStep2,
  canProceedToStep3,
  canSubmit,
}) => {
  return (
    <div className="container mx-auto px-4 py-10">
      <div className="max-w-3xl mx-auto bg-black/10 backdrop-blur-sm rounded-3xl">

        <form onSubmit={handleSubmit} className="space-y-10">

          {currentStep === 1 && (
            <div className="border border-[#d4af37] rounded-3xl p-6">
              <h2 className="rounded-2xl text-white bg-black/50 text-2xl w-max font-serif text-primary px-2 border mb-6">
                Choose Your Service
              </h2>

              <div className="grid md:grid-cols-2 gap-4">
                {services.map((service) => {
                  const key = service.name.toLowerCase();
                  const Icon =
                    Object.keys(serviceIconMap).find(k => key.includes(k))
                      ? serviceIconMap[Object.keys(serviceIconMap).find(k => key.includes(k))!]
                      : serviceIconMap.haircut;
                  return (
                    <div
                      key={service._id}
                      onClick={() => setSelectedService(service._id)}
                      className={`cursor-pointer border rounded p-4 flex gap-4 items-center ${selectedService === service._id
                          ? "border-primary bg-primary/5"
                          : "border-gray-300"
                        }`}
                    >
                      <Icon className="w-6 h-6 text-primary" />
                      <div className="flex-1">
                        <h3 className="font-semibold">{service.name}</h3>
                        <p className="text-sm text-muted-foreground">
                          {service.duration} min • Rs.{service.price}
                        </p>
                      </div>
                      {selectedService === service._id && <Check />}
                    </div>
                  )
                })}
              </div>

              <button
                type="button"
                disabled={!canProceedToStep2}
                onClick={() => setCurrentStep(2)}
                className="mt-6 w-full btn-gold text-white py-2 rounded disabled:opacity-50 rounded-2xl"
              >
                Continue
              </button>
            </div>
          )}

          {currentStep === 2 && (
            <div className="border border-[#d4af37] rounded-3xl p-6">
              <h2 className="rounded-2xl text-white bg-black/50 text-2xl w-max font-serif text-primary px-2 border mb-6">
                Select Date & Time
              </h2>

              <input
                type="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                className="w-full border p-2 rounded mb-4"
              />

              <select
                value={selectedTime}
                onChange={(e) => setSelectedTime(e.target.value)}
                className="w-full border p-2 rounded"
              >
                <option value="">Select Time</option>
                {timeSlots.map((t) => (
                  <option key={t} value={t}>{t}</option>
                ))}
              </select>

              <div className="flex justify-between mt-6">
                <button type="button" onClick={() => setCurrentStep(1)}>
                  Back
                </button>

                <button
                  type="button"
                  disabled={!canProceedToStep3}
                  onClick={() => setCurrentStep(3)}
                  className="btn-gold w-[100px] text-white px-6 py-2 rounded disabled:opacity-50 rounded-2xl"
                >
                  Continue
                </button>
              </div>
            </div>
          )}

          {currentStep === 3 && (
            <div className="border border-[#d4af37] rounded-3xl p-6">
              <h2 className="rounded-2xl text-white bg-black/50 text-2xl w-max font-serif text-primary px-2 border mb-6">
                Select Stylist
              </h2>

              <select
                value={selectedStylist}
                onChange={(e) => setSelectedStylist(e.target.value)}
                className="w-full border p-2 rounded"
              >
                <option value="">Select Stylist</option>
                {stylists.map((s) => (
                  <option key={s._id} value={s._id}>
                    {s.name} ({s.role})
                  </option>
                ))}
              </select>

              <div className="flex justify-between mt-6">
                <button type="button" onClick={() => setCurrentStep(2)}>
                  Back
                </button>

                <button
                  type="submit"
                  disabled={!canSubmit}
                  className="btn-gold w-[200px] text-white px-6 py-2 rounded disabled:opacity-50 rounded-2xl"
                >
                  Confirm Booking
                </button>
              </div>
            </div>
          )}

        </form>
      </div>
    </div>
  )
}
