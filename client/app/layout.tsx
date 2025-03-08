import type { Metadata } from "next";
import "./globals.css";
import { Inter } from "next/font/google";
// import Providers from "./provider";
import Providers from "./_providers/provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "AItnode",
  description: "Decentralised AI Ecosystem",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head />
      <body className={inter.className}>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
