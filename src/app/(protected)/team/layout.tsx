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
  if (!orgId) redirect("/dashboard");

  const role = await getUserRole(orgId, supabase);

  if (role !== "ADMIN") {
    redirect("/dashboard");
  }

  return <>{children}</>;
}
