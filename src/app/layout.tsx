import "./globals.css";
import Navbar from "@/components/Navbar";
import Providers from "./providers";

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className="bg-[var(--color-bg)] text-[var(--color-foreground)]">
        <Providers>
          <Navbar />
          {/* Push content below navbar */}
          <main className="pt-[var(--nav-height)]">{children}</main>
        </Providers>
      </body>
    </html>
  );
}
