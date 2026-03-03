"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function OAuthSuccess() {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;

    console.log("OAuth page loaded");

    const query = new URLSearchParams(window.location.search);
    const token = query.get("token");

    console.log("TOKEN:", token);

    if (token) {
      localStorage.setItem("token", token);
      router.push("/dashboard");
    } else {
      console.log("Token missing");
      router.push("/login");
    }
  }, [mounted]);

  return <p>Logging in...</p>;
}