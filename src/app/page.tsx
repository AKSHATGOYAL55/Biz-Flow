"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
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
  Clock,
  ShieldCheck,
} from "lucide-react";

import DashboardPanel from "@/components/dashboard/layout/DashboardPanel";

/* ================= HOME PAGE ================= */

export default function HomePage() {
  const [dashboardOpen, setDashboardOpen] = useState(false);
  const router = useRouter();

  const { scrollY } = useScroll();
  const blur = useTransform(scrollY, [0, 80], [0, 12]);
  const opacity = useTransform(scrollY, [0, 80], [0.6, 0.9]);

  const backdropFilter = useMotionTemplate`blur(${blur}px)`;
  const backgroundColor = useMotionTemplate`rgba(255, 255, 255, ${opacity})`;

  return (
    <>
      <DashboardPanel
        open={dashboardOpen}
        onClose={() => setDashboardOpen(false)}
      />

      <div className="min-h-screen bg-gradient-to-br from-zinc-50 to-zinc-100">
        {/* NAVBAR */}
        <motion.header
          style={{ backdropFilter, backgroundColor }}
          className="sticky top-0 z-30 border-b"
        >
          <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center text-white font-bold shadow">
                B
              </div>
              <span className="text-lg font-semibold">BizFlow</span>
            </div>

            <button
              onClick={() => setDashboardOpen(true)}
              className="px-4 py-2 rounded-xl bg-indigo-600 text-white hover:bg-indigo-700 transition"
            >
              Open Dashboard
            </button>
          </div>
        </motion.header>

        {/* MAIN */}
        <main className="max-w-7xl mx-auto px-6 py-12 space-y-20">
          {/* WELCOME */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <h1 className="text-3xl font-semibold">Welcome to BizFlow 👋</h1>
            <p className="mt-2 text-zinc-600">
              One place to manage your organization, projects and payments.
            </p>
          </motion.div>

          {/* PROGRESS */}
          <section className="rounded-3xl bg-white p-8 border shadow-sm">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold">Workspace Setup</h2>
              <span className="text-sm text-zinc-500">4 / 22 completed</span>
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
                  onClick={() => router.push(step.path)}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="cursor-pointer rounded-2xl bg-zinc-50 p-5 border hover:bg-white hover:shadow-md transition"
                >
                  <div className="flex items-center justify-between">
                    <div className="h-10 w-10 rounded-xl bg-indigo-100 text-indigo-600 flex items-center justify-center">
                      {step.icon}
                    </div>
                    {step.done && (
                      <CheckCircle2 size={18} className="text-emerald-500" />
                    )}
                  </div>

                  <h3 className="mt-4 font-semibold">{step.title}</h3>
                  <p className="mt-1 text-sm text-zinc-600">{step.desc}</p>
                </motion.div>
              ))}
            </div>
          </section>

          {/* ===== NEW RICH SECTION (REPLACED QUICK ACTIONS) ===== */}
          <section className="grid gap-8 md:grid-cols-3">
            {insights.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
                className="rounded-3xl bg-white p-8 border shadow-sm hover:shadow-md transition"
              >
                <div className="h-12 w-12 rounded-2xl bg-indigo-100 text-indigo-600 flex items-center justify-center mb-6">
                  {item.icon}
                </div>

                <h3 className="text-lg font-semibold">{item.title}</h3>
                <p className="mt-2 text-sm text-zinc-600 leading-relaxed">
                  {item.desc}
                </p>

                <div className="mt-6 text-sm font-medium text-indigo-600">
                  {item.meta}
                </div>
              </motion.div>
            ))}
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
    path: "/organization",
    done: false,
  },
  {
    title: "Invite Team",
    desc: "Add members with roles.",
    icon: <Users size={20} />,
    path: "/team",
    done: false,
  },
  {
    title: "Create Projects",
    desc: "Manage work efficiently.",
    icon: <Layers size={20} />,
    path: "/projects/create",
    done: false,
  },
  {
    title: "Generate Invoices",
    desc: "Bill clients professionally.",
    icon: <FileText size={20} />,
    path: "/invoices/create",
    done: false,
  },
];

const insights = [
  {
    title: "Business Growth",
    desc: "Track how your organization scales with projects and revenue insights.",
    icon: <TrendingUp size={22} />,
    meta: "Updated in real time",
  },
  {
    title: "Time & Productivity",
    desc: "Understand where your team spends time and improve delivery speed.",
    icon: <Clock size={22} />,
    meta: "Weekly analytics",
  },
  {
    title: "Secure & Reliable",
    desc: "Enterprise-grade security to keep your data protected at all times.",
    icon: <ShieldCheck size={22} />,
    meta: "SOC-ready infrastructure",
  },
];
