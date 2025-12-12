import { Lock, Mail } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useUserStore } from "../store/useUserStore";
import toast from "react-hot-toast";

function LoginPage() {
  // Form state
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // User store
  const { login, loading } = useUserStore();

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await login(email, password);
    toast.success("Logged in successfully");
    if (result) window.location.reload();
  };
  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white text-gray-500 max-sm:w-[270px] max-w-[340px] w-full mx-auto md:p-6 p-4 my-8 text-sm rounded-lg shadow-[0px_0px_10px_0px] shadow-black/10"
    >
      <h2 className="text-2xl font-bold mb-9 text-center text-gray-800">
        Log In
      </h2>

      <div className="flex items-center my-2 border bg-gray-500/2 border-gray-500/10 rounded gap-1 pl-2">
        <Mail className="w-4 h-4 text-gray-400" />
        <input
          className="w-full outline-none bg-transparent py-2.5"
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>
      <div className="flex items-center mt-2 mb-8 border bg-gray-500/2 border-gray-500/10 rounded gap-1 pl-2">
        <Lock className="w-4 h-4 text-gray-400" />
        <input
          className="w-full outline-none bg-transparent py-2.5"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>

      <button
        disabled={loading}
        className="w-full mb-3 bg-orange-500 hover:bg-orange-600 transition-all active:scale-95 py-2.5 rounded text-white font-medium"
      >
        {loading ? "Loading..." : "Log In"}
      </button>
      <p className="text-center mt-4">
        Don't have an account?{" "}
        <Link to="/signup" className="text-orange-500 underline">
          Sign Up
        </Link>
      </p>
    </form>
  );
}

export default LoginPage;
