import "./globals.css";
import Navbar from "@/components/Navbar";
import Providers from "./providers";
import { QueryLoadingBoundary } from "./queryloading";

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className="bg-[var(--color-bg)] text-[var(--color-foreground)]">
        <QueryLoadingBoundary>
          <Providers>
            <Navbar />
            <main className="pt-[var(--nav-height)]">{children}</main>
          </Providers>
          {/* Push content below navbar */}
        </QueryLoadingBoundary>
      </body>
    </html>
  );
}
