import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { TKFPageTransitionProvider } from "@/components/thekeenfolks_features/TKFPageTransitionProvider";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Varyon Studios",
  description:
    "Varyon Studios blends AI-first growth strategy, creative media, and performance systems.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} bg-white text-[#111] antialiased`}>
        <TKFPageTransitionProvider>{children}</TKFPageTransitionProvider>
      </body>
    </html>
  );
}
