import { Lock, Mail, User } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useUserStore } from "../store/useUserStore";

function SignUpPage() {
  // Form state
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  // User store
  const { signup, loading } = useUserStore();

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    signup(formData);
  };
  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white text-gray-500 max-sm:w-[270px] max-w-[340px] w-full mx-auto md:p-6 p-4 my-8 text-sm rounded-lg shadow-[0px_0px_10px_0px] shadow-black/10"
    >
      <h2 className="text-2xl font-bold mb-9 text-center text-gray-800">
        Sign Up
      </h2>
      <div className="flex items-center my-2 border bg-gray-500/2 border-gray-500/10 rounded gap-1 pl-2">
        <User className="w-4 h-4 text-gray-400" />
        <input
          className="w-full outline-none bg-transparent py-2.5"
          type="text"
          placeholder="Name"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          required
        />
      </div>
      <div className="flex items-center my-2 border bg-gray-500/2 border-gray-500/10 rounded gap-1 pl-2">
        <Mail className="w-4 h-4 text-gray-400" />
        <input
          className="w-full outline-none bg-transparent py-2.5"
          type="email"
          placeholder="Email"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          required
        />
      </div>
      <div className="flex items-center mt-2 border bg-gray-500/2 border-gray-500/10 rounded gap-1 pl-2">
        <Lock className="w-4 h-4 text-gray-400" />
        <input
          className="w-full outline-none bg-transparent py-2.5"
          type="password"
          placeholder="Password"
          value={formData.password}
          onChange={(e) =>
            setFormData({ ...formData, password: e.target.value })
          }
          required
        />
      </div>
      <div className="flex items-center mt-2 mb-8 border bg-gray-500/2 border-gray-500/10 rounded gap-1 pl-2">
        <Lock className="w-4 h-4 text-gray-400" />
        <input
          className="w-full outline-none bg-transparent py-2.5"
          type="password"
          placeholder="Confirm Password"
          value={formData.confirmPassword}
          onChange={(e) =>
            setFormData({ ...formData, confirmPassword: e.target.value })
          }
          required
        />
      </div>
      <button
        disabled={loading}
        className="w-full mb-3 bg-orange-500 hover:bg-orange-600 transition-all active:scale-95 py-2.5 rounded text-white font-medium"
      >
        {loading ? "Loading..." : "Sign Up"}
      </button>
      <p className="text-center mt-4">
        Already have an account?{" "}
        <Link to="/login" className="text-orange-500 underline">
          Log In
        </Link>
      </p>
    </form>
  );
}

export default SignUpPage;
