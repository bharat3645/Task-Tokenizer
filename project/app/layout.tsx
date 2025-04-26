"use client";

import "./globals.css";
import { Inter } from "next/font/google";
import { Providers } from "./providers";
import { MainNav } from "@/components/main-nav";
import { AnimatedBackground } from "@/components/animated-background";
import { AnimatePresence, motion } from "framer-motion";
import { usePathname } from "next/navigation";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} flex min-h-screen flex-col bg-background text-foreground`}>
        <Providers>
          {/* Animated background */}
          <AnimatedBackground className="fixed inset-0 -z-10" />

          {/* Header */}
          <header className="fixed top-0 left-0 z-50 w-full border-b bg-background/80 backdrop-blur">
            <div className="mx-auto flex h-16 w-full max-w-[1440px] items-center px-6">
              <MainNav />
            </div>
          </header>

          {/* Page content */}
          <main className="flex-1 pt-20">
            <AnimatePresence mode="wait">
              <motion.div
                key={pathname}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.2 }}
                className="mx-auto w-full max-w-[1440px] px-6 py-8"
              >
                {children}
              </motion.div>
            </AnimatePresence>
          </main>

          {/* Footer (optional) */}
          {/* <footer className="w-full py-6 text-center text-sm text-muted-foreground">
            © 2025 Your Company. All rights reserved.
          </footer> */}
        </Providers>
      </body>
    </html>
  );
}
