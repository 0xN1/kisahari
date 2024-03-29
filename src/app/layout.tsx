import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import localFont from "next/font/local";
import { ReactNode } from "react";

const commitMono = localFont({
  src: "./commit-mono.woff2",
  variable: "--font-commit-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Kisahari",
  description: "A personal journaling app.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${commitMono.variable}`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <div className="flex flex-col font-mono w-full h-screen selection:bg-lime-500 selection:text-zinc-800">
            <main className="">
              <Background />
              {children}
            </main>
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}

const Background = () => {
  return (
    <>
      {/* <div className="absolute inset-0 -z-10 h-full w-full bg-[linear-gradient(to_right,#777_1px,transparent_1px),linear-gradient(to_bottom,#777_1px,transparent_1px)] bg-[size:60px_60px] pointer-events-none"></div> */}
      <div className="fixed inset-0 -z-10 h-full w-full items-center px-5 py-24 [background:radial-gradient(200%_125%_at_50%_10%,#111_40%,#7d11_55%)] pointer-events-none" />
      <div className="fixed inset-0 h-full w-full bg-transparent bg-[radial-gradient(#333_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none -z-10" />
    </>
  );
};
