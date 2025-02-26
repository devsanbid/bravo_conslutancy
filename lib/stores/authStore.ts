"use client";

import { create } from "zustand";
import { getCurrentUser } from "@/controllers/AuthController";

// Use a more generic type to avoid type issues
interface User {
  $id: string;
  name: string;
  profile?: any; // Allow any type for profile
  [key: string]: any; // Allow any other properties
}

interface AuthState {
  user: User | null;
  loading: boolean;
  setUser: (user: User | null) => void;
  setLoading: (loading: boolean) => void;
  checkUser: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  loading: true, // Start with true to prevent flash of unauthenticated content

  setUser: (user) => set({ user }),
  setLoading: (loading) => set({ loading }),
  checkUser: async () => {
    try {
      set({ loading: true });
      const user = await getCurrentUser();
      set({ user });
    } catch (error) {
      console.error("Error checking user:", error);
      set({ user: null });
    } finally {
      set({ loading: false });
    }
  }
}));
