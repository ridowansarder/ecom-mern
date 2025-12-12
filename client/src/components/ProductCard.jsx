import { ShoppingCart } from "lucide-react";
import { useCartStore } from "../store/useCartStore";
import { Link } from "react-router-dom";

const ProductCard = ({ product }) => {
  const { addToCart } = useCartStore();

  return (
    <div className="flex flex-col bg-white shadow-md w-72 rounded-xl">
      <div className="bg-white bg-opacity-10 backdrop-blur-sm rounded-lg shadow-lg overflow-hidden h-full transition-all duration-300 hover:shadow-xl">
        <Link
          to={`/category/${product.category}/${product._id}`}
          className="overflow-hidden"
        >
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-48 object-cover transition-transform duration-300 ease-in-out hover:scale-110"
          />
        </Link>
        <div className="p-4">
          <h3 className="text-lg font-bold mb-2 text-gray-900">
            {product.name}
          </h3>
          <p className="text-gray-700 font-semibold text-lg mb-4">
            ${product.price.toFixed(2)}
          </p>
          <button
            onClick={() => addToCart(product)}
            className="w-full bg-orange-600 hover:bg-orange-500 text-white font-semibold py-2 px-4 rounded transition-colors duration-300 ease-in-out flex items-center justify-center cursor-pointer"
          >
            <ShoppingCart className="w-5 h-5 mr-2" />
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
