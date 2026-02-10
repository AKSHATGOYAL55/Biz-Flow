import { TaskCard } from "./task-card";

export function TaskList({ tasks }: { tasks: any[] }) {
  if (tasks.length === 0) {
    return (
      <div className="rounded-xl border bg-muted/30 p-10 text-center text-sm text-gray-500">
        No tasks found. Create your first task 🚀
      </div>
    );
  }

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {tasks.map((task) => (
        <TaskCard key={task.id} task={task} />
      ))}
    </div>
  );
}
