import type { Metadata } from "next";
import { Sometype_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/toaster";
import Navbar from "@/components/navbar";
import Sidebar from "@/components/sidebar";
import localFont from "next/font/local";

const commitMono = localFont({
  src: "./commit-mono.woff2",
  variable: "--font-commit-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Kisahari",
  description: "Kisah hari hari",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${commitMono.variable}`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <div className="flex flex-col font-mono w-full h-screen">
            {/* <Sidebar /> */}
            <main className="">
              {/* <Navbar /> */}
              {children}
            </main>
          </div>
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
