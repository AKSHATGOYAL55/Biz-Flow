"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

export default function CreateOrganizationPage() {
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleCreate = async () => {
    if (!name.trim()) return;

    setLoading(true);

    const res = await fetch("/api/organizations", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name }),
    });

    setLoading(false);


    // yha pr change hoga

    if (res.ok) {
      router.push("/dashboard");
    }

    //yha tk 
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-white">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="w-full max-w-md"
      >
        <div className="rounded-2xl border border-gray-200 p-6 sm:p-8 shadow-sm">
          <motion.h1
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="text-2xl font-semibold text-gray-900 mb-2"
          >
            Create Organization
          </motion.h1>

          <p className="text-sm text-gray-500 mb-6">
            Set up your workspace to get started
          </p>

          {/* Input */}
          <motion.div
            whileFocus={{ scale: 1.01 }}
            className="mb-4"
          >
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Company name"
              className="w-full rounded-xl border border-gray-300 px-4 py-3 text-sm
                         focus:outline-none focus:ring-2 focus:ring-black/80
                         transition"
            />
          </motion.div>

          {/* Button */}
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.97 }}
            disabled={loading}
            onClick={handleCreate}
            className="w-full rounded-xl bg-black text-white py-3 text-sm font-medium
                       disabled:opacity-60 disabled:cursor-not-allowed
                       transition"
          >
            {loading ? "Creating..." : "Create Organization"}
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
}
