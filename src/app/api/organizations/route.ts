import { NextResponse } from "next/server";
import { createOrganization } from "@/services/organization.service";

export async function POST(req: Request) {
  const { name } = await req.json();

  const org = await createOrganization(name);

  return NextResponse.json(org);
}
