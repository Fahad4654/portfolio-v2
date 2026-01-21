import type {Metadata} from 'next';
import './globals.css';
import { Toaster } from "@/components/ui/toaster";
import { Inter, Playfair_Display } from 'next/font/google'
import { ThemeProvider } from '@/components/theme-provider';
import { AuthProvider } from '@/context/AuthContext';
import { InfoProvider } from '@/context/InfoContext';

export const metadata: Metadata = {
  title: 'Fahad Kabir | DevOps Engineer',
  description: 'Your Personal & Professional Space',
};

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
})

const playfairDisplay = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair-display',
})

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} ${playfairDisplay.variable} font-body antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem={false}
          disableTransitionOnChange
        >
          <InfoProvider>
            <AuthProvider>
              <Toaster />
              {children}
            </AuthProvider>
          </InfoProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
