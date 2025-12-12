import { Link } from "react-router-dom";

const FeaturedProducts = ({ featuredProducts }) => {
  return (
    <div className="my-8">
      <h1 className="text-3xl font-medium text-gray-800 text-center mb-2 font-poppins">
        Featured Products
      </h1>
      <p className="text-gray-600 mb-10 font-poppins text-center">
        Explore the latest trends in eco-friendly fashion
      </p>
      <section className="flex flex-wrap items-center justify-center gap-6">
        {featuredProducts.map((product) => (
          <Link to={`/category/${product.category}/${product._id}`} key={product._id} className="group w-56">
            <img
              className="rounded-lg w-full group-hover:shadow-xl hover:-translate-y-0.5 duration-300 transition-all h-72 object-cover object-top"
              src={product.image}
              alt="image"
            />
            <p className="text-sm mt-2">{product.name}</p>
            <p className="text-xl">${product.price}</p>
          </Link>
        ))}
      </section>
    </div>
  );
};

export default FeaturedProducts;
