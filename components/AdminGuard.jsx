"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";

export default function AdminGuard({ children }) {
  const { user, loading, isAdmin } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading) {
      if (!user) router.replace("/auth/login");
      else if (!isAdmin) router.replace("/");
    }
  }, [user, loading, isAdmin, router]);

  if (loading) return <p className="p-4">Checking permissions…</p>;
  if (!user || !isAdmin) return null;

  return <>{children}</>;
}
