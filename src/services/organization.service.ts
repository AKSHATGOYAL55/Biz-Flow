// import { createSupabaseServerClient } from "@/lib/supabase/server";
// import { supabaseAdmin } from "@/lib/supabase/admin";

// export async function createOrganization(name: string) {
//   // 1️⃣ normal auth client (sirf user nikalne ke liye)
//   const supabase = await createSupabaseServerClient();

//   const {
//     data: { user },
//   } = await supabase.auth.getUser();

//   if (!user) {
//     throw new Error("Unauthorized");
//   }

//   const slug = name.toLowerCase().replace(/\s+/g, "-");

//   // 2️⃣ organization create → SERVICE ROLE (RLS bypass)
//   const { data: org, error: orgError } = await supabaseAdmin
//     .from("organizations")
//     .insert({ name, slug })
//     .select()
//     .single();

//   if (orgError) throw orgError;

//   // 3️⃣ first admin member → SERVICE ROLE
//   const { error: memberError } = await supabaseAdmin
//     .from("organization_members")
//     .insert({
//       organization_id: org.id,
//       user_id: user.id,
//       role: "admin",
//       joined_at: new Date().toISOString(),
//     });

//   if (memberError) throw memberError;

//   return org;
// }


import { createSupabaseServerClient } from "@/lib/supabase/server";

export async function createOrganization(name: string) {
  const supabase = await createSupabaseServerClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    throw new Error("Unauthorized");
  }

  // const slug = name
  //   .toLowerCase()
  //   .trim()
  //   .replace(/\s+/g, "-")
  //   .replace(/[^\w-]+/g, "");

  // ✅ 1. Create organization (normal client, RLS controlled)
  const { data: org, error: orgError } = await supabase
    .from("organizations")
    .insert({
      name,
      // slug,
      created_by: user.id,
    })
    .select()
    .single();

  if (orgError) throw orgError;

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
