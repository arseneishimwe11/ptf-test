import type { Metadata, Viewport } from "next";
import { Fraunces, Space_Grotesk, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { siteData } from "@/content/site-data";
import { LoaderProvider } from "@/components/providers/LoaderContext";
import SmoothScroll from "@/components/providers/SmoothScroll";
import Preloader from "@/components/shell/Preloader";
import Cursor from "@/components/shell/Cursor";

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  axes: ["opsz"],
});

const grotesk = Space_Grotesk({
  variable: "--font-grotesk",
  subsets: ["latin"],
});

const jetbrains = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: siteData.identity.metaTitle,
  description: siteData.identity.metaDescription,
  openGraph: {
    title: siteData.identity.metaTitle,
    description: siteData.identity.metaDescription,
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#0c0b09",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${fraunces.variable} ${grotesk.variable} ${jetbrains.variable}`}
      >
        <a href="#main" className="skip-link">
          Skip to content
        </a>
        <LoaderProvider>
          <SmoothScroll>
            <Preloader />
            <Cursor />
            {children}
          </SmoothScroll>
        </LoaderProvider>
      </body>
    </html>
  );
}
