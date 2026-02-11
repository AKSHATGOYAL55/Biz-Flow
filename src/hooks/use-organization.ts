import { useEffect, useState } from "react";
import { createSupabaseBrowserClient } from "@/lib/supabase/client";

export type Membership = {
  organization_id: string;
  role: "ADMIN" | "MEMBER" | "CLIENT";
};

export function useOrganization() {
  const [membership, setMembership] = useState<Membership | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const supabase = createSupabaseBrowserClient();

    async function loadOrganization() {
      try {
        const {
          data: { user },
        } = await supabase.auth.getUser();

        if (!user) {
          setMembership(null);
          return;
        }

        const { data, error } = await supabase
          .from("organization_members")
          .select("organization_id, role")
          .eq("user_id", user.id)
          .single();

        if (error && error.code !== "PGRST116") {
  console.error(error);
}

        setMembership(data);
      } catch (error) {
        console.error("useOrganization error:", error);
        setMembership(null);
      } finally {
        setLoading(false);
      }
    }

    loadOrganization();
  }, []);

  return { membership, loading };
}
