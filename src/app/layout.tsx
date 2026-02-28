import type { Metadata } from "next";
import { Open_Sans } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/Navbar";
import { Chatbot } from "@/components/Chatbot";
import config from "../../clinic-config.json";

const openSans = Open_Sans({ subsets: ["latin"], variable: "--font-open-sans" });
// Note: "Brisbane" is typically a custom premium font. We'll set it as a standard CSS variable 
// to be loaded locally or via font-face, using a standard sans-serif fallback in Tailwind.

export const metadata: Metadata = {
  title: config.business.name,
  description: config.business.tagline,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${openSans.variable} font-sans antialiased min-h-screen flex flex-col`}>
        <Navbar />
        <main className="flex-1">{children}</main>
        <footer className="py-6 text-center text-sm text-muted-foreground border-t">
          © {new Date().getFullYear()} {config.business.name}. All rights reserved.
        </footer>
        <Chatbot />
      </body>
    </html>
  );
}
