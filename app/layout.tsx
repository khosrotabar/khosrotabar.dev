import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Mohammad Khosrotabar | Full-Stack Developer",
  description:
    "Portfolio for Mohammad Khosrotabar, a Full-Stack Developer building web applications, Go backend APIs, dashboards, and SaaS MVPs.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full">{children}</body>
    </html>
  );
}
