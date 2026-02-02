"use client";

import Link from "next/link";
import { useRole } from "@/hooks/use-role";
import { sidebarConfig } from "@/lib/permissions";

export default function Sidebar() {
  const { role } = useRole();

  if (!role) return null;

  return (
    <aside className="w-64 p-4 border-r bg-white">
      <nav className="space-y-2">
        {sidebarConfig[role].map((item) => (
          <Link
            key={item}
            href={`/${item}`}
            className="block rounded px-3 py-2 text-sm hover:bg-gray-100"
          >
            {item}
          </Link>
        ))}
      </nav>
    </aside>
  );
}
