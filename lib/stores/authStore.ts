// lib/stores/authStore.ts
"use client";

import { create } from "zustand";

interface User {
  $id: string;
  email: string;
  name: string;
  profile?: {
    userId: string;
    firstName: string;
    middleName: string;
    lastName: string;
    email: string;
    gender: string;
    dateOfBirth: string;
    phone: string;
    service: string;
    role: "student" | "mod" | "admin";
  };
}

interface AuthState {
  user: User | null;
  loading: boolean;
  setUser: (user: User | null) => void;
  setLoading: (loading: boolean) => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  loading: false, // Start false, set true only during client-side actions

  setUser: (user) => set({ user }),
  setLoading: (loading) => set({ loading }),
}));
