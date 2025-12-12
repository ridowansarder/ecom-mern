import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { useProductStore } from "../store/useProductStore";
import ProductCard from "../components/ProductCard";

const CategoryPage = () => {
  const { category } = useParams();
  const { getProductsByCategory, products } = useProductStore();

  useEffect(() => {
    getProductsByCategory(category);
  }, [getProductsByCategory, category]);

  if (products.length === 0) {
    return (
      <div className="container max-w-7xl mx-auto flex items-center flex-col  pt-48 min-h-screen">
        <h1 className="text-center text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900">
          No products found
        </h1>
        <Link to="/products" className="flex justify-center mt-4 bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600">
        <button>Go Back</button>
        </Link>
      </div>
    );
  }

  return (
    <div className="container max-w-7xl mx-auto flex items-center flex-col my-8 min-h-screen">
      <h1 className="relative z-10 mx-auto px-4 sm:px-6 lg:px-8  pb-8 text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900">
        {category.charAt(0).toUpperCase() + category.slice(1)}
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {products.map((product) => (
          <ProductCard key={product?._id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default CategoryPage;
