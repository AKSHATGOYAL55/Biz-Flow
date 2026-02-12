
// app/(protected)/layout.tsx
import { redirect } from "next/navigation";
import { createSupabaseServerClient } from "@/lib/supabase/server";

export default async function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createSupabaseServerClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  // ❌ Not logged in
  if (!user) {
    redirect("/login");
  }


  const { data: org } = await supabase
    .from("organizations")
    .select("id")
    .eq("created_by", user.id)
    .single();

  if (!org) {
    redirect("/onboarding"); // if no org
  }


  const { data: member } = await supabase
    .from("organization_members")
    .select("organization_id")
    .eq("user_id", user.id)
    .single();

  if (!member) {
    redirect("/organization"); // your page path
  }

  return (
    <section className="min-h-screen bg-gray-50">
      {children}
    </section>
  );
}
