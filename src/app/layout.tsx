import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from "sonner";

export const metadata: Metadata = {
  title: "BaitGo — Teman Setia Perjalanan Umrohmu",
  description: "Platform lengkap untuk calon jamaah umroh Indonesia. Panduan ibadah step-by-step, bank doa dengan audio, perencanaan biaya, spot foto terbaik di Tanah Suci.",
  keywords: "umroh, panduan umroh, doa umroh, tawaf, sa'i, makkah, madinah",
  openGraph: {
    title: "BaitGo — Teman Setia Perjalanan Umrohmu",
    description: "Dari persiapan sampai pulang — semua ada di BaitGo",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="id" className="h-full">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&family=Amiri:ital,wght@0,400;0,700;1,400&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-full" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
        {children}
        <Toaster position="top-center" richColors />
      </body>
    </html>
  );
}
