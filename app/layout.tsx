import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import "./globals.css";
import ToasterProvider from "@/components/providers/ToasterProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "LearnMate",
  description: "Shaping Minds",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body
          className={`${inter.className} bg-[#030014] overflow-y-scroll overflow-x-hidden  font-semibold text-white`}
        >
          <ToasterProvider />

          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
