import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { ThemeProvider } from "@/components/theme-provider";
import { MainNav } from "@/components/main-nav";
import { SupabaseProvider } from "@/lib/supabase/provider";
import { Toaster } from "@/components/ui/toaster";

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Songbird Consulting - Strategic Communications & Advocacy',
  description: 'Empowering voices and amplifying impact through strategic communications and political advocacy solutions.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <SupabaseProvider>
            <MainNav />
            {children}
            <Toaster />
          </SupabaseProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}