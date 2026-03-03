"use client";

import { useState } from "react";
import { api } from "@/lib/api";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async () => {
    try {
      const res = await api.post("/auth/forgot-password", { email });

      setMessage(res.data.link); // shows reset link
      setError("");
    } catch (err) {
      setError("User not found");
      setMessage("");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black text-white">
      <div className="p-8 bg-white/5 rounded-xl border border-gray-700 w-87.5">

        <h2 className="text-2xl mb-4 text-center">Forgot Password</h2>

        {message && <p className="text-green-400 mb-3 break-all">{message}</p>}
        {error && <p className="text-red-400 mb-3">{error}</p>}

        <input
          placeholder="Enter email"
          className="w-full p-2 mb-3 bg-gray-900 rounded"
          onChange={(e) => setEmail(e.target.value)}
        />

        <button
          onClick={handleSubmit}
          className="w-full bg-blue-500 p-2 rounded hover:bg-blue-600"
        >
          Send Reset Link
        </button>
      </div>
    </div>
  );
}