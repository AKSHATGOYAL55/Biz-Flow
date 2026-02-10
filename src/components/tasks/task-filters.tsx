import { Button } from "@/components/ui/button";

export function TaskFilters() {
  return (
    <div className="flex flex-wrap gap-2">
      <Button variant="outline" size="sm">All</Button>
      <Button variant="outline" size="sm">Today</Button>
      <Button variant="outline" size="sm">Overdue</Button>
      <Button variant="outline" size="sm">Completed</Button>
    </div>
  );
}
