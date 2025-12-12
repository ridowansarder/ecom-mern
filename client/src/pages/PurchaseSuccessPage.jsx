import { ArrowRight, CheckCircle, HandHeart } from "lucide-react";
import { useEffect } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useCartStore } from "../store/useCartStore";
import axios from "../config/axios";
import Confetti from "react-confetti";

const PurchaseSuccessPage = () => {
  const [isProcessing, setIsProcessing] = useState(true);
  const [error, setError] = useState(null);
  const { clearCart } = useCartStore();

  useEffect(() => {
    const handleCheckoutSuccess = async (sessionId) => {
      try {
        await axios.post("/payments/checkout-success", { sessionId });
        clearCart();
      } catch (error) {
        console.error("Checkout success handling error:", error);
      } finally {
        setIsProcessing(false);
      }
    };
    const sessionId = new URLSearchParams(window.location.search).get(
      "session_id"
    );
    if (sessionId) {
      handleCheckoutSuccess(sessionId);
    } else {
      setIsProcessing(false);
      setError("No session ID found in the URL.");
    }
  }, [clearCart]);

  if (isProcessing) return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="text-center">
        <div className="loader mb-4"></div>
        <p className="text-gray-600">Processing your purchase...</p>
      </div>
    </div>
  );

  if (error)
    return (
      <div className="flex items-center justify-center px-4 min-h-screen">
        <div className="max-w-md w-full bg-gray-100 rounded-lg shadow-xl overflow-hidden relative z-10">
          <div className="p-6 sm:p-8">
            <h1 className="text-2xl sm:text-3xl font-bold text-center text-red-500 mb-2">
              Error
            </h1>
            <p className="text-black text-center mb-6">{error}</p>
          </div>
        </div>
      </div>
    );

  return (
    <div className="flex items-center justify-center">
      <Confetti
        width={window.innerWidth}
        height={window.innerHeight}
        recycle={false}
        gravity={0.2}
        style={{ zIndex: 99 }}
        numberOfPieces={700}
      />

      <div className="max-w-md w-full mx-auto mt-12 rounded-lg shadow-xl overflow-hidden relative z-10">
        <div className="p-6 sm:p-8">
          <div className="flex justify-center">
            <CheckCircle className="text-orange-400 w-16 h-16 mb-4" />
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-center text-orange-400 mb-2">
            Purchase Successful!
          </h1>

          <p className="text-black text-center mb-2">
            Thank you for your order. {"We're"} processing it now.
          </p>
          <p className="text-orange-400 text-center text-sm mb-6">
            Check your email for order details and updates.
          </p>
          <div className="bg-orange-50 rounded-lg p-4 mb-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-black">Order number</span>
              <span className="text-sm font-semibold text-orange-400">
                #12345
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-black">Estimated delivery</span>
              <span className="text-sm font-semibold text-orange-400">
                3-5 business days
              </span>
            </div>
          </div>

          <div className="space-y-4">
            <button
              className="w-full bg-orange-400 hover:bg-orange-500 text-white font-bold py-2 px-4 cursor-pointer
             rounded-lg transition duration-300 flex items-center justify-center"
            >
              <HandHeart className="mr-2" size={18} />
              Thanks for trusting us!
            </button>
            <Link
              to={"/products"}
              className="w-full border hover:bg-orange-50 border-orange-400 text-orange-400 font-bold py-2 px-4 
            rounded-lg transition duration-300 flex items-center justify-center"
            >
              Continue Shopping
              <ArrowRight className="ml-2" size={18} />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PurchaseSuccessPage;
