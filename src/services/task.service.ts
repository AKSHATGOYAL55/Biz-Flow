import { createSupabaseServerClient } from "@/lib/supabase/server";
import { getAuthContext } from "@/lib/auth";

interface CreateTaskInput {
  projectId: string;
  title: string;
  description?: string;
  dueDate?: string;
  assignedTo?: string;
}

export async function createTask(input: CreateTaskInput) {
  const supabase = await createSupabaseServerClient();

  const auth = await getAuthContext(supabase);

  if (auth.role === "CLIENT") {
    throw new Error("Clients cannot create tasks");
  }

  const { data, error } = await supabase
    .from("tasks")
    .insert({
      organization_id: auth.organizationId,
      project_id: input.projectId,

      title: input.title,
      description: input.description ?? null,
      due_date: input.dueDate ?? null,

      assigned_to: input.assignedTo ?? null,
      created_by: auth.userId,
    })
    .select()
    .single();

  if (error) {
    throw new Error(error.message);
  }

  return data;
}
