import { NextResponse } from "next/server";
// import { createOrganization } from "@/services/organization.service";

// export async function POST(req: Request) {
//   try {
//     const { name } = await req.json();

//     if (!name) {
//       return NextResponse.json(
//         { error: "Organization name required" },
//         { status: 400 }
//       );
//     }

//     const org = await createOrganization(name);

//     return NextResponse.json(org);
//   } catch (error: any) {
//     return NextResponse.json(
//       { error: error.message || "Something went wrong" },
//       { status: 500 }
//     );
//   }
// }


import { createSupabaseServerClient } from "@/lib/supabase/server";

export async function POST(req: Request) {
  const supabase = await createSupabaseServerClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  console.log("USER IN API:", user);

  return NextResponse.json({ test: true });
}
