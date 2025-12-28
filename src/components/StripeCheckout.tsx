import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js"
import { useState } from "react"

type Props = {
  clientSecret: string
  onSuccess: () => void
}

export function StripeCheckout({ clientSecret, onSuccess }: Props) {
  const stripe = useStripe()
  const elements = useElements()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handlePay = async () => {
    if (!stripe || !elements) return

    setLoading(true)
    setError(null)

    const card = elements.getElement(CardElement)

    const result = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: card!,
      },
    })

    if (result.error) {
      setError(result.error.message || "Payment failed")
    } else if (result.paymentIntent?.status === "succeeded") {
      onSuccess()
    }

    setLoading(false)
  }

  return (
    <div className="space-y-4">
      <CardElement className="p-4 border rounded bg-white" />

      {error && <p className="text-red-500">{error}</p>}

      <button
        onClick={handlePay}
        disabled={!stripe || loading}
        className="w-full btn-gold py-3 rounded-2xl text-white"
      >
        {loading ? "Processing..." : "Pay Now"}
      </button>
    </div>
  )
}
