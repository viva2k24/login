"use client";

import { useEffect, useState } from "react";
import { api } from "../../lib/api";
import { useRouter } from "next/navigation";

export default function Dashboard() {
  const [user, setUser] = useState<any>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await api.get("/auth/profile");
        setUser(res.data);
      } catch (err) {
        router.push("/login");
      }
    };

    fetchProfile();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    router.push("/login");
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-black via-gray-500 to-black text-white flex items-center justify-center">

      {/* 🔥 CARD */}
      <div className="w-full max-w-md p-8 rounded-2xl bg-black backdrop-blur-md border border-white-800 shadow-2xl text-center">

        {/* 🔥 TITLE */}
        <h1 className="text-3xl font-bold mb-6 bg-linear-to-r from-green-400 to-blue-500 text-transparent bg-clip-text">
          Dashboard
        </h1>

        {/* 🔥 LOADING */}
        {!user && (
          <p className="text-gray-400 animate-pulse">Loading user data...</p>
        )}

        {/* 🔥 USER INFO */}
        {user && (
          <>
            {/* Avatar */}
            <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-linear-to-r from-green-400 to-blue-500 flex items-center justify-center text-2xl font-bold">
              {user.email?.charAt(0).toUpperCase()}
            </div>

            {/* Details */}
            <p className="mb-2">
              <span className="text-gray-400">User ID:</span>{" "}
              <span className="font-semibold">{user.userId}</span>
            </p>

            <p className="mb-6">
              <span className="text-gray-400">Email:</span>{" "}
              <span className="font-semibold">{user.email}</span>
            </p>

            {/* Buttons */}
            <div className="flex justify-center gap-4">
              <button
                onClick={() => router.push("/")}
                className="px-4 py-2 rounded-lg cursor-pointer  bg-blue-500 hover:bg-blue-600 transition shadow-lg shadow-blue-500/30"
              >
                Home
              </button>

              <button
                onClick={handleLogout}
                className="px-4 py-2 rounded-lg cursor-pointer bg-red-500 hover:bg-red-600 transition shadow-lg shadow-red-500/30"
              >
                Logout
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}