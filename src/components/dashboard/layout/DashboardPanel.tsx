"use client";

import { useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  LayoutDashboard,
  Users,
  Settings,
  LogOut,
  X,
  Layers,
} from "lucide-react";
import { useRouter } from "next/navigation";

export default function DashboardPanel({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const sidebarRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (
        open &&
        sidebarRef.current &&
        !sidebarRef.current.contains(e.target as Node)
      ) {
        onClose();
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () =>
      document.removeEventListener("mousedown", handleClickOutside);
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* 🔲 Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.4 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black z-40"
          />

          {/* 📌 Sidebar */}
          <motion.aside
            ref={sidebarRef}
            initial={{ x: -320 }}
            animate={{ x: 0 }}
            exit={{ x: -320 }}
            transition={{ type: "spring", stiffness: 260, damping: 28 }}
            className="
              fixed top-0 left-0 h-full w-80
              bg-white border-r shadow-2xl
              z-50 rounded-tr-3xl rounded-br-3xl
            "
          >
            {/* Header */}
            <div className="px-6 py-6 border-b flex items-center justify-between">
              <div className="flex items-center gap-4">
                <BizFlowIcon />
                <div>
                  <h2 className="text-lg font-semibold">BizFlow</h2>
                  <p className="text-xs text-gray-500">
                    Premium Workspace
                  </p>
                </div>
              </div>

              <button onClick={onClose}>
                <X size={18} />
              </button>
            </div>

            {/* Nav */}
            <nav className="p-5 space-y-2">
              <SidebarItem icon={<LayoutDashboard />} label="Overview" />

              <SidebarItem
                icon={<Users />}
                label="Team"
                onClick={() => {
                  onClose();
                  router.push("/team");
                }}
              />

              <SidebarItem
                icon={<Settings />}
                label="Settings"
              />
            </nav>

            {/* Footer */}
            <div className="absolute bottom-6 left-5 right-5">
              <button className="w-full flex items-center gap-3 p-3 rounded-2xl bg-red-600 text-white">
                <LogOut size={18} />
                <span className="font-medium">Logout</span>
              </button>
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}

/* ---------- helpers ---------- */

function SidebarItem({
  icon,
  label,
  onClick,
}: {
  icon: React.ReactNode;
  label: string;
  onClick?: () => void;
}) {
  return (
    <motion.button
      onClick={onClick}
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.97 }}
      className="w-full flex items-center gap-4 px-4 py-3 rounded-2xl hover:bg-zinc-100"
    >
      <div className="text-indigo-600">{icon}</div>
      <span className="font-medium">{label}</span>
    </motion.button>
  );
}

function BizFlowIcon() {
  return (
    <motion.div
      animate={{ rotate: 360 }}
      transition={{ duration: 0.6 }}
      className="h-12 w-12 rounded-2xl bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center"
    >
      <Layers size={22} className="text-white" />
    </motion.div>
  );
}
