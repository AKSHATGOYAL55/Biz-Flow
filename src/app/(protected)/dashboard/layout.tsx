"use client";

import { useState } from "react";
import DashboardPanel from "@/components/dashboard/layout/DashboardPanel";

export default function ProtectedLayout({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(true);

  return (
    <>
      <DashboardPanel
        open={open}
        onOpen={() => setOpen(true)}
        onClose={() => setOpen(false)}
      />
      <main className="ml-[80px] md:ml-[280px]">
        {children}
      </main>
    </>
  );
}
