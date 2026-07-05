import type { Metadata, Viewport } from "next";
import { Archivo, Bricolage_Grotesque, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { siteData } from "@/content/site-data";
import { LoaderProvider } from "@/components/providers/LoaderContext";
import SmoothScroll from "@/components/providers/SmoothScroll";
import Preloader from "@/components/shell/Preloader";
import Cursor from "@/components/shell/Cursor";

// Archivo carries UI and body copy at the full variable weight range.
const archivo = Archivo({
  variable: "--font-archivo",
  subsets: ["latin"],
});

// Bricolage Grotesque is the display face for every title (hero + sections).
const bricolage = Bricolage_Grotesque({
  variable: "--font-bricolage",
  subsets: ["latin"],
});

// Mono is promoted to a full instrument-panel layer (indices, readouts, labels).
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
        className={`${archivo.variable} ${bricolage.variable} ${jetbrains.variable}`}
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
