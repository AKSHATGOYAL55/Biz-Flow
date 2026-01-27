import { redirect } from "next/navigation";
import { createSupabaseServerClient } from "@/lib/supabase/server";

export default async function DashboardPage() {
  const supabase = await createSupabaseServerClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  // Safety check (middleware ke baad bhi)
  if (!user) {
    redirect("/login");
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">
        Dashboard
      </h1>
      <p className="text-gray-600 mt-2">
        Welcome, {user.email}
      </p>
    </div>
  );
}
