import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { createServerClient } from "@supabase/ssr";

export async function middleware(req: NextRequest) {
  const res = NextResponse.next();

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return req.cookies.get(name)?.value;
        },
        set(name: string, value: string, options: any) {
          res.cookies.set({ name, value, ...options });
        },
        remove(name: string, options: any) {
          res.cookies.set({ name, value: "", ...options });
        },
      },
    }
  );

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const pathname = req.nextUrl.pathname;

  /* ===============================
     1️⃣ ROUTE DEFINITIONS
  =============================== */

  const protectedRoutes = ["/dashboard"];
  const orgOptionalRoutes = ["/create-organization"];
  const authRoutes = ["/login", "/signup"];

  const isProtectedRoute = protectedRoutes.some((r) =>
    pathname.startsWith(r)
  );

  /* ===============================
     2️⃣ LOGIN CHECK
  =============================== */

  if (!user && isProtectedRoute) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  /* ===============================
     3️⃣ ORG CHECK (Day 7 logic)
  =============================== */

  if (user && isProtectedRoute) {
    const { data: membership } = await supabase
      .from("organization_members")
      .select("id")
      .eq("user_id", user.id)
      .limit(1)
      .single();

    const isOrgOptionalRoute = orgOptionalRoutes.some((r) =>
      pathname.startsWith(r)
    );

    if (!membership && !isOrgOptionalRoute) {
      return NextResponse.redirect(
        new URL("/create-organization", req.url)
      );
    }
  }

  /* ===============================
     4️⃣ ALLOW OTHER ROUTES
  =============================== */

  return res;
}

export const config = {
  matcher: ["/dashboard/:path*"],
};
