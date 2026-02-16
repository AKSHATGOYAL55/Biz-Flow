import { createOrganization } from "@/services/organization.service";


export async function POST(req: Request) {
  try {
    const { name } = await req.json();
    const org = await createOrganization(name);

    return Response.json(org, { status: 201 });
  } catch (error: any) {
    return Response.json(
      { error: error.message },
      { status: 400 }
    );
  }
}
