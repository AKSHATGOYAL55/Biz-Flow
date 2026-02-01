"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function CreateOrganizationPage() {
  const [name, setName] = useState("");
  const router = useRouter();

  const handleCreate = async () => {
    const res = await fetch("/api/organizations", {
      method: "POST",
      body: JSON.stringify({ name }),
    });

    if (res.ok) {
      router.push("/dashboard");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-24">
      <h1 className="text-2xl font-bold mb-4">Create Organization</h1>

      <input
        className="border p-2 w-full"
        placeholder="Company name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <button
        onClick={handleCreate}
        className="mt-4 w-full bg-black text-white py-2"
      >
        Create
      </button>
    </div>
  );
}
