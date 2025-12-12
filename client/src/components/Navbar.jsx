import {
  Lock,
  Menu,
  ShoppingCart,
  X,
  LogIn,
  LogOut,
  Home,
  ShoppingBag,
} from "lucide-react";
import React from "react";
import { Link, NavLink } from "react-router-dom";
import { useUserStore } from "../store/useUserStore";
import { useCartStore } from "../store/useCartStore";

const Navbar = () => {
  const [open, setOpen] = React.useState(false);
  const { user, logout, checkingAuth } = useUserStore();
  const { cart } = useCartStore();

  if (checkingAuth) return null;
  const admin = user?.role === "admin";

  return (
    <nav
      key={user?.role}
      className="flex items-center justify-between py-6 z-50"
    >
      <Link
        to="/"
        className="text-2xl font-bold text-orange-500 items-center space-x-2 flex"
      >
        {" "}
        SNORVO
      </Link>

      {/* Desktop Menu */}
      <div className="hidden sm:flex items-center gap-6">
        <div className="flex items-center gap-4">
          <NavLink to="/">
            <p>Home</p>
            <hr className="w-full h-0.5 border-none bg-orange-500 hidden" />
          </NavLink>
          <NavLink to="/products">
            <p>Products</p>
            <hr className="w-full h-0.5 border-none bg-orange-500 hidden" />
          </NavLink>
        </div>

        {admin && (
          <div className="hidden md:flex items-center gap-4">
            <Link
              to="/dashboard"
              className="border-orange-500 border-2 hover:bg-gray-100 transition text-orange-800 rounded-full px-8 py-2 w-full flex items-center gap-2"
            >
              <Lock className="w-4 h-4" /> Dashboard
            </Link>
          </div>
        )}
      </div>

      <div className="items-center gap-3 hidden sm:flex">
        <div>
          {user ? (
            <>
              <button
                onClick={logout}
                className="bg-orange-500 text-white py-2 px-4 rounded-full hover:bg-orange-600 transition duration-300 ease-in-out cursor-pointer"
              >
                Logout
              </button>
            </>
          ) : (
            <Link
              to="/login"
              className="bg-orange-500 text-white py-2 px-4 rounded-full hover:bg-orange-600 transition duration-300 ease-in-out cursor-pointer"
            >
              Login
            </Link>
          )}
        </div>
        <div className="relative cursor-pointer" title="cart">
          <Link to="/cart">
            <ShoppingCart className="text-gray-700" />
            <button className="absolute -top-2 -right-3 text-xs text-white bg-orange-500 w-[18px] h-[18px] rounded-full cursor-pointer">
              {cart.length}
            </button>
          </Link>
        </div>
      </div>

      <button
        onClick={() => setOpen((prev) => !prev)}
        className="md:hidden p-2 text-foreground z-50 cursor-pointer"
        aria-label={open ? "Close Menu" : "Open Menu"}
      >
        {open ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Mobile Menu */}
      <div
        className={`${
          open ? "flex" : "hidden"
        } absolute top-[60px] left-0 w-full bg-white shadow-md py-4 flex-col items-start gap-2 px-5 text-sm md:hidden z-50`}
      >
        <Link
          onClick={() => setOpen(false)}
          to="/"
          className="rounded-full px-3 py-1 w-full flex items-center gap-2 text-orange-500"
        >
          <Home className="w-4 h-4" /> Home
        </Link>
        <Link
          onClick={() => setOpen(false)}
          to="/products"
          className="rounded-full px-3 py-1 w-full flex items-center gap-2 text-orange-500"
        >
          <ShoppingBag className="w-4 h-4" /> Products
        </Link>

        {user ? (
          <>
            <Link
              onClick={() => setOpen(false)}
              to="/cart"
              className="rounded-full px-3 py-1 w-full flex items-center gap-2 text-orange-500"
            >
              <ShoppingCart className="w-4 h-4" /> Cart
            </Link>

            <div onClick={() => setOpen(false)}>
              <button
                onClick={logout}
                className="rounded-full px-3 py-1 w-full flex items-center gap-2 text-orange-500"
              >
                <LogOut className="w-4 h-4" /> Logout
              </button>
            </div>
          </>
        ) : (
          <Link
            onClick={() => setOpen(false)}
            to="/login"
            className="rounded-full px-3 py-1 w-full flex items-center gap-2 text-orange-500"
          >
            <LogIn className="w-4 h-4" /> Login
          </Link>
        )}
        {admin && (
          <Link
            onClick={() => setOpen(false)}
            to="/dashboard"
            className="rounded-full px-3 py-1 w-full flex items-center gap-2 text-orange-500"
          >
            <Lock className="w-4 h-4" /> Dashboard
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
