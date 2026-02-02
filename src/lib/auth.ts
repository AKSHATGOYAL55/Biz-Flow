// lib/auth.ts
import { SupabaseClient } from "@supabase/supabase-js";

export type Role = "ADMIN" | "MEMBER" | "CLIENT";

/**
 * Get active organization id for logged-in user
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
    .select("organization_id")
    .eq("user_id", user.id)
    .eq("status", "active")
    .limit(1)
    .single();

  if (error || !data) return null;

  return data.organization_id;
}

/**
 * Get role of current user inside an organization
 */
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

  return data.role as Role;
}
