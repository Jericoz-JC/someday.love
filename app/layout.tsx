import type { Metadata, Viewport } from "next";
import { Outfit } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import { Toaster } from "@/components/ui/sonner";
import "./globals.css";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "SomeDay.love - Wedding Vision Dating",
  description: "Find your forever person through wedding vision compatibility. Psychometric matching based on financial alignment, social style, and aesthetic preferences.",
  keywords: ["dating", "wedding", "compatibility", "relationships", "matching"],
  authors: [{ name: "SomeDay.love" }],
  openGraph: {
    title: "SomeDay.love - Wedding Vision Dating",
    description: "Find your forever person through wedding vision compatibility",
    type: "website",
    locale: "en_US",
    siteName: "SomeDay.love",
  },
  twitter: {
    card: "summary_large_image",
    title: "SomeDay.love - Wedding Vision Dating",
    description: "Find your forever person through wedding vision compatibility",
  },
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "SomeDay",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#0a0a0a" },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en" suppressHydrationWarning>
        <body className={`${outfit.variable} font-sans antialiased`}>
          {children}
          <Toaster position="top-center" />
        </body>
      </html>
    </ClerkProvider>
  );
}
