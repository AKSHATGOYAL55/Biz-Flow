import { Signup } from "@/services/auth.service";
// import { completeSignup } from "@/services/auth.service";

export async function POST(req: Request) {
  const body = await req.json();
  await Signup(body);
  return Response.json({ success: true });
}