import axios from "../config/axios";
import { create } from "zustand";
import toast from "react-hot-toast";

export const useCartStore = create((set, get) => ({
  // State
  cart: [],
  total: 0,
  subTotal: 0,

  // actions
  getCartItems: async () => {
    try {
      const res = await axios.get("/cart");

      set({ cart: res.data });

      get().calculateTotal();
    } catch {
      set({ cart: [] });
    }
  },

  addToCart: async (product) => {
    try {
      await axios.post("/cart", { productId: product._id });
      toast.success("Product added to cart successfully");

      set((state) => {
        const existingItem = state.cart.find(
          (item) => item._id === product._id
        );

        const updatedCart = existingItem
          ? state.cart.map((item) =>
              item._id === product._id
                ? { ...item, quantity: item.quantity + 1 }
                : item
            )
          : [...state.cart, { ...product, id: product._id, quantity: 1 }];

        return { cart: updatedCart };
      });
      get().calculateTotal();
    } catch (error) {
      console.error("Add to cart error:", error);
    }
  },

  removeFromCart: async (productId) => {
    try {
      await axios.delete(`/cart`, { data: { productId } });
      toast.success("Product removed from cart successfully");
      set((state) => ({
        cart: state.cart.filter((item) => item._id !== productId),
      }));
      get().calculateTotal();
    } catch (error) {
      toast.error(error.response.data.message || "An error occurred");
    }
  },

  updateQuantity: async (productId, quantity) => {
    if (quantity === 0) {
      get().removeFromCart(productId);
      return;
    }

    await axios.put(`/cart/${productId}`, { quantity });
    set((prevState) => ({
      cart: prevState.cart.map((item) =>
        item._id === productId ? { ...item, quantity } : item
      ),
    }));
    get().calculateTotal();
  },

  clearCart: async () => {
    try {
      await axios.delete("/cart/clear");
      set({ cart: [], total: 0 });
    } catch (error) {
      console.error("Clear cart error:", error);
    }
  },

  calculateTotal: () => {
    const { cart } = get();

    const total = cart.reduce(
      (acc, item) => acc + item.price * item.quantity,
      0
    );

    set({ total });
  },
}));
