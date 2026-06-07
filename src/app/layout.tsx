import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Abhijeet Verma — Full Stack Developer",
  description: "Building scalable web applications, modern UI experiences, and high-performance digital products.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full">
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
