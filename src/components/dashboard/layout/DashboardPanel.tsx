"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import {
  LayoutDashboard,
  Users,
  Settings,
  LogOut,
  X,
  ChevronRight,
} from "lucide-react";
import { useRouter } from "next/navigation";
import clsx from "clsx";
import BizFlowIcon from "@/components/common/BizFlowIcon";

export default function DashboardPanel({
  open,
  onClose,
  onOpen,
}: {
  open: boolean;
  onClose: () => void;
  onOpen: () => void;
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
    <>
      {open && (
        <motion.div
          className="fixed inset-0 bg-black/40 z-40"
        />
      )}

      <motion.aside
        ref={sidebarRef}
        animate={{ width: open ? 300 : 80 }}
        transition={{ type: "spring", stiffness: 260, damping: 26 }}
        className="
          fixed top-0 left-0 h-full
          bg-white border-r border-zinc-200
          z-50 flex flex-col
        "
      >
        {/* HEADER */}
        <div
          className={clsx(
            "flex items-center justify-between border-b border-zinc-200 py-5",
            open ? "px-5" : "px-4"
          )}
        >
          <div className="flex items-center gap-3">
            <BizFlowIcon />
            {open && (
              <span className="text-lg font-semibold">
                BizFlow
              </span>
            )}
          </div>

          {open ? (
            <button onClick={onClose}>
              <X size={18} />
            </button>
          ) : (
            <button onClick={onOpen}>
              <ChevronRight size={18} />
            </button>
          )}
        </div>

        {/* NAV */}
        <nav className="flex-1 px-2 py-4 space-y-1">
          <SidebarItem icon={<LayoutDashboard />} label="Overview" open={open} />
          <SidebarItem
            icon={<Users />}
            label="Team"
            open={open}
            onClick={() => router.push("/team")}
          />
          <SidebarItem icon={<Settings />} label="Settings" open={open} />
        </nav>

        {/* FOOTER */}
        <div className="p-3 border-t border-zinc-200">
          <button
            className={clsx(
              "w-full flex items-center gap-3 rounded-xl text-white bg-red-600",
              open
                ? "px-4 py-3"
                : "h-12 w-12 justify-center mx-auto"
            )}
          >
            <LogOut size={18} />
            {open && <span>Logout</span>}
          </button>
        </div>
      </motion.aside>
    </>
  );
}

function SidebarItem({
  icon,
  label,
  open,
  onClick,
}: any) {
  return (
    <motion.button
      onClick={onClick}
      className={clsx(
        "group relative w-full flex items-center gap-4 rounded-xl transition",
        open
          ? "px-4 py-3 hover:bg-zinc-100"
          : "h-12 w-12 mx-auto justify-center hover:bg-zinc-100"
      )}
    >
      <div className="text-indigo-600">{icon}</div>
      {open && <span>{label}</span>}
    </motion.button>
  );
}
