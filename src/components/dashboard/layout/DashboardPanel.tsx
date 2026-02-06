"use client";

import { useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  LayoutDashboard,
  Users,
  Settings,
  LogOut,
  ChevronRight,
  FolderKanban,
  FileText,
  MessageSquare,
  Bell,
} from "lucide-react";
import { useRouter } from "next/navigation";
import clsx from "clsx";
import BizFlowIcon from "@/components/common/BizFlowIcon";

/* ================= DASHBOARD PANEL ================= */

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

  /* Outside click (desktop + mobile) */
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
      {/* ================= OVERLAY (MOBILE) ================= */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-40 md:hidden"
            onClick={onClose}
          />
        )}
      </AnimatePresence>

      {/* ================= SIDEBAR ================= */}
      <motion.aside
        ref={sidebarRef}
        initial={false}
        animate={{
          width: open ? 280 : 80,
          x: 0,
        }}
        transition={{ type: "spring", stiffness: 260, damping: 24 }}
        className={clsx(
          "fixed top-0 left-0 z-50 h-full flex flex-col",
          "bg-white/80 backdrop-blur-xl border-r border-zinc-200 shadow-lg",
          "md:translate-x-0",
          open ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        )}
      >
        {/* ================= HEADER ================= */}
        <div
          className={clsx(
            "flex items-center justify-between border-b border-zinc-200",
            open ? "px-5 py-4" : "px-4 py-4"
          )}
        >
          <div className="flex items-center gap-3">
            <BizFlowIcon />
            {open && (
              <span className="text-lg font-semibold tracking-tight">
                BizFlow
              </span>
            )}
          </div>

          {/* 🔁 ROTATING TOGGLE ICON */}
          <motion.button
            onClick={open ? onClose : onOpen}
            animate={{ rotate: open ? 180 : 0 }}
            transition={{ duration: 0.35, ease: "easeInOut" }}
            className="
              h-9 w-9 flex items-center justify-center
              // rounded-lg border
              //  border-zinc-200
              hover:bg-zinc-100 transition
            "
          >
            <ChevronRight size={18} />
          </motion.button>
        </div>

        {/* ================= NAV ================= */}
        <nav className="flex-1 px-2 py-4 space-y-1">
          <SidebarItem
            icon={<LayoutDashboard size={20} />}
            label="Overview"
            open={open}
            onClick={() => router.push("/dashboard")}
          />
          <SidebarItem
            icon={<FolderKanban size={20} />}
            label="Projects"
            open={open}
            onClick={() => router.push("/projects")}
          />
          <SidebarItem
            icon={<FileText size={20} />}
            label="Invoices"
            open={open}
            onClick={() => router.push("/invoices")}
          />
          <SidebarItem
            icon={<Users size={20} />}
            label="Clients & Team"
            open={open}
            onClick={() => router.push("/team")}
          />
          <SidebarItem
            icon={<MessageSquare size={20} />}
            label="Messages"
            open={open}
          />
          <SidebarItem
            icon={<Bell size={20} />}
            label="Notifications"
            open={open}
          />
          <SidebarItem
            icon={<Settings size={20} />}
            label="Settings"
            open={open}
          />
        </nav>

        {/* ================= FOOTER ================= */}
        <div className="p-3 border-t border-zinc-200">
          <button
            className={clsx(
              "w-full flex items-center gap-3 rounded-xl bg-red-600 text-white hover:bg-red-700 transition",
              open
                ? "px-4 py-3"
                : "h-12 w-12 justify-center mx-auto"
            )}
          >
            <LogOut size={18} />
            {open && <span className="font-medium">Logout</span>}
          </button>
        </div>
      </motion.aside>
    </>
  );
}

/* ================= SIDEBAR ITEM ================= */

function SidebarItem({
  icon,
  label,
  open,
  onClick,
}: {
  icon: React.ReactNode;
  label: string;
  open: boolean;
  onClick?: () => void;
}) {
  return (
    <motion.button
      whileHover={{ x: open ? 4 : 0 }}
      onClick={onClick}
      className={clsx(
        "relative w-full flex items-center gap-4 rounded-xl transition-all",
        open
          ? "px-4 py-3 hover:bg-zinc-100"
          : "h-12 w-12 mx-auto justify-center hover:bg-zinc-100"
      )}
    >
      <div className="text-indigo-600">{icon}</div>
      {open && (
        <span className="font-medium text-zinc-800">
          {label}
        </span>
      )}
    </motion.button>
  );
}
