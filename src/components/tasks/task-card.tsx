import { CalendarDays, User2 } from "lucide-react";
import { TaskStatusBadge } from "./task-status-badge";

interface TaskCardProps {
  task: {
    id: string;
    title: string;
    description?: string;
    status: string;
    due_date?: string;
    assigned_user?: {
      name: string;
      avatar?: string;
    };
  };
}

export function TaskCard({ task }: TaskCardProps) {
  return (
    <div className="rounded-xl border bg-white p-4 shadow-sm hover:shadow-md transition">
      <div className="flex items-start justify-between gap-3">
        <div>
          <h3 className="font-semibold text-gray-900">{task.title}</h3>
          {task.description && (
            <p className="mt-1 text-sm text-gray-500 line-clamp-2">
              {task.description}
            </p>
          )}
        </div>

        <TaskStatusBadge status={task.status} />
      </div>

      <div className="mt-4 flex items-center justify-between text-sm text-gray-500">
        <div className="flex items-center gap-2">
          <User2 className="h-4 w-4" />
          <span>{task.assigned_user?.name ?? "Unassigned"}</span>
        </div>

        {task.due_date && (
          <div className="flex items-center gap-1">
            <CalendarDays className="h-4 w-4" />
            <span>{task.due_date}</span>
          </div>
        )}
      </div>
    </div>
  );
}
