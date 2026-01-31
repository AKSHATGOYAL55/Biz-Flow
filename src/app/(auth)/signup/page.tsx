"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Eye, EyeOff, Loader2, User, Mail, Lock } from "lucide-react";
import { supabase } from "@/lib/supabase/client";

export default function SignupPage() {
  const router = useRouter();

  const [form, setForm] = useState({
    fullName: "",
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      setLoading(true);

      const { data, error } = await supabase.auth.signUp({
        email: form.email,
        password: form.password,
      });

      if (error) throw error;
      if (!data.user) throw new Error("Signup failed");

      await supabase.from("profiles").insert({
        id: data.user.id,
        email: form.email,
        full_name: form.fullName,
      });

      router.replace("/dashboard");
    } catch (err: any) {
      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f8fafc] px-4">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="w-full max-w-md rounded-2xl border border-gray-200/70 
        bg-white/80 backdrop-blur-xl
        shadow-[0_20px_40px_rgba(0,0,0,0.08)] p-8"
      >
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-semibold tracking-tight">
            Create your account
          </h1>
          <p className="text-sm text-gray-500 mt-2">
            Get started in less than a minute
          </p>
        </div>

        {/* Error */}
        {error && (
          <motion.div
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-5 text-sm text-red-600 bg-red-50 border border-red-100 p-3 rounded-lg"
          >
            {error}
          </motion.div>
        )}

        <form onSubmit={handleSignup} className="space-y-5">
          {/* Full Name */}
          <div className="group">
            <label className="text-sm font-medium text-gray-700">
              Full Name
            </label>
            <div className="relative mt-1">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 
                text-gray-400 group-focus-within:text-indigo-600 transition" />
              <input
                type="text"
                placeholder="John Doe"
                className="w-full pl-10 pr-3 py-2.5 rounded-xl border border-gray-300
                bg-white outline-none transition
                hover:border-gray-400
                focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100"
                value={form.fullName}
                onChange={(e) =>
                  setForm({ ...form, fullName: e.target.value })
                }
              />
            </div>
          </div>

          {/* Email */}
          <div className="group">
            <label className="text-sm font-medium text-gray-700">
              Email
            </label>
            <div className="relative mt-1">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 
                text-gray-400 group-focus-within:text-indigo-600 transition" />
              <input
                type="email"
                placeholder="you@company.com"
                className="w-full pl-10 pr-3 py-2.5 rounded-xl border border-gray-300
                bg-white outline-none transition
                hover:border-gray-400
                focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100"
                value={form.email}
                onChange={(e) =>
                  setForm({ ...form, email: e.target.value })
                }
              />
            </div>
          </div>

          {/* Password */}
          <div className="group">
            <label className="text-sm font-medium text-gray-700">
              Password
            </label>
            <div className="relative mt-1">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 
                text-gray-400 group-focus-within:text-indigo-600 transition" />
              <input
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                className="w-full pl-10 pr-10 py-2.5 rounded-xl border border-gray-300
                bg-white outline-none transition
                hover:border-gray-400
                focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100"
                value={form.password}
                onChange={(e) =>
                  setForm({ ...form, password: e.target.value })
                }
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 
                text-gray-400 hover:text-indigo-600 transition"
              >
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>

          {/* Submit */}
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.97 }}
            type="submit"
            disabled={loading}
            className="w-full flex items-center justify-center gap-2 rounded-xl
            bg-gradient-to-r from-indigo-600 to-purple-600
            hover:from-indigo-500 hover:to-purple-500
            text-white py-2.5 font-medium
            shadow-lg shadow-indigo-500/20
            transition disabled:opacity-60"
          >
            {loading && <Loader2 className="h-4 w-4 animate-spin" />}
            Create Account
          </motion.button>
        </form>

        {/* Footer */}
        <p className="text-sm text-center text-gray-500 mt-8">
          Already have an account?{" "}
          <span
            className="text-indigo-600 font-medium cursor-pointer hover:underline"
            onClick={() => router.push("/login")}
          >
            Login
          </span>
        </p>
      </motion.div>
    </div>
  );
}
