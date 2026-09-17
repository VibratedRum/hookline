import type { Metadata } from "next";
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
  title: "Hookline — Score & rewrite titles that get clicks | Lumen Labs",
  description:
    "Paste a stream or YouTube title. Get a 0–100 score and 3 sharper rewrites. Free 3/day. Built for creators who care about CTR.",
  openGraph: {
    title: "Stop losing clicks to a weak title.",
    description:
      "Score + rewrite stream/YouTube titles and hooks in seconds. Join the Hookline waitlist.",
    siteName: "Hookline",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Stop losing clicks to a weak title.",
    description:
      "Score + rewrite stream/YouTube titles and hooks in seconds. Join the Hookline waitlist.",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-zinc-950 text-zinc-100">{children}</body>
    </html>
  );
}
