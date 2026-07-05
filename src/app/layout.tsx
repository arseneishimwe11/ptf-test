import type { Metadata, Viewport } from "next";
import { Archivo, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { siteData } from "@/content/site-data";
import { LoaderProvider } from "@/components/providers/LoaderContext";
import SmoothScroll from "@/components/providers/SmoothScroll";
import Preloader from "@/components/shell/Preloader";

// One grotesk at the full variable weight range (100–900) carries display,
// UI and body — the observed genre convention (Majd's Archivo, Lyniq's Inter).
const archivo = Archivo({
  variable: "--font-archivo",
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
  themeColor: "#0f0e0c",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${archivo.variable} ${jetbrains.variable}`}>
        <a href="#main" className="skip-link">
          Skip to content
        </a>
        <LoaderProvider>
          <SmoothScroll>
            <Preloader />
            {children}
          </SmoothScroll>
        </LoaderProvider>
      </body>
    </html>
  );
}
