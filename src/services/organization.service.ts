

import { createSupabaseServerClient } from "@/lib/supabase/server";

export async function createOrganization(name: string) {
  const supabase = await createSupabaseServerClient();

//   const {
//   data: sessionData,
// } = await supabase.auth.getSession();

// console.log("SESSION:", sessionData);

  const {
    data: { user },
  } = await supabase.auth.getUser();

  console.log("Server user : ", user)

  if (!user) {
    throw new Error("Unauthorized");
  }

  const slug = name
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-")
    .replace(/[^\w-]+/g, "");

  // ✅ 1. Create organization (normal client, RLS controlled)
  const { data: org, error } = await supabase
    .from("organizations")
    .insert({
      name,
      slug,
      created_by: user.id,
    })
    .select()
    .single();

  if (error) {
    console.error("ORG INSERT ERROR:", error);
    throw error;
  }


  // ✅ 2. Insert first member as ADMIN (MATCH YOUR TYPE)
  const { error: memberError } = await supabase
    .from("organization_members")
    .insert({
      organization_id: org.id,
      user_id: user.id,
      role: "ADMIN", // FIXED
      joined_at: new Date().toISOString(),
    });

  if (memberError) throw memberError;

  return org;
}
