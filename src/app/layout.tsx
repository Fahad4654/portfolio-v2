import type {Metadata} from 'next';
import './globals.css';
import { Toaster } from "@/components/ui/toaster";
import { Inter, Playfair_Display } from 'next/font/google'

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
    <html lang="en" className="dark scroll-smooth">
      <body className={`${inter.variable} ${playfairDisplay.variable} font-body antialiased`}>
        <Toaster />
        {children}
      </body>
    </html>
  );
}
