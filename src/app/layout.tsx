import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
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
  title: "Endra Hub | ライントレースカー デジタルツイン",
  description: "Endra Hubは、ライントレースカーのセンサー情報をリアルタイムで可視化・解析するデジタルツインプラットフォームです。",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-slate-50 text-slate-600`}
        style={{
          fontFamily: "'Segoe UI', 'Hiragino Kaku Gothic ProN', 'Hiragino Sans', Meiryo, sans-serif",
          minHeight: '100vh',
        }}
      >
        {children}
        <Footer />
      </body>
    </html>
  );
}
