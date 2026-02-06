"use client";

import { useState } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useMotionTemplate,
} from "framer-motion";
import {
  Building2,
  Users,
  Layers,
  FileText,
  CheckCircle2,
  TrendingUp,
  IndianRupee,
} from "lucide-react";

import DashboardPanel from "@/components/dashboard/layout/DashboardPanel";

/* ================= HOME PAGE ================= */

export default function HomePage() {
  const [dashboardOpen, setDashboardOpen] = useState(false);
  const { scrollY } = useScroll();

  const blur = useTransform(scrollY, [0, 80], [0, 12]);
  const opacity = useTransform(scrollY, [0, 80], [0.6, 0.9]);

  const backdropFilter = useMotionTemplate`blur(${blur}px)`;
  const backgroundColor =
    useMotionTemplate`rgba(255, 255, 255, ${opacity})`;

  return (
    <>
      {/* 🔥 DASHBOARD */}
      <DashboardPanel
        open={dashboardOpen}
        onOpen={() => setDashboardOpen(true)}
        onClose={() => setDashboardOpen(false)}
      />

      <div
        className={`
          min-h-screen bg-gradient-to-br from-zinc-50 to-zinc-100
          transition-all duration-300
          ${dashboardOpen ? "pl-[300px]" : "pl-[80px]"}
        `}
      >
        {/* ================= NAVBAR ================= */}
        <motion.header
          style={{ backdropFilter, backgroundColor }}
          className="sticky top-0 z-30 border-b border-zinc-200"
        >
          <div className="max-w-7xl mx-auto px-6 py-5 flex items-center justify-between">
            <span className="text-lg font-semibold tracking-tight">
              BizFlow
            </span>

            <button
              onClick={() => setDashboardOpen(true)}
              className="px-4 py-2 rounded-xl bg-indigo-600 text-white font-medium hover:bg-indigo-700 transition"
            >
              Open Dashboard
            </button>
          </div>
        </motion.header>

        {/* ================= MAIN ================= */}
        <main className="max-w-7xl mx-auto px-6 py-12 space-y-20">
          {/* ===== WELCOME ===== */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            {/* <h1 className="text-3xl font-semibold tracking-tight">
              Welcome to BizFlow 👋
            </h1>
            <p className="mt-2 text-zinc-600">
              Track your revenue and complete workspace setup.
            </p> */}
          </motion.div>

          {/* ===== 💰 REVENUE OVERVIEW ===== */}
          <section className="rounded-3xl bg-white p-8 border shadow-sm">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-xl font-semibold">
                Revenue Overview
              </h2>
              <TrendingUp className="text-indigo-600" />
            </div>

            <div className="grid gap-6 md:grid-cols-3">
              {revenueStats.map((stat, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="rounded-2xl border bg-zinc-50 p-6 hover:shadow-md transition"
                >
                  <div className="flex items-center justify-between">
                    <div className="h-12 w-12 rounded-xl bg-indigo-100 text-indigo-600 flex items-center justify-center">
                      <IndianRupee size={20} />
                    </div>
                    <span className="text-sm text-zinc-500">
                      {stat.label}
                    </span>
                  </div>

                  <h3 className="mt-4 text-2xl font-bold">
                    ₹ {stat.amount}
                  </h3>

                  {stat.progress && (
                    <div className="mt-4 h-2 w-full bg-zinc-200 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: stat.progress }}
                        transition={{ duration: 0.6 }}
                        className="h-full bg-gradient-to-r from-indigo-500 to-violet-600"
                      />
                    </div>
                  )}
                </motion.div>
              ))}
            </div>
          </section>

          {/* ===== WORKSPACE SETUP PROGRESS ===== */}
          <section className="rounded-3xl bg-white p-8 border shadow-sm">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold">
                Workspace Setup Progress
              </h2>
              <span className="text-sm text-zinc-500">
                4 / 22 completed
              </span>
            </div>

            <div className="h-3 w-full rounded-full bg-zinc-100 overflow-hidden mb-10">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: "25%" }}
                transition={{ duration: 0.6 }}
                className="h-full rounded-full bg-gradient-to-r from-indigo-500 to-violet-600"
              />
            </div>

            <div className="grid gap-6 md:grid-cols-4">
              {steps.map((step, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="rounded-2xl bg-zinc-50 p-5 border hover:shadow-md transition"
                >
                  <div className="flex items-center justify-between">
                    <div className="h-10 w-10 rounded-xl bg-indigo-100 text-indigo-600 flex items-center justify-center">
                      {step.icon}
                    </div>
                    {step.done && (
                      <CheckCircle2
                        size={18}
                        className="text-emerald-500"
                      />
                    )}
                  </div>

                  <h3 className="mt-4 font-semibold">
                    {step.title}
                  </h3>
                  <p className="mt-1 text-sm text-zinc-600">
                    {step.desc}
                  </p>
                </motion.div>
              ))}
            </div>
          </section>
        </main>
      </div>
    </>
  );
}

/* ================= DATA ================= */

const revenueStats = [
  {
    label: "This Month",
    amount: "1,20,000",
    progress: "65%",
  },
  {
    label: "This Year",
    amount: "9,80,000",
    progress: "48%",
  },
  {
    label: "All Time",
    amount: "15,40,000",
  },
];

const steps = [
  {
    title: "Create Organization",
    desc: "Set up your company workspace.",
    icon: <Building2 size={20} />,
    done: false,
  },
  {
    title: "Invite Team / Clients",
    desc: "Add members with role-based access.",
    icon: <Users size={20} />,
    done: false,
  },
  {
    title: "Create Projects",
    desc: "Organize work into projects.",
    icon: <Layers size={20} />,
    done: false,
  },
  {
    title: "Generate Invoices",
    desc: "Create invoices per project.",
    icon: <FileText size={20} />,
    done: false,
  },
];
