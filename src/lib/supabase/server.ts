import { cookies } from "next/headers";
import { createServerClient } from "@supabase/ssr";

/**
 * Minimal cookie adapter type
 * (Supabase only needs these two)
 */
type CookieStore = {
  getAll: () => { name: string; value: string }[];
  set: (cookie: {
    name: string;
    value: string;
    path?: string;
    domain?: string;
    expires?: Date;
    maxAge?: number;
    sameSite?: "lax" | "strict" | "none";
    secure?: boolean;
  }) => void;
};

export const createSupabaseServerClient = () => {
  const cookieStore = cookies() as unknown as CookieStore;

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach((cookie) => {
            cookieStore.set(cookie);
          });
        },
      },
    }
  );
};
