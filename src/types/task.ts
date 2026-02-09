export type TaskStatus = "todo" | "in_progress" | "done";

export interface Task {
  id: string;
  organization_id: string;
  project_id: string;

  title: string;
  description?: string;

  status: TaskStatus;
  due_date?: string;

  assigned_to?: string;
  created_by: string;

  created_at: string;
  updated_at: string;
}
