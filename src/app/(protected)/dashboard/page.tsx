"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  LayoutDashboard,
  Users,
  Settings,
  LogOut,
  Menu,
  X,
  Layers,
} from "lucide-react";

export default function DashboardPage() {
  const [open, setOpen] = useState(false);
  const sidebarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (
        open &&
        sidebarRef.current &&
        !sidebarRef.current.contains(e.target as Node)
      ) {
        setOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () =>
      document.removeEventListener("mousedown", handleClickOutside);
  }, [open]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-zinc-50 to-zinc-100">
      {/* ===== NAVBAR ===== */}
      <div className="sticky top-0 z-30 backdrop-blur-xl bg-white/70 border-b">
        <div className="flex items-center gap-4 px-6 py-4">
          {/* Toggle */}
          <motion.button
            onClick={() => setOpen(!open)}
            whileTap={{ scale: 0.9 }}
            className="
              h-10 w-10 rounded-xl
              bg-gradient-to-br from-indigo-500 to-violet-600
              text-white
              flex items-center justify-center
              shadow-md
            "
          >
            <AnimatePresence mode="wait" initial={false}>
              {open ? (
                <motion.div
                  key="close"
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <X size={18} />
                </motion.div>
              ) : (
                <motion.div
                  key="menu"
                  initial={{ rotate: 90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: -90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <Menu size={18} />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.button>

          <span className="text-xl font-bold tracking-tight">
            BizFlow
          </span>
        </div>
      </div>

      {/* ===== MAIN CONTENT ===== */}
      {/* <div className="p-8">
        <h2 className="text-3xl font-semibold tracking-tight">
          Dashboard
        </h2>
        <p className="mt-2 text-gray-500">
          Welcome back 👋 Let’s manage your business.
        </p>
      </div> */}

      {/* ===== SIDEBAR ===== */}
      <AnimatePresence>
        {open && (
          <motion.aside
            ref={sidebarRef}
            initial={{ x: -320 }}
            animate={{ x: 0 }}
            exit={{ x: -320 }}
            transition={{
              type: "spring",
              stiffness: 260,
              damping: 28,
            }}
            className="
              fixed top-0 left-0 h-full w-80
              bg-white
              border-r
              shadow-2xl
              z-40
              rounded-tr-3xl rounded-br-3xl
            "
          >
            {/* Header */}
            <div className="px-6 py-6 border-b">
              <div className="flex items-center gap-4">
                <BizFlowIcon open={open} />
                <div>
                  <h2 className="text-lg font-semibold">
                    BizFlow
                  </h2>
                  <p className="text-xs text-gray-500">
                    Premium Workspace
                  </p>
                </div>
              </div>
            </div>

            {/* Nav */}
            <nav className="p-5 space-y-2">
              <SidebarItem icon={<LayoutDashboard />} label="Overview" />
              <SidebarItem icon={<Users />} label="Team" />
              <SidebarItem icon={<Settings />} label="Settings" />
            </nav>

            {/* Footer */}
            <div className="absolute bottom-6 left-5 right-5">
              <button className="w-full flex items-center gap-3 p-3 rounded-2xl bg-red-600 hover:bg-zinc-100 transition">
                <LogOut size={18} />
                <span className="font-medium">Logout</span>
              </button>
            </div>
          </motion.aside>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ===== SIDEBAR ITEM ===== */

function SidebarItem({
  icon,
  label,
}: {
  icon: React.ReactNode;
  label: string;
}) {
  return (
    <motion.button
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.97 }}
      className="
        w-full flex items-center gap-4
        px-4 py-3
        rounded-2xl
        text-left
        hover:bg-zinc-100
        transition
      "
    >
      <div className="text-indigo-600">
        {icon}
      </div>
      <span className="font-medium text-gray-800">
        {label}
      </span>
    </motion.button>
  );
}

/* ===== NEW PREMIUM BIZFLOW ICON ===== */

function BizFlowIcon({ open }: { open: boolean }) {
  return (
    <motion.div
      animate={{
        rotate: open ? 360 : -360,
      }}
      transition={{
        duration: 0.6,
        ease: "easeInOut",
      }}
      className="
        h-12 w-12
        rounded-2xl
        bg-gradient-to-br from-indigo-500 to-violet-600
        flex items-center justify-center
        shadow-md
      "
    >
      <Layers size={22} className="text-white" />
    </motion.div>
  );
}
