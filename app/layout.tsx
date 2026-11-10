import type { Metadata, Viewport } from "next";
import { Inter, JetBrains_Mono, Space_Grotesk } from "next/font/google";
import { ChatWidget } from "./components/chrome/chat-widget";
import { CustomCursor } from "./components/chrome/custom-cursor";
import { GradientField } from "./components/chrome/gradient-field";
import { Preloader } from "./components/chrome/preloader";
import { ScrollProgress } from "./components/chrome/scroll-progress";
import { SiteFooter } from "./components/chrome/site-footer";
import { SiteHeader } from "./components/chrome/site-header";
import { SmoothScrollProvider } from "./components/chrome/smooth-scroll";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });
const spaceGrotesk = Space_Grotesk({ subsets: ["latin"], variable: "--font-space-grotesk", display: "swap" });
const jetbrainsMono = JetBrains_Mono({ subsets: ["latin"], variable: "--font-jetbrains-mono", display: "swap" });

export const viewport: Viewport = {
  themeColor: "#0b0e10",
  colorScheme: "dark",
};

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

  // Versioned URLs bust browsers' long-lived favicon cache after the logo change.
  icons: {
    icon: [
      { url: "/logo.svg?v=2", type: "image/svg+xml" },
      { url: "/favicon.ico?v=2", sizes: "any" },
    ],
    shortcut: "/favicon.ico?v=2",
    apple: "/apple-icon.png?v=2",
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
      suppressHydrationWarning
      className={`dark preload ${inter.variable} ${spaceGrotesk.variable} ${jetbrainsMono.variable}`}
    >
      <body className="min-h-full font-sans antialiased">
        <noscript>
          <style>{`html.preload{overflow:auto}html.preload body::before{display:none}`}</style>
        </noscript>
        <SmoothScrollProvider>
          <GradientField />
          <ScrollProgress />
          <CustomCursor />
          <Preloader />
          <div className="relative z-10">
            <SiteHeader />
            {children}
            <SiteFooter />
            <ChatWidget />
          </div>
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
