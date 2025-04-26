"use client";

import { ThemeProvider } from "next-themes";
import { Toaster } from "@/components/ui/toaster";
import { WalletProvider } from "../context/WalletContext";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <WalletProvider>
      <ThemeProvider attribute="class" defaultTheme="dark">
        {children}
        <Toaster />
      </ThemeProvider>
    </WalletProvider>
  );
}
