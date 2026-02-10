
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

  return (
    <section className="min-h-screen bg-gray-50">
      {children}
    </section>
  );
}
