import type { Metadata } from "next";
import { Jost } from "next/font/google";
import type { ReactNode } from "react";
import "./globals.css";

const jost = Jost({
  subsets: ["latin"],
  variable: "--font-jost",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Currency Calendar",
  description: "Monthly cumulative in-game currency calendar",
};

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="en" className={jost.variable}>
      <body>{children}</body>
    </html>
  );
}
