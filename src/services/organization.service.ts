import { createSupabaseServerClient  } from "@/lib/supabase/server";

export async function createOrganization(name: string) {
  const supabase = await createSupabaseServerClient ();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) throw new Error("Unauthorized");

  const slug = name.toLowerCase().replace(/\s+/g, "-");

  // 1️⃣ Create organization
  const { data: org, error } = await supabase
    .from("organizations")
    .insert({ name, slug })
    .select()
    .single();

  if (error) throw error;

  // 2️⃣ Make creator ADMIN
  const { error: memberError } = await supabase
    .from("organization_members")
    .insert({
      organization_id: org.id,
      user_id: user.id,
      role: "admin",
      joined_at: new Date().toISOString(),
    });

  if (memberError) throw memberError;

  return org;
}
