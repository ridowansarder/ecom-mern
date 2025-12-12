import { useCartStore } from "../store/useCartStore";
import { Minus, Plus, Trash } from "lucide-react";
import { Link } from "react-router-dom";

const CartItem = ({ item }) => {
  const { removeFromCart, updateQuantity } = useCartStore();
  return (
    <div className="rounded-lg border p-4 shadow-sm  md:p-6">
      <div className="space-y-4 md:flex md:items-center md:justify-between md:gap-6 md:space-y-0">
        <Link to={`/category/${item.category}/${item._id}`}>
          <div className="shrink-0 md:order-1">
            <img
              className="h-20 md:h-32 rounded object-cover"
              src={item.image}
            />
          </div>
        </Link>
        <label className="sr-only">Choose quantity:</label>

        <div className="flex items-center justify-between md:order-3 md:justify-end max-sm:mt-3">
          <div className="flex items-center gap-2">
            <button
              className="inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-md bg-orange-500 hover:bg-orange-600 focus:outline-none cursor-pointer"
              onClick={() => updateQuantity(item._id, item.quantity - 1)}
            >
              <Minus className="text-white" />
            </button>
            <p>{item.quantity}</p>
            <button
              className="inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-md bg-orange-500 hover:bg-orange-600 focus:outline-none cursor-pointer"
              onClick={() => updateQuantity(item._id, item.quantity + 1)}
            >
              <Plus className="text-white" />
            </button>
          </div>

          <div className="text-end md:order-4 md:w-32">
            <p className="text-base font-bold text-gray-900">${item.price}</p>
          </div>
        </div>

        <div className="w-full min-w-0 flex-1 space-y-4 md:order-2 md:max-w-md">
          <p className="text-base font-medium text-gray-900">{item.name}</p>

          <div className="flex items-center gap-4">
            <button
              className="inline-flex items-center text-sm font-medium text-red-500
							 hover:text-red-600 hover:underline cursor-pointer"
              onClick={() => removeFromCart(item._id)}
            >
              <Trash />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
