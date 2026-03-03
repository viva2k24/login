'use client';

import { useState } from 'react';
import { api } from '../../lib/api';
import { useRouter } from 'next/navigation';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [isForgot, setIsForgot] = useState(false);
  const [step, setStep] = useState(1);

  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

// LOGIN
const [loginError, setLoginError] = useState('');

// FORGOT PASSWORD
const [forgotError, setForgotError] = useState('');
const [forgotMessage, setForgotMessage] = useState('');

  const router = useRouter();

  // ================= LOGIN =================
const login = async () => {
  try {
    const res = await api.post('/auth/login', { email, password });

    localStorage.setItem('token', res.data.access_token);
    router.push('/dashboard');
  } catch {
    setLoginError('Invalid email or password');
  }
};

  // ================= STEP 1: CHECK EMAIL =================
const checkEmail = async () => {
  try {
    await api.post('/auth/forgot-password', { email });

    setStep(2);
    setForgotError('');
  } catch {
    setForgotError('Email not found');
  }
};

  // ================= STEP 2: RESET PASSWORD =================
const handleReset = async () => {
  if (newPassword !== confirmPassword) {
    setForgotError('Passwords do not match');
    return;
  }

  try {
    await api.post("/auth/reset-password", {
      email,
      password: newPassword,
    });

    setForgotMessage("Password updated successfully 🎉");
    setForgotError('');
  } catch (err) {
    setForgotError("Failed to reset password");
  }
};

  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-black via-gray-900 to-black text-white">

      <div className="w-full max-w-md p-8 rounded-2xl bg-white/5 backdrop-blur-md border border-gray-800 shadow-2xl">

        <h2 className="text-3xl font-bold text-center mb-6 bg-linear-to-r from-green-400 to-blue-500 text-transparent bg-clip-text">
          {isForgot ? "Reset Password" : "Welcome Back"}
        </h2>

        {isForgot && forgotError && (
          <p className="text-red-400 text-center mb-3">{forgotError}</p>
        )}

        {isForgot && forgotMessage && (
          <p className="text-green-400 text-center mb-3">{forgotMessage}</p>
        )}

        {/* ================= LOGIN FORM ================= */}
        {!isForgot && (
          <>
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full p-3 mb-4 rounded-lg bg-gray-900 border border-gray-700"
              onChange={(e) => setEmail(e.target.value)}
            />

            <input
              type="password"
              placeholder="Enter your password"
              className="w-full p-3 mb-4 rounded-lg bg-gray-900 border border-gray-700"
              onChange={(e) => setPassword(e.target.value)}
            />

            <button
              onClick={login}
              className="w-full p-3 mb-3 rounded-lg bg-green-500 hover:bg-green-600"
            >
              Login
            </button>

            <p
              className="text-right text-sm text-blue-400 cursor-pointer"
              onClick={() => setIsForgot(true)}
            >
              Forgot Password?
            </p>

            <div className="flex items-center gap-2 my-4">
              <div className="flex-1 h-px bg-gray-700"></div>
              <span className="text-gray-400 text-sm">OR</span>
              <div className="flex-1 h-px bg-gray-700"></div>
            </div>
          <button
            onClick={() =>
              (window.location.href = 'http://localhost:3000/auth/google')
            }
            className="w-full p-3 rounded-lg bg-white text-black font-semibold hover:bg-gray-200 transition"
          >
            Continue with Google
          </button>

          {/* 🔥 SIGNUP LINK */}
          <p className="text-center text-gray-400 mt-6 text-sm">
            Don’t have an account?{" "}
            <span
              className="text-green-400 cursor-pointer hover:underline"
              onClick={() => router.push("/signup")}
            >
              Signup
            </span>
          </p>
          </>
        )}

        {/* ================= FORGOT PASSWORD ================= */}
        {isForgot && (
          <>
            {/* STEP 1: EMAIL */}
            {step === 1 && (
              <>
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="w-full p-3 mb-4 rounded-lg bg-gray-900 border border-gray-700"
                  onChange={(e) => setEmail(e.target.value)}
                />

                <button
                  onClick={checkEmail}
                  className="w-full p-3 rounded-lg bg-blue-500 hover:bg-blue-600"
                >
                  Verify Email
                </button>
              </>
            )}

            {/* STEP 2: NEW PASSWORD */}
            {step === 2 && (
              <>
                <input
                  type="password"
                  placeholder="New password"
                  className="w-full p-3 mb-3 rounded-lg bg-gray-900 border border-gray-700"
                  onChange={(e) => setNewPassword(e.target.value)}
                />

                <input
                  type="password"
                  placeholder="Confirm password"
                  className="w-full p-3 mb-4 rounded-lg bg-gray-900 border border-gray-700"
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />

                <button
                  onClick={handleReset}
                  className="w-full p-3 rounded-lg bg-green-500 hover:bg-green-600"
                >
                  Reset Password
                </button>
              </>
            )}

            <p
              className="text-center mt-4 text-sm text-gray-400 cursor-pointer"
              onClick={() => {
                setIsForgot(false);
                setStep(1);
              }}
            >
              Back to Login
            </p>
          </>
        )}
      </div>
    </div>
  );
}