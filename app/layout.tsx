import './globals.css';
import type { Metadata } from 'next';
import { AuthProvider } from '@/contexts/AuthContext';
import { Toaster } from '@/components/ui/sonner';



export const metadata: Metadata = {
  title: 'Learning Dashboard',
  description: 'Track your learning progress',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>
          {children}
          <Toaster position="top-center" expand={true} richColors />
        </AuthProvider>
      </body>
    </html>
  );
}