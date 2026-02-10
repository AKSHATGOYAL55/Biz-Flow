// services/auth.service.ts
import { createSupabaseServerClient } from "@/lib/supabase/server";

export async function Signup({
  userId,
  fullName,
}: {
  userId: string;
  fullName: string;
}) {
  const supabase = await createSupabaseServerClient();

  // 1️⃣ profile create
  await supabase.from("profiles").insert({
    id: userId,
    full_name: fullName,
  });

  // 2️⃣ org create (future)
  // 3️⃣ role assign
}
