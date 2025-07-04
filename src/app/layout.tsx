import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import Header from "@/components/shared/Header";
import Footer from '@/components/shared/Footer';
import "../styles/global.css";

const geistSans = Geist({
  subsets: ["latin"],
  variable: "--font-geist-sans",
});

const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
});

export const metadata: Metadata = {
  title: "NeuroSync",
  description: "Your AI Mental Health Companion",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en" suppressHydrationWarning>
        <body
          className={`${geistSans.variable} ${geistMono.variable} bg-bgMain text-text font-sans antialiased overflow-x-hidden`}
        >
          <>
            <Header />
            <main className="min-h-screen w-full">{children}</main>
            <Footer />
          </>
        </body>
      </html>
    </ClerkProvider>
  );
}
