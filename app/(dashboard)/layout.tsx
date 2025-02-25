import '@/app/globals.css';
import type { Metadata } from 'next';
import { Livvic } from 'next/font/google';
import { Sidebar } from '@/components/sidebar';
import { MobileNav } from '@/components/mobile-nav';
import ChatWidget from '@/components/chat/ChatWidget';
import EmailVerificationBanner from '@/components/EmailVerificationBanner';

const livvic = Livvic({ 
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
});

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
    <div className={`h-screen flex ${livvic.className}`}>
      <div className="hidden md:block h-full">
        <Sidebar />
      </div>
      <MobileNav />
      <main className="flex-1 h-full overflow-y-auto pb-20 md:pb-0">
        <div className="p-4">
          <EmailVerificationBanner />
        </div>
        {children}
      </main>
      <ChatWidget />
    </div>
  );
}