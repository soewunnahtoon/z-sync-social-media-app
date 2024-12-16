import "./globals.css";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { ThemeProvider } from "next-themes";
import { SessionProvider } from "next-auth/react";
import { extractRouterConfig } from "uploadthing/server";
import { auth } from "@/auth";
import { NextSSRPlugin } from "@uploadthing/react/next-ssr-plugin";
import { fileRouter } from "@/app/api/uploadthing/core";
import { ReactQueryProvider } from "@/app/react-query-provider";
import { Toaster } from "@/components/ui/toaster";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    template: "Z-SYNC | %s",
    default: "Z-SYNC",
  },
  description: "Z-SYNC Social Media App by SERIOUZ.",
};

const RootLayout = async ({ children }: ChildrenProp) => {
  const session = await auth();

  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <NextSSRPlugin routerConfig={extractRouterConfig(fileRouter)} />

        <SessionProvider session={session}>
          <ReactQueryProvider>
            <ThemeProvider
              attribute="class"
              defaultTheme="system"
              enableSystem
              disableTransitionOnChange
            >
              {children}
            </ThemeProvider>
          </ReactQueryProvider>
        </SessionProvider>

        <Toaster />
      </body>
    </html>
  );
};
export default RootLayout;
