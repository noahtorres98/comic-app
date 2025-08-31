import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className="bg-[var(--color-bg)] text-[var(--color-foreground)]">
        {/* Navbar always visible */}
        <Navbar />

        {/* Push content below navbar */}
        <main className="pt-[var(--nav-height)]">{children}</main>
      </body>
    </html>
  );
}
