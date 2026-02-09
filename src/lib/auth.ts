// lib/auth.ts
import { SupabaseClient } from "@supabase/supabase-js";

export type Role = "ADMIN" | "MEMBER" | "CLIENT";



/**
 * Get active organization id for logged-in user
 * Picks latest organization if multiple exist
 */
export async function getActiveOrgId(
  supabase: SupabaseClient
): Promise<string | null> {
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return null;

  const { data, error } = await supabase
    .from("organization_members")
    .select("organization_id, created_at")
    .eq("user_id", user.id)
    .order("created_at", { ascending: false })
    .limit(1);

  if (error || !data || data.length === 0) {
    console.log("❌ No org membership found");
    return null;
  }

  return data[0].organization_id;
}


export async function getUserRole(
  orgId: string,
  supabase: SupabaseClient
): Promise<Role> {
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    throw new Error("User not authenticated");
  }

  const { data, error } = await supabase
    .from("organization_members")
    .select("role")
    .eq("organization_id", orgId)
    .eq("user_id", user.id)
    .single();

  if (error || !data) {
    throw new Error("User role not found");
  }

  // ✅ YAHIN DAALNA HAI
  return data.role.toUpperCase() as Role;
}


export async function getAuthContext(supabase: SupabaseClient) {
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    throw new Error("User not authenticated");
  }

  const orgId = await getActiveOrgId(supabase);

  if (!orgId) {
    throw new Error("No active organization");
  }

  const role = await getUserRole(orgId, supabase);

  return {
    userId: user.id,
    organizationId: orgId,
    role,
  };
}



