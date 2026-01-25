"use client";

import { supabase } from "@/lib/supabase/client";

export default function SignupPage() {
  const handleSignup = async () => {
    const { data, error } = await supabase.auth.signUp({
      email: "Akshat@gmail.com",
      password: "12345678",
    });

    console.log("SIGNUP DATA:", data);
    console.log("SIGNUP ERROR:", error);
  };

  return <button className="border-4 p-2 m-2 rounded bg-green-300" onClick={handleSignup}>Signup</button>;
}
