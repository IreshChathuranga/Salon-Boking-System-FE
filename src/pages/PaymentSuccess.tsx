import { useEffect } from "react";
import { useNavigate , useSearchParams } from "react-router-dom";
import { confirmPayment } from "../services/payment";

export default function PaymentSuccess() {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();

    useEffect(() => {
        const sessionId = searchParams.get("session_id");
        const stored = localStorage.getItem("bookingCards");

        if (!sessionId || !stored) return;

        const bookingIds = JSON.parse(stored).map((b: any) => b.id);

        confirmPayment({
            bookingIds,
            stripeSessionId: sessionId,
            amount: bookingIds.length,
            currency: "lkr",
        })
            .then(() => {
                localStorage.removeItem("bookingCards");
                localStorage.removeItem("paymentConfirmed");
                setTimeout(() => navigate("/booking"), 3000);
            })
            .catch(console.error);
    }, []);

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-green-100">
            <div className="bg-white p-8 rounded-lg shadow-md text-center">
                <h1 className="text-3xl font-bold mb-4 text-green-600">Payment Successful!</h1>
                <p className="text-lg text-gray-700">Thank you for your payment. Your booking has been confirmed.</p>
            </div>
        </div>
    );
}
