"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase/client";

export type Membership = {
  organization_id: string;
  role: "ADMIN" | "MEMBER" | "CLIENT";
  status: "active" | "invited";
};

export function useOrganization() {
  const [membership, setMembership] = useState<Membership | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadMembership = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        setMembership(null);
        setLoading(false);
        return;
      }

      const { data, error } = await supabase
        .from("organization_members")
        .select("organization_id, role, status")
        .eq("user_id", user.id)
        .eq("status", "active")
        .limit(1)
        .single();

      if (error) {
        console.error("useOrganization error:", error.message);
        setMembership(null);
      } else {
        setMembership(data);
      }

      setLoading(false);
    };

    loadMembership();
  }, []);

  return {
    membership,
    organizationId: membership?.organization_id ?? null,
    loading,
  };
}
