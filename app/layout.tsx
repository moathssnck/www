import type { Metadata } from "next";

import "./globals.css";

export const metadata: Metadata = {
  title: "Pure Water, Pure Life",
  description: "Experience the pristine taste of Arabiv Water - sourced from natural springs and purified to perfection for your health and wellness.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ar">
      <body dir="rtl">{children}</body>
    </html>
  );
}
