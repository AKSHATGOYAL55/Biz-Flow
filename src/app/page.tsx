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
  ArrowRight,
} from "lucide-react";

import DashboardPanel from "@/components/dashboard/layout/DashboardPanel";

/* ================= HOME PAGE ================= */

export default function HomePage() {
  const [dashboardOpen, setDashboardOpen] = useState(false);
  const { scrollY } = useScroll();

  const blur = useTransform(scrollY, [0, 80], [0, 12]);
  const opacity = useTransform(scrollY, [0, 80], [0.6, 0.9]);

  const backdropFilter = useMotionTemplate`blur(${blur}px)`;
  const backgroundColor = useMotionTemplate`rgba(255, 255, 255, ${opacity})`;

  return (
    <>
      {/* 🔥 DASHBOARD (SAME PAGE) */}
      <DashboardPanel
        open={dashboardOpen}
        onClose={() => setDashboardOpen(false)}
      />

      <div className="min-h-screen bg-gradient-to-br from-zinc-50 to-zinc-100">
        {/* ================= NAVBAR ================= */}
        <motion.header
          style={{ backdropFilter, backgroundColor }}
          className="sticky top-0 z-30 border-b"
        >
          <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center text-white font-bold shadow">
                B
              </div>
              <span className="text-lg font-semibold tracking-tight">
                BizFlow
              </span>
            </div>

            {/* 👉 SAME PAGE DASHBOARD OPEN */}
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
            <h1 className="text-3xl font-semibold tracking-tight">
              Welcome to BizFlow 👋
            </h1>
            <p className="mt-2 text-zinc-600">
              Set up your workspace and start managing your business.
            </p>
          </motion.div>

          {/* ===== PROGRESS TRACKER ===== */}
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

          {/* ===== QUICK ACTIONS ===== */}
          <section>
            <h2 className="text-xl font-semibold mb-6">
              Quick Actions
            </h2>

            <div className="grid gap-8 md:grid-cols-2">
              {actions.map((a, i) => (
                <motion.div
                  key={i}
                  whileHover={{ y: -4 }}
                  whileTap={{ scale: 0.98 }}
                  className="rounded-3xl bg-white p-8 border shadow-sm flex justify-between items-center"
                >
                  <div>
                    <h3 className="text-lg font-semibold">
                      {a.title}
                    </h3>
                    <p className="mt-1 text-sm text-zinc-600">
                      {a.desc}
                    </p>
                  </div>

                  <button
                    onClick={() => setDashboardOpen(true)}
                    className="h-12 w-12 rounded-2xl bg-indigo-600 text-white flex items-center justify-center shadow"
                  >
                    <ArrowRight size={18} />
                  </button>
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

const actions = [
  {
    title: "Create Organization",
    desc: "Start your business workspace.",
  },
  {
    title: "Create New Project",
    desc: "Add a project and assign tasks.",
  },
  {
    title: "Generate Invoice",
    desc: "Create invoice for a project.",
  },
  {
    title: "Receive Payments",
    desc: "Allow clients to pay online.",
  },
];
