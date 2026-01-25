"use client";

import { supabase } from "@/lib/supabase/client";

export default function LoginPage() {
  const handleLogin = async () => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email: "Akshat@gmail.com",
      password: "12345678",
    });
     console.log("LOGIN DATA:", data);
    console.log("LOGIN ERROR:", error);
    console.log(data.session?.user.email, "Successfully logged in")
  };

  return <button className="border-2 bg-red-300" onClick={handleLogin}>Login</button>;
}


