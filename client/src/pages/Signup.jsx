import React, { useContext, useState } from "react";
import { Eye, EyeOff, User, Mail, Lock } from "lucide-react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { authDataContext } from "../context/AuthContext";
import { userDataContext } from "../context/UserContext";
import  toast  from "react-hot-toast";

const Signup = () => {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const { serverUrl } = useContext(authDataContext);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

    const { userdata, setUserData } = useContext(userDataContext);
  

  const handleSignup = async (e) => {
    try {
      e.preventDefault();
      const result = await axios.post(
        serverUrl + "/auth/signup",
        {
          name,
          email,
          password,
        },
        { withCredentials: true }
       
      );
       setUserData(result.data)
       navigate('/')
       toast.success("Signup successful!");
      console.log(result);
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || "Signup failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-black via-gray-900 to-black px-3 sm:px-6">
      <div className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-2 bg-white/5 backdrop-blur-xl rounded-3xl overflow-hidden shadow-2xl border border-white/10">
        {/* LEFT SIDE (Design Section) */}
        <div className="hidden md:flex flex-col justify-center px-8 lg:px-10 py-10 lg:py-12 bg-gradient-to-br from-purple-600/30 via-pink-500/20 to-blue-500/30">
          <h1 className="text-3xl lg:text-4xl font-bold text-white leading-tight">
            Create Your <span className="text-pink-400">Account</span>
          </h1>
          <p className="text-gray-200 mt-4 text-sm leading-relaxed">
            Join us today and unlock a modern dashboard experience with smooth
            UI, secure login, and responsive design across all devices.
          </p>

          <div className="mt-8 lg:mt-10 space-y-3 lg:space-y-4">
            <div className="flex items-center gap-3 text-gray-200 text-sm">
              ✅ <span>Responsive Design</span>
            </div>
            <div className="flex items-center gap-3 text-gray-200 text-sm">
              ✅ <span>Secure Authentication UI</span>
            </div>
            <div className="flex items-center gap-3 text-gray-200 text-sm">
              ✅ <span>Modern Tailwind Layout</span>
            </div>
          </div>
        </div>

        {/* RIGHT SIDE (Signup Form) */}
        <div className="px-5 sm:px-10 py-8 sm:py-10 md:py-12">
          <h2 className="text-2xl sm:text-3xl font-bold text-white">Signup</h2>
          <p className="text-gray-400 text-xs sm:text-sm mt-1">
            Create a new account to continue
          </p>

          <form
            className="mt-6 sm:mt-8 space-y-4 sm:space-y-5"
            onSubmit={handleSignup}
          >
            {/* Username */}
            <div>
              <label className="text-gray-300 text-sm">Username</label>
              <div className="flex items-center gap-2 mt-2 px-4 py-3 rounded-xl bg-white/10 border border-white/10 focus-within:border-pink-500 transition">
                <User className="text-gray-300 w-5 h-5" />
                <input
                  type="text"
                  onChange={(e) => setName(e.target.value)}
                  value={name}
                  name="name"
                  placeholder="Enter username"
                  className="w-full bg-transparent outline-none text-white placeholder-gray-400 text-sm"
                />
              </div>
            </div>

            {/* Email */}
            <div>
              <label className="text-gray-300 text-sm">Email</label>
              <div className="flex items-center gap-2 mt-2 px-4 py-3 rounded-xl bg-white/10 border border-white/10 focus-within:border-purple-500 transition">
                <Mail className="text-gray-300 w-5 h-5" />
                <input
                  type="email"
                  onChange={(e) => setEmail(e.target.value)}
                  name="email"
                  value={email}
                  placeholder="Enter email"
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
                  placeholder="Enter password"
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

            {/* Button */}
            <button
              type="submit"
              className="w-full py-3 rounded-xl font-semibold text-white bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 hover:opacity-90 transition shadow-lg"
            >
              Create Account
            </button>

            {/* Bottom Text */}
            <p className="text-gray-400 text-sm text-center mt-4">
              Already have an account?{" "}
              <span
                onClick={() => navigate("/login")}
                className="text-pink-400 hover:underline cursor-pointer"
              >
                Login
              </span>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signup;
