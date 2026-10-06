import type { Metadata } from "next";
import Link from "next/link";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "CoSpace | Desk Bookings",
  description: "Manage your desk bookings at CoSpace.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`}>
      <body>
        <header className="site-header">
          <nav className="site-nav" aria-label="Main navigation">
            <span className="site-brand">CoSpace</span>
            <Link className="site-nav-link" href="/">
              Dashboard
            </Link>
          </nav>
        </header>
        {children}
      </body>
    </html>
  );
}
