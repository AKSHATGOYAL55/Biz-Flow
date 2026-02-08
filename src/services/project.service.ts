// CLIENT SAFE FILE
import { createSupabaseBrowserClient } from "@/lib/supabase/client";

export type Project = {
  id: string;
  name: string;
  description: string | null;
  status: string;
};

export async function getProjects(): Promise<Project[]> {
  const supabase = createSupabaseBrowserClient();

  const { data, error } = await supabase
    .from("projects")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Get projects error:", error);
    throw error;
  }

  return data ?? [];
}
