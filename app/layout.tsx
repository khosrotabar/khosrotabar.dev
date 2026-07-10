import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://khosrotabar.dev"),

  title: {
    default: "Mohammad Khosrotabar | Full-Stack Developer",
    template: "%s | Mohammad Khosrotabar",
  },

  description:
    "Full-Stack Developer focused on Go Backend, React, Next.js, TypeScript, PostgreSQL, REST APIs, dashboards, internal tools, and SaaS MVPs.",

  keywords: [
    "Mohammad Khosrotabar",
    "Full-Stack Developer",
    "Go Backend Developer",
    "React Developer",
    "Next.js Developer",
    "TypeScript",
    "PostgreSQL",
    "REST APIs",
    "Dashboard Development",
    "SaaS MVP",
    "Web Applications",
    "Backend APIs",
    "Frontend Development",
  ],

  authors: [{ name: "Mohammad Khosrotabar" }],
  creator: "Mohammad Khosrotabar",

  alternates: {
    canonical: "https://khosrotabar.dev",
  },

  openGraph: {
    title: "Mohammad Khosrotabar | Full-Stack Developer",
    description:
      "I build web applications, backend APIs, dashboards, internal tools, and SaaS MVPs using Go, React, Next.js, TypeScript, and PostgreSQL.",
    url: "https://khosrotabar.dev",
    siteName: "Mohammad Khosrotabar",
    type: "website",
    locale: "en_US",
  },

  twitter: {
    card: "summary_large_image",
    title: "Mohammad Khosrotabar | Full-Stack Developer",
    description:
      "Full-Stack Developer focused on Go Backend, React, Next.js, PostgreSQL, APIs, dashboards, and SaaS MVPs.",
  },

  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/apple-icon.png",
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
      className="h-full scroll-smooth antialiased"
      data-scroll-behavior="smooth"
    >
      <body className="min-h-full">{children}</body>
    </html>
  );
}
