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
          <div className="flex flex-col font-mono w-full h-screen selection:bg-lime-500 selection:text-zinc-800">
            {/* <Sidebar /> */}

            <main className="">
              {/* <Navbar /> */}
              <Background />
              {children}
            </main>
          </div>
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}

const Background = () => {
  return (
    <>
      {/* <div className="absolute inset-0 -z-10 h-full w-full bg-[linear-gradient(to_right,#777_1px,transparent_1px),linear-gradient(to_bottom,#777_1px,transparent_1px)] bg-[size:60px_60px] pointer-events-none"></div> */}
      <div className="absolute inset-0 -z-10 h-full w-full items-center px-5 py-24 [background:radial-gradient(200%_125%_at_50%_10%,#000_40%,#7d15_55%)] pointer-events-none" />
      <div className="absolute inset-0 h-full w-full bg-transparent bg-[radial-gradient(#ddd_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none -z-10" />
    </>
  );
};
