import { createSupabaseServerClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import CreateOrganizationForm from "./create-organization-form";

export default async function OnboardingPage() {
  const supabase = await createSupabaseServerClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect("/login");

  const { data: org } = await supabase
    .from("organizations")
    .select("id")
    .eq("created_by", user.id)
    .single();

  if (org) redirect("/");

  return <CreateOrganizationForm />;
}
