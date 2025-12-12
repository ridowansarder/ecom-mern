import { useCartStore } from "../store/useCartStore";
import axios from "../config/axios";

const OrderSummary = () => {
  const { total, clearCart, cart } = useCartStore();
  const formattedTotal = total.toFixed(2);

  const handlePayment = async () => {
    try {
      const res = await axios.post("/payments/create-checkout-session", {
        products: cart,
      });
      const session = res.data;

      // Check if we got a valid URL
      if (!session.url) {
        throw new Error("No checkout URL received");
      }

      // Redirect using standard browser navigation
      window.location.href = session.url;
    } catch (error) {
      console.error("Payment error:", error);
      alert("Failed to create checkout session. Please try again.");
    }
  };

  return (
    <div>
      <div className="bg-white shadow-md rounded p-4">
        <h2 className="text-lg text-center font-medium text-gray-900">
          Order Summary
        </h2>
        <div className="flex items-center py-5 justify-between border-b border-gray-200">
          <p className="text-sm font-bold text-gray-900">Total</p>
          <p className="text-xl font-bold text-gray-900">${formattedTotal}</p>
        </div>
        <div className="flex flex-col items-center mt-4">
          <button
            className="bg-orange-500 text-white py-2 px-4 rounded-md hover:bg-orange-600 transition duration-300 ease-in-out mb-2 cursor-pointer"
            onClick={clearCart}
          >
            Clear Cart
          </button>
          <button
            className="border border-orange-500 text-orange-500 py-2 px-4 rounded-md hover:bg-gray-100 transition duration-300 ease-in-out cursor-pointer"
            onClick={handlePayment}
          >
            Proceed to Checkout
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrderSummary;
