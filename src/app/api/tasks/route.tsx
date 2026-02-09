import { NextResponse } from "next/server";
import { createTask } from "@/services/task.service";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const task = await createTask({
      projectId: body.projectId,
      title: body.title,
      description: body.description,
      dueDate: body.dueDate,
      assignedTo: body.assignedTo,
    });

    return NextResponse.json(task);
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message },
      { status: 400 }
    );
  }
}
