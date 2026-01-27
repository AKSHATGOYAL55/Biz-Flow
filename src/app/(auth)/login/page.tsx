"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Mail, Lock, Eye, EyeOff, Loader2 } from "lucide-react";
import { supabase } from "@/lib/supabase/client";

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!email || !password) {
      setError("Email and password are required");
      return;
    }

    try {
      setLoading(true);

      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;

      // Middleware will take care of protection
      router.replace("/dashboard");
    } catch (err: any) {
      if (err.message.includes("Email not confirmed")) {
        setError("Please verify your email before logging in.");
      } else {
        setError(err.message || "Invalid login credentials");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-linear-to-br from-indigo-600 via-purple-600 to-pink-600 px-4">

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8"
      >
        <h1 className="text-2xl font-bold text-center mb-2">
          Welcome back 👋
        </h1>
        <p className="text-sm text-gray-500 text-center mb-6">
          Login to your BizFlow account
        </p>

        {error && (
          <div className="mb-4 text-sm text-red-600 bg-red-50 p-3 rounded-lg">
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-4">
          {/* Email */}
          <div>
            <label className="text-sm font-medium">Email</label>
            <div className="relative mt-1">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="email"
                className="w-full pl-10 pr-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="you@company.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>

          {/* Password */}
          <div>
            <label className="text-sm font-medium">Password</label>
            <div className="relative mt-1">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type={showPassword ? "text" : "password"}
                className="w-full pl-10 pr-10 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
              >
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="w-full flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white py-2 rounded-lg transition disabled:opacity-70"
          >
            {loading && <Loader2 className="h-4 w-4 animate-spin" />}
            Login
          </button>
        </form>

        <div className="flex justify-between items-center mt-4 text-sm">
          <span
            className="text-indigo-600 cursor-pointer hover:underline"
            onClick={() => router.push("/signup")}
          >
            Create account
          </span>

          <span className="text-gray-500 hover:underline cursor-pointer">
            Forgot password?
          </span>
        </div>
      </motion.div>
    </div>
  );
}
