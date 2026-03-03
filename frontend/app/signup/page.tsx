"use client";

import { useState } from "react";
import { api } from "@/lib/api";
import { useRouter } from "next/navigation";

export default function SignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const router = useRouter();

  const signup = async () => {
    try {
      await api.post("/auth/signup", { email, password });
      setMessage("Signup successful 🎉");
      setError("");

      setTimeout(() => {
        router.push("/login");
      }, 1500);
    } catch {
      setError("Signup failed. Try again.");
      setMessage("");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-black via-gray-500 to-black text-white">

      {/* 🔥 CARD */}
      <div className="w-full max-w-md p-8 rounded-2xl bg-white/5 backdrop-blur-md border border-white-900 shadow-2xl">

        {/* 🔥 TITLE */}
        <h2 className="text-3xl font-bold text-center mb-6 bg-linear-to-r from-blue-400 to-green-400 text-transparent bg-clip-text">
          Create Account
        </h2>

        {/* SUCCESS */}
        {message && (
          <p className="text-green-400 text-sm text-center mb-4">{message}</p>
        )}

        {/* ERROR */}
        {error && (
          <p className="text-red-400 text-sm text-center mb-4">{error}</p>
        )}

        {/* EMAIL */}
        <input
          type="email"
          placeholder="Enter your email"
          className="w-full p-3 mb-4 rounded-lg bg-gray-900 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          onChange={(e) => setEmail(e.target.value)}
        />

        {/* PASSWORD */}
        <input
          type="password"
          placeholder="Enter your password"
          className="w-full p-3 mb-4 rounded-lg bg-gray-900 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          onChange={(e) => setPassword(e.target.value)}
        />

        {/* SIGNUP BUTTON */}
        <button
          onClick={signup}
          className="w-full p-3 mb-4 rounded-lg cursor-pointer bg-blue-500 hover:bg-blue-600 transition font-semibold shadow-lg shadow-blue-500/30"
        >
          Signup
        </button>

        {/* 🔥 DIVIDER */}
        <div className="flex items-center gap-2 mb-4">
          <div className="flex-1 h-px bg-gray-700"></div>
          <span className="text-gray-400 text-sm">OR</span>
          <div className="flex-1 h-px bg-gray-700"></div>
        </div>

        {/* 🔥 GOOGLE BUTTON */}
        <button
          onClick={() =>
            (window.location.href = "http://localhost:3000/auth/google")
          }
          className="w-full p-3 cursor-pointer rounded-lg bg-white text-black font-semibold hover:bg-gray-200 transition"
        >
          Continue with Google
        </button>

        {/* FOOTER */}
        <p className="text-center text-gray-400 mt-6 text-sm">
          Already have an account?{" "}
          <span
            className="text-green-400 cursor-pointer hover:underline"
            onClick={() => router.push("/login")}
          >
            Login
          </span>
        </p>
      </div>
    </div>
  );
}