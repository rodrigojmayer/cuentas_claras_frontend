"use client";

import { useSession } from "next-auth/react";
import { useEffect } from "react";

export default function AuthSync() {
  const { data: session } = useSession();

  useEffect(() => {
    if (session?.backendToken) {
      localStorage.setItem("backendToken", session.backendToken);
    }
  }, [session]);

  return null;
}