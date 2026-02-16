// import { createServerClient } from "@supabase/ssr";
// import { cookies } from "next/headers";
// import type { CookieOptions } from "@supabase/ssr";

// export async function createSupabaseServerClient() {
//   // ✅ MUST await (Next.js 15 rule)
//   const cookieStore = cookies();

//   return createServerClient(
//     process.env.NEXT_PUBLIC_SUPABASE_URL!,
//     process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
//     {
//       cookies: {
//         getAll() {
//           return cookieStore.getAll();
//         },

//         setAll(cookiesToSet) {
//           cookiesToSet.forEach(({ name, value, options }) => {
//             try {
//               cookieStore.set(name, value, options as CookieOptions);
//             } catch {
//               // Safe ignore (Server Components)
//             }
//           });
//         },
//       },
//     }
//   );
// }

import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

export async function createSupabaseServerClient() {
  const cookieStore = await cookies();

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options)
            );
          } catch {}
        },
      },
    }
  );
}
