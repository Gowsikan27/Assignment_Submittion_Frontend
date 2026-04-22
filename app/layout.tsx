import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "TaskFlow - Intelligent Task Management Platform",
  description: "Transform your productivity with TaskFlow. The intelligent task management platform designed for modern teams. Create, organize, and track tasks with unprecedented ease.",
  keywords: "task management, productivity, workflow, assignment management, team collaboration",
  authors: [{ name: "TaskFlow Team" }],
  openGraph: {
    title: "TaskFlow - Intelligent Task Management",
    description: "Transform your productivity with our intelligent task management platform",
    type: "website",
    locale: "en_US",
    siteName: "TaskFlow",
  },
  twitter: {
    card: "summary_large_image",
    title: "TaskFlow - Intelligent Task Management",
    description: "Transform your productivity with our intelligent task management platform",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
