import { redirect } from "next/navigation";
import { createSupabaseServerClient } from "@/lib/supabase/server";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createSupabaseServerClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  // ❌ User not logged in
  if (!user) {
    redirect("/login");
  }

  // ✅ MUST return JSX
  return (
    <section className="min-h-screen bg-gray-50">
      {children}
    </section>
  );
}
