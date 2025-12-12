import { ShoppingCart } from "lucide-react";
import { Link } from "react-router-dom";

const EmptyCartUI = () => {
  return (
    <div className="flex flex-col items-center justify-center p-8 my-8 border-2 border-dashed border-gray-300 rounded-lg">
      <ShoppingCart className="w-16 h-16 text-gray-500" />
      <p className="text-xl text-center mt-3 text-gray-500 font-medium">
        Your shopping cart is empty
      </p>
      <Link to="/products">
        <button className="mt-6 px-4 py-2 bg-orange-500 text-white rounded hover:bg-orange-600 transition">
          Continue Shopping
        </button>
      </Link>
    </div>
  );
};

export default EmptyCartUI;
