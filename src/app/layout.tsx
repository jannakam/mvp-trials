import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { AppProvider } from "@/context/AppContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Vintage Kuwait - Rare & Vintage Goods Marketplace",
  description: "Discover and sell rare vintage treasures in Kuwait. Shop the Eid Edit and explore curated vintage decor, fashion, and collectibles.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} bg-background-light dark:bg-background-dark transition-colors duration-200`}>
        <AppProvider>
          {children}
        </AppProvider>
      </body>
    </html>
  );
}
