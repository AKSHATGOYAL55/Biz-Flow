"use client";

import { useState } from "react";
import { createOrganizationAction } from "./actions";

export default function CreateOrganizationForm() {
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    setLoading(true);
    await createOrganizationAction(name);
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <form
        onSubmit={handleSubmit}
        className="border p-8 rounded-xl w-full max-w-md space-y-4"
      >
        <h1 className="text-xl font-semibold">Create Organization</h1>

        <input
          type="text"
          placeholder="Organization name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full border rounded-lg px-4 py-2"
        />

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-black text-white py-2 rounded-lg"
        >
          {loading ? "Creating..." : "Create"}
        </button>
      </form>
    </div>
  );
}
