import { Navigate, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import SignUpPage from "./pages/SignUpPage";
import LoginPage from "./pages/LoginPage";
import Navbar from "./components/Navbar";
import { Toaster } from "react-hot-toast";
import { useUserStore } from "./store/useUserStore";
import { useEffect } from "react";
import LoadingSpinner from "./components/LoadingSpinner";
import DashboardPage from "./pages/DashboardPage";
import CategoryPage from "./pages/CategoryPage";
import { useCartStore } from "./store/useCartStore";
import CartPage from "./pages/CartPage";
import Footer from "./components/Footer";
import ProductDetailsPage from "./pages/ProductDetailsPage";
import ProductsPage from "./pages/ProductsPage";
import { useProductStore } from "./store/useProductStore";
import PurchaseSuccessPage from "./pages/PurchaseSuccessPage";
import PurchaseCancelPage from "./pages/PurchaseCancelPage";

function App() {
  const { user, checkAuth, checkingAuth } = useUserStore();
  const { getCartItems } = useCartStore();
  const { getProducts } = useProductStore();

  // Check if user is logged in on app load
  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  // Only fetch cart and products if user is authenticated
  useEffect(() => {
    if (user) {
      getCartItems();
      getProducts();
    }
  }, [user, getCartItems, getProducts]);

  // Show loading spinner while checking auth
  if (checkingAuth) return <LoadingSpinner />;

  return (
    <div className="px-4 sm:px-[5vw] md:px-[7vw] lg:px-[10vw]">
      <Navbar />
      <Routes>
        <Route
          path="/"
          element={user ? <HomePage /> : <Navigate to="/login" />}
        />
        <Route
          path="/signup"
          element={!user ? <SignUpPage /> : <Navigate to="/" />}
        />
        <Route
          path="/login"
          element={!user ? <LoginPage /> : <Navigate to="/" />}
        />
        <Route
          path="/dashboard"
          element={
            user?.role === "admin" ? <DashboardPage /> : <Navigate to="/" />
          }
        />
        <Route
          path="/category/:category"
          element={user ? <CategoryPage /> : <Navigate to="/login" />}
        />
        <Route
          path="/cart"
          element={user ? <CartPage /> : <Navigate to="/login" />}
        />
        <Route
          path="/products"
          element={user ? <ProductsPage /> : <Navigate to="/login" />}
        />
        <Route
          path="/category/:category/:productId"
          element={user ? <ProductDetailsPage /> : <Navigate to="/login" />}
        />
        <Route
          path="/category/:category/:productId"
          element={user ? <ProductDetailsPage /> : <Navigate to="/login" />}
        />
        <Route
          path="/purchase-success"
          element={user ? <PurchaseSuccessPage /> : <Navigate to="/login" />}
        />
        <Route
          path="/purchase-success"
          element={user ? <PurchaseSuccessPage /> : <Navigate to="/login" />}
        />
        <Route
          path="/purchase-cancel"
          element={user ? <PurchaseCancelPage /> : <Navigate to="/login" />}
        />
      </Routes>
      <Toaster />
      <Footer />
    </div>
  );
}

export default App;
