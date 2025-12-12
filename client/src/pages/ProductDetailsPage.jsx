import { useEffect } from "react";
import { useProductStore } from "../store/useProductStore";
import { useParams } from "react-router-dom";
import { useCartStore } from "../store/useCartStore";

const ProductDetailsPage = () => {
  const { products, getProducts } = useProductStore();
  const { addToCart } = useCartStore();
  const { productId } = useParams();
  const product = products.find((product) => product._id === productId);

  useEffect(() => {
    getProducts();
  }, [getProducts]);
  
  return (
    product && (
      <div className="max-w-7xl mx-auto w-full px-6">
        <div className="flex flex-col md:flex-row gap-16 mt-4">
          <div className="flex gap-3">
            <div className="border border-gray-500/30 max-w-100 rounded overflow-hidden">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          <div className="text-sm w-full md:w-1/2">
            <h1 className="text-3xl font-medium">{product.name}</h1>

            <div className="mt-6">
              <p className="text-gray-600 text-base font-medium">
                Price: ${product.price}
              </p>
            </div>

            <p className="text-base font-medium mt-6">About Product</p>
            <p className="list-disc font-medium text-gray-500">
              {product.description.slice(0, 100)}
            </p>

            <div className="flex items-center mt-10 gap-4 text-base">
              <button
                onClick={() => addToCart(product)}
                className="w-full py-3.5 cursor-pointer font-medium bg-gray-100 text-gray-800/80 hover:bg-gray-200 transition"
              >
                Add to Cart
              </button>
              <button className="w-full py-3.5 cursor-pointer font-medium bg-orange-500 text-white hover:bg-orange-600 transition">
                Buy now
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  );
};

export default ProductDetailsPage;
