"use client"
import { createContext, useContext, useEffect, useState } from 'react';
import { AuthController } from '@/controllers/AuthController';
import { useRouter } from 'next/navigation';

interface AuthContextType {
  user: any;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string, name: string) => Promise<void>;
  logout: () => Promise<void>;
  forgotPassword: (email: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
  login: async () => {},
  register: async () => {},
  logout: async () => {},
  forgotPassword: async () => {},
});

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    checkUser();
  }, []);

  async function checkUser() {
    try {
      const currentUser = await AuthController.getCurrentUser();
      setUser(currentUser);
    } catch (error) {
      console.error('Error checking user:', error);
    } finally {
      setLoading(false);
    }
  }

  async function login(email: string, password: string) {
    try {
      await AuthController.login(email, password);
      await checkUser();
      router.push('/dashboard');
    } catch (error) {
      throw error;
    }
  }

  async function register(email: string, password: string, name: string) {
    try {
      await AuthController.register(email, password, name);
      await checkUser();
      router.push('/dashboard');
    } catch (error) {
      throw error;
    }
  }

  async function logout() {
    try {
      await AuthController.logout();
      setUser(null);
      router.push('/login');
    } catch (error) {
      throw error;
    }
  }

  async function forgotPassword(email: string) {
    try {
      await AuthController.forgotPassword(email);
    } catch (error) {
      throw error;
    }
  }

  return (
    <AuthContext.Provider value={{
      user,
      loading,
      login,
      register,
      logout,
      forgotPassword,
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};