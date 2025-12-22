export type BookingCardData = {
  id: string 
  userName: string
  userPhone: string
  avatarUrl?: string

  serviceName: string
  servicePrice: number
  serviceDuration: number

  bookingDate: string
  bookingTime: string

  stylistName: string
  stylistRole: string
  
  status: "PENDING" | "PAID"
}