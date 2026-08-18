"use client";

import { useEffect, type ReactNode } from "react";
import { useRouter } from "next/navigation";
import { useAdminAuth } from "@/lib/storage";

export default function RequireAuth({ children }: { children: ReactNode }) {
  const { authed } = useAdminAuth();
  const router = useRouter();

  useEffect(() => {
    if (!authed) router.replace("/admin/login");
  }, [authed, router]);

  if (!authed) return null;

  return <>{children}</>;
}