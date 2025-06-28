import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { AppProvider } from "@/context/AppContext";
import { WatchlistProvider } from "@/context/WatchlistContext";
import { CartProvider } from "@/context/CartContext";
import { Footer } from "@/components/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Vintage Kuwait - Rare & Vintage Goods Marketplace",
  description: "Discover and sell rare vintage treasures in Kuwait. Shop the Eid Edit and explore curated vintage decor, fashion, and collectibles.",
  icons: {
    icon: [
      {
        url: 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><circle cx="50" cy="50" r="50" fill="%23D5A499"/><text x="50" y="50" text-anchor="middle" dy="0.3em" font-family="Arial, sans-serif" font-size="60" font-weight="bold" fill="white">V</text></svg>',
        type: 'image/svg+xml',
      },
    ],
    apple: [
      {
        url: 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><circle cx="50" cy="50" r="50" fill="%23D5A499"/><text x="50" y="50" text-anchor="middle" dy="0.3em" font-family="Arial, sans-serif" font-size="60" font-weight="bold" fill="white">V</text></svg>',
        sizes: '180x180',
        type: 'image/svg+xml',
      },
    ],
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta name="format-detection" content="telephone=no" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
      </head>
      <body className={`${inter.className} bg-background-light dark:bg-background-dark transition-colors duration-200 touch-manipulation`}>
        <AppProvider>
          <WatchlistProvider>
            <CartProvider>
              {children}
              <Footer />
            </CartProvider>
          </WatchlistProvider>
        </AppProvider>
      </body>
    </html>
  );
}
