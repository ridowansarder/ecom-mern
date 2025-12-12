import { useCartStore } from "../store/useCartStore";
import EmptyCartUI from "../components/EmptyCartUI";
import CartItem from "../components/CartItem";
import OrderSummary from "../components/OrderSummary";

const CartPage = () => {
  const { cart } = useCartStore();

  return (
    <div className="my-8">
      <div className="mx-auto max-w-7xl px-4 2xl:px-0">
        <div className="mt-6 sm:mt-8 md:gap-6 lg:flex lg:items-start xl:gap-8">
          <div className="mx-auto w-full flex-none lg:max-w-2xl xl:max-w-4xl">
            {cart.length === 0 ? (
              <EmptyCartUI />
            ) : (
              <div className="space-y-6">
                {cart.map((item) => (
                  <CartItem key={item._id} item={item} />
                ))}
              </div>
            )}
          </div>

          {cart.length > 0 && (
            <div className="mx-auto mt-6 max-w-4xl flex-1 space-y-6 lg:mt-0 lg:w-full">
              <OrderSummary />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CartPage;
