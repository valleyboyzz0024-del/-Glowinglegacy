import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Glowing Legacy - Leave More Than Memories",
  description: "Record heartfelt video messages and send meaningful gifts to loved ones—delivered exactly when they need them most",
  keywords: ["legacy", "video messages", "memorial", "gifts", "family"],
  authors: [{ name: "Glowing Legacy" }],`n  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"),
  openGraph: {
    title: "Glowing Legacy - Leave More Than Memories",
    description: "Record heartfelt video messages and send meaningful gifts to loved ones",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable}`}>
      <body className="font-body antialiased">{children}</body>
    </html>
  );
}
