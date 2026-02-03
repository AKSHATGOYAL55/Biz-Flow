import { redirect } from "next/navigation";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { getUserRole, getActiveOrgId } from "@/lib/auth";

export default async function TeamLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createSupabaseServerClient();

  const orgId = await getActiveOrgId(supabase);
  console.log("🟡 orgId:", orgId);

  if (!orgId) redirect("/");

  const role = await getUserRole(orgId, supabase);
  console.log("🟡 role:", role);

  if (role !== "ADMIN") redirect("/");

  return <>{children}</>;
}

