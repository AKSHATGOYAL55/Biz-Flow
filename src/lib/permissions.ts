import type { Role } from "@/lib/auth";

export const sidebarConfig: Record<Role, string[]> = {
  ADMIN: ["dashboard","projects","tasks","invoices","team","chat","settings"],
  MEMBER: ["dashboard","projects","tasks","chat"],
  CLIENT: ["dashboard","invoices","chat"],
};


export function canCreateProject(role: string) {
  return role === "admin";
}
