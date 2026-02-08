import React, { useContext, useState } from "react";
import { Mail, Lock, Eye, EyeOff } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { authDataContext } from "../context/AuthContext";
import axios from "axios";
import { userDataContext } from "../context/UserContext";
import toast from "react-hot-toast";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const { serverUrl } = useContext(authDataContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { userdata, setUserData } = useContext(userDataContext);

  const handlelogin = async (e) => {
    try {
      e.preventDefault();
      // Basic client-side validation
      if (!email || !password) {
        toast.error("Email and password are required");
        return;
      }
    
      const result = await axios.post(
        serverUrl + "/auth/login",
        {
          email,
          password,
        },
        { withCredentials: true },
      );
      setUserData(result.data);
      navigate("/");
      toast.success("Login successful!"); 
      console.log(result);
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-black via-gray-900 to-black px-3 sm:px-6">
      <div className="w-full max-w-md sm:max-w-lg bg-white/5 backdrop-blur-xl rounded-3xl p-6 sm:p-10 shadow-2xl border border-white/10">
        {/* Heading */}
        <div className="text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-white">
            Welcome Back
          </h2>
          <p className="text-gray-400 text-xs sm:text-sm mt-2">
            Login to continue your account
          </p>
        </div>

        {/* Form */}
        <form
          className="mt-6 sm:mt-8 space-y-4 sm:space-y-5"
          onSubmit={handlelogin}
        >
          {/* Email */}
          <div>
            <label className="text-gray-300 text-sm">Email</label>
            <div className="flex items-center gap-2 mt-2 px-4 py-3 rounded-xl bg-white/10 border border-white/10 focus-within:border-pink-500 transition">
              <Mail className="text-gray-300 w-5 h-5" />
              <input
                type="email"
                onChange={(e) => setEmail(e.target.value)}
                name="email"
                value={email}
                placeholder="Enter your email"
                className="w-full bg-transparent outline-none text-white placeholder-gray-400 text-sm"
              />
            </div>
          </div>

          {/* Password */}
          <div>
            <label className="text-gray-300 text-sm">Password</label>
            <div className="flex items-center gap-2 mt-2 px-4 py-3 rounded-xl bg-white/10 border border-white/10 focus-within:border-blue-500 transition">
              <Lock className="text-gray-300 w-5 h-5" />
              <input
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                name="password"
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                className="w-full bg-transparent outline-none text-white placeholder-gray-400 text-sm"
              />

              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="text-gray-300 hover:text-white transition"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          {/* Forgot Password */}
          <div className="flex items-center justify-end">
            <p className="text-sm text-pink-400 hover:underline cursor-pointer">
              Forgot Password?
            </p>
          </div>

          {/* Button */}
          <button
            type="submit"
            className="w-full py-3 rounded-xl font-semibold text-white bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 hover:opacity-90 transition shadow-lg"
          >
            Login
          </button>

          {/* Signup */}
          <p className="text-gray-400 text-sm text-center mt-4">
            Don’t have an account?{" "}
            <span
              onClick={() => navigate("/signup")}
              className="text-pink-400 hover:underline cursor-pointer"
            >
              Signup
            </span>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
