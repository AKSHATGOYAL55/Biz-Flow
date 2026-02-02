// import { redirect } from "next/navigation";
// import { createSupabaseServerClient } from "@/lib/supabase/server";

// export default async function DashboardLayout({
//   children,
// }: {
//   children: React.ReactNode;
// }) {
//   const supabase = await createSupabaseServerClient();

//   const {
//     data: { user },
//   } = await supabase.auth.getUser();

//   // ❌ User not logged in
//   if (!user) {
//     redirect("/login");
//   }

//   // app/(protected)/layout.tsx
// const role = await getUserRole(orgId, supabase);

// if (pathname.startsWith("/team") && role !== "ADMIN") {
//   redirect("/dashboard");
// }
//   // ✅ MUST return JSX
//   return (
//     <section className="min-h-screen bg-gray-50">
//       {children}
//     </section>
//   );
// }


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
