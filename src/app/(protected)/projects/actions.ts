"use server";

import { createSupabaseServerClient } from "@/lib/supabase/server";

export type CreateProjectInput = {
  organizationId: string;
  name: string;
  description?: string;
  clientId?: string;
  startDate?: string;
  endDate?: string;
};

export async function createProject(input: CreateProjectInput) {
  const supabase = createSupabaseServerClient();

  const { data, error } = await supabase
    .from("projects")
    .insert({
      organization_id: input.organizationId,
      name: input.name,
      description: input.description ?? null,
      client_id: input.clientId ?? null,
      status: "active",
      start_date: input.startDate ?? null,
      end_date: input.endDate ?? null,
    })
    .select()
    .single();

  if (error) {
    console.error("Create project error:", error);
    throw error;
  }

  return data;
}
