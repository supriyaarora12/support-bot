import type { Metadata } from "next";
import { DM_Sans, Fraunces } from "next/font/google";
import { MotionRoot } from "@/components/animation/MotionRoot";
import "./globals.css";

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
});

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Support Bot — Workforce support assistant",
  description:
    "AI Support Bot answers account, card redemption, and wallet questions from your docs, checks real account details, and hands off to a human when needed.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${dmSans.variable} ${fraunces.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col bg-page font-sans text-foreground">
        <MotionRoot>{children}</MotionRoot>
      </body>
    </html>
  );
}
