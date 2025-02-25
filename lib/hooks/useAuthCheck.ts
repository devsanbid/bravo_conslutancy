// lib/hooks/useAuthCheck.ts
"use client"; // Ensure this runs only on the client

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/lib/stores/authStore";

export function useAuthCheck(protectedRoute: boolean = false) {
  const { checkUser, user, loading } = useAuthStore();
  const router = useRouter();

  useEffect(() => {
    checkUser();
  }, [checkUser]);

  useEffect(() => {
    if (!loading) {
      if (user) {
        const role = user.profile?.role;
        const currentPath = typeof window !== "undefined" ? window.location.pathname : ""; // Guard against SSR

        if (["/login", "/register", "/forgotpassword"].includes(currentPath)) {
          switch (role) {
            case "student":
              router.push("/dashboard");
              break;
            case "mod":
              router.push("/mod");
              break;
            case "admin":
              router.push("/admin");
              break;
            default:
              router.push("/dashboard");
          }
        }

        if (currentPath === "/") {
          switch (role) {
            case "student":
              router.push("/dashboard");
              break;
            case "mod":
              router.push("/mod");
              break;
            case "admin":
              router.push("/admin");
              break;
          }
        }

        if (protectedRoute) {
          if (currentPath.startsWith("/admin") && role !== "admin") {
            router.push("/dashboard");
          } else if (currentPath.startsWith("/mod") && role !== "mod") {
            router.push("/dashboard");
          } else if (currentPath.startsWith("/dashboard") && role !== "student") {
            router.push(role === "mod" ? "/mod" : "/admin");
          }
        }
      } else if (protectedRoute) {
        const currentPath = typeof window !== "undefined" ? window.location.pathname : "";
        if (
          currentPath.startsWith("/dashboard") ||
          currentPath.startsWith("/mod") ||
          currentPath.startsWith("/admin")
        ) {
          router.push(`/login?redirect=${encodeURIComponent(currentPath)}`);
        }
      }
    }
  }, [loading, user, router, protectedRoute]);

  return { user, loading };
}
