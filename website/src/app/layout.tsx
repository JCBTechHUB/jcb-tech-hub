import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: {
    default: "JCB Tech Hub | AI Automation Services",
    template: "%s | JCB Tech Hub",
  },
  description:
    "AI automation services that help businesses work smarter. Workflow automation, AI chatbots, content automation, and custom AI integrations.",
  keywords: [
    "AI automation",
    "workflow automation",
    "AI chatbots",
    "business automation",
    "AI integration",
  ],
  openGraph: {
    title: "JCB Tech Hub | AI Automation Services",
    description:
      "AI automation services that help businesses work smarter, not harder.",
    url: "https://jcbtechhub.com",
    siteName: "JCB Tech Hub",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased font-sans`}
      >
        <Navbar />
        <main className="min-h-screen pt-[73px]">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
