import { NextResponse } from "next/server";
// import { createProject } from "@/services/project.service";
import { createProject } from "@/services/project.service";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const project = await createProject(body);
    return NextResponse.json(project);
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message },
      { status: 400 }
    );
  }
}
