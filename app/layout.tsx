import type { Metadata } from "next";
import { Geist, Geist_Mono, Poppins } from "next/font/google";
import "./globals.css";
import { Analytics } from "@vercel/analytics/next";
import { Toaster } from "sonner";
import { Suspense } from "react";
import { AppProviders } from "./(buyer)/context/Providers";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  variable: "--font-poppins",
});

export const metadata: Metadata = {
  title: "Hyppin",
  description: "One stop for all your fashion needs.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={poppins.variable}>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        suppressHydrationWarning={true}
      >
        <Analytics />
        <AppProviders>
          <Suspense fallback={<div className="h-20 bg-white" />}>
            {children}
            <Toaster position="top-right" richColors />
          </Suspense>
        </AppProviders>
      </body>
    </html>
  );
}
