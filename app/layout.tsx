import type { Metadata } from "next";
import { Inter, Manrope } from "next/font/google";
import "./globals.css";
import { AppProvider } from "@/components/context/app-context";
import { Toaster } from "@/components/ui/sonner";
import { cn } from "@/lib/utils";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "TravelEcosystem — European Tour SaaS",
  description: "Manage bookings, guides, and OTA integrations for your travel agency.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={cn("h-full antialiased", inter.variable, manrope.variable)}
    >
      <body className="font-sans min-h-full flex flex-col bg-bg text-ink">
        <AppProvider>
          {children}
          <Toaster position="top-right" expand={true} richColors />
        </AppProvider>
      </body>
    </html>
  );
}
