import { Badge } from "@/components/ui/badge";

// export function TaskStatusBadge({ status }: { status: string }) {
//   const map: Record<string, string> = {
//     todo: "bg-gray-200 text-gray-800",
//     in_progress: "bg-blue-100 text-blue-700",
//     done: "bg-green-100 text-green-700",
//   };

//   return (
//     <Badge className={`${map[status]} capitalize`}>
//       {status.replace("_", " ")}
//     </Badge>
//   );
// }


export function TaskStatusBadge({ status }: { status: string }) {
  if (status === "done") {
    return <Badge variant="success">Done</Badge>;
  }

  if (status === "in_progress") {
    return <Badge variant="info">In Progress</Badge>;
  }

  return <Badge variant="default">To Do</Badge>;
}
