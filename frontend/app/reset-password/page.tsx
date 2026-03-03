"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useState } from "react";
import { api } from "@/lib/api";

export default function ResetPassword() {
  const params = useSearchParams();
  const router = useRouter();

  const token = params.get("token");

  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleReset = async () => {
    try {
      await api.post("/auth/reset-password", {
        token,
        password,
      });

      setMessage("Password reset successful 🎉");
      setError("");

      setTimeout(() => router.push("/login"), 1500);
    } catch {
      setError("Invalid or expired token");
      setMessage("");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black text-white">
      <div className="p-8 bg-white/5 rounded-xl border border-gray-700 w-87.5">

        <h2 className="text-2xl mb-4 text-center">Reset Password</h2>

        {message && <p className="text-green-400 mb-3">{message}</p>}
        {error && <p className="text-red-400 mb-3">{error}</p>}

        <input
          type="password"
          placeholder="New password"
          className="w-full p-2 mb-3 bg-gray-900 rounded"
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          onClick={handleReset}
          className="w-full bg-green-500 p-2 rounded hover:bg-green-600"
        >
          Reset Password
        </button>
      </div>
    </div>
  );
}