'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function HomePage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) setIsLoggedIn(true);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsLoggedIn(false);
    router.push('/');
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-black via-gray-900 to-black text-white">

      {/* 🔥 NAVBAR */}
      <header className="flex justify-between items-center px-10 py-4 backdrop-blur-md bg-white/5 border-b border-gray-800">
        <h2
          onClick={() => router.push('/')}
          className="text-xl font-bold cursor-pointer text-green-400 hover:text-green-300 transition"
        >
          Auth App
        </h2>

        <div className="space-x-3">
          {!isLoggedIn ? (
            <>
              <button
                onClick={() => router.push('/login')}
                className="px-4 py-2 rounded-lg cursor-pointer bg-green-500 hover:bg-green-600 shadow-xl shadow-green-500/40 transition"
              >
                Login
              </button>

              <button
                onClick={() => router.push('/signup')}
                className="px-4 py-2 rounded-lg cursor-pointer bg-blue-500 hover:bg-blue-600  shadow-xl shadow-blue-500/40 transition"
              >
                Signup
              </button>
            </>
          ) : (
            <>
              <button
                onClick={() => router.push('/dashboard')}
                className="px-4 py-2 rounded-lg cursor-pointer bg-purple-500 hover:bg-purple-600 transition shadow-lg shadow-purple-500/30"
              >
                Dashboard
              </button>

              <button
                onClick={handleLogout}
                className="px-4 py-2 rounded-lg cursor-pointer bg-red-500 hover:bg-red-600 transition shadow-lg shadow-red-500/30"
              >
                Logout
              </button>
            </>
          )}
        </div>
      </header>

      <main className="flex flex-col items-center justify-center h-[80vh] text-center px-4">
        <h1 className="text-5xl font-bold mb-4 bg-linear-to-r from-green-400 to-blue-500 text-transparent bg-clip-text">
          Welcome to User Dashboard
        </h1>

        <p className="text-gray-400 text-lg mb-8">
          JWT Authentication App
         
        </p>

        {!isLoggedIn && (
          <button
            onClick={() => router.push('/login')}
            className="px-6 py-3 rounded-xl bg-green-500 cursor-pointer hover:bg-green-600 text-lg font-semibold shadow-xl shadow-green-500/40 transition"
          >
            Get Started
          </button>
        )}
      </main>

      <footer className="text-center text-gray-500 pb-4">
        © 2026 Auth App. All rights reserved.
      </footer>
    </div>
  );
}