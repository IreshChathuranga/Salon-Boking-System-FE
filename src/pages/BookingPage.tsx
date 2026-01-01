import React, { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import type { RootState } from "../lib/store"
import { useNavigate } from "react-router-dom"
import type { BookingCardData } from "../lib/bookingType"
import { Navbar } from "../components/Navbar"
import { Footer } from "../components/Footer"
import { BookingHeader } from "../components/ui/BookingHeader"
import { BookingForm } from "../components/booking/BookingForm"
import Antigravity from "../components/ui/Antigravity"
import { fetchServices } from "../services/service";
import { fetchPublicStaff } from "../services/staff";
import type { ServiceType } from "../services/service";
import type { PublicStaffType } from "../services/staff";
import { BookingSummary } from "../components/booking/BookingSummary"
import { createBooking, deleteBooking } from "../services/booking"


export default function BookingPage() {

  const [currentStep, setCurrentStep] = useState(1);

  const [services, setServices] = useState<ServiceType[]>([]);
  const [stylists, setStylists] = useState<PublicStaffType[]>([]);

  const [selectedService, setSelectedService] = useState<string | null>(null);
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [selectedStylist, setSelectedStylist] = useState("");

  const timeSlots = ["9:00 AM", "10:00 AM", "11:00 AM"];

  useEffect(() => {
    fetchServices().then(setServices);
    fetchPublicStaff().then(setStylists);
  }, []);

  const canProceedToStep2 = !!selectedService;
  const canProceedToStep3 = !!selectedDate && !!selectedTime;
  const canSubmit = !!selectedStylist;

  const profile = useSelector((state: RootState) => state.user.profile)
  const navigate = useNavigate()

  useEffect(() => {
    if (profile === null) {
      const token = localStorage.getItem("accessToken");
      if (!token) {
        navigate("/login");
      }
    }
  }, [profile, navigate]);

  const [bookingCards, setBookingCards] = useState<BookingCardData[]>([])

  useEffect(() => {
    const saved = localStorage.getItem("bookingCards")
    if (saved) {
      setBookingCards(JSON.parse(saved))
    }
  }, [])


  useEffect(() => {
    localStorage.setItem("bookingCards", JSON.stringify(bookingCards))
  }, [bookingCards])

  const handleRemove = async (id: string) => {
    try {
      await deleteBooking(id)
    } catch (err) {
      console.error("Failed to delete booking", err)
    }

    setBookingCards(prev => prev.filter(b => b.id !== id))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!profile) return

    try {

      const service = services.find(s => s._id === selectedService)!
      const stylist = stylists.find(s => s._id === selectedStylist)!

      const payload: Omit<BookingCardData, "id" | "userName" | "userPhone" | "avatarUrl" | "status"> = {
        serviceName: service.name,
        servicePrice: service.price,
        serviceDuration: service.duration,
        bookingDate: selectedDate,
        bookingTime: selectedTime,
        stylistName: stylist.name,
        stylistRole: stylist.role,
      }

      const saved = await createBooking(payload)

      const card: BookingCardData = {
        id: saved._id,
        userName: profile.name,
        userPhone: profile.phone ?? "N/A",
        avatarUrl: profile.avatarUrl,
        ...payload,
        status: "PENDING",
      }

      setBookingCards(prev => [...prev, card])
    } catch (err: any) {
      if (err.response?.status === 409) {
        alert("This booking slot is already booked. Please choose another time.");
      } else {
        alert("Booking failed. Try again.");
      }
    }
  }

  return (
    <main className="relative min-h-screen  overflow-hidden bg-background">
      <div className="absolute inset-0 -z-10 pointer-events-none">
        <Antigravity
          count={300}
          magnetRadius={10}
          ringRadius={7}
          waveSpeed={0.4}
          waveAmplitude={1}
          particleSize={1.2}
          lerpSpeed={0.05}
          color="#FF9FFC"
          autoAnimate={true}
          particleVariance={1}
        />
      </div>

      <Navbar />
      <BookingHeader currentStep={currentStep} />

      <BookingForm
        currentStep={currentStep}
        setCurrentStep={setCurrentStep}
        handleSubmit={handleSubmit}
        services={services}
        timeSlots={timeSlots}
        stylists={stylists}
        selectedService={selectedService}
        setSelectedService={setSelectedService}
        selectedDate={selectedDate}
        setSelectedDate={setSelectedDate}
        selectedTime={selectedTime}
        setSelectedTime={setSelectedTime}
        selectedStylist={selectedStylist}
        setSelectedStylist={setSelectedStylist}
        canProceedToStep2={canProceedToStep2}
        canProceedToStep3={canProceedToStep3}
        canSubmit={canSubmit}
      />

      <BookingSummary
        bookings={bookingCards}
        onRemove={handleRemove}
        onPay={() => {
          console.log("PAY NOW", bookingCards)
        }}
      />

      <Footer />
    </main>
  )
}
