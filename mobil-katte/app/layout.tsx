import type { Metadata } from "next";
import { Inter, Plus_Jakarta_Sans } from "next/font/google";
import { ToastProvider } from "@/components/Toast";
import { CarsProvider } from "@/lib/data-context";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-plus-jakarta",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Mobil Katte — Temukan Mobil Bekas Impianmu | Katalog Mobil Bekas",
  description:
    "Pilihan mobil bekas berkualitas dengan informasi kendaraan yang transparan. Cari, filter harga, dan hubungi Mobil Katte langsung via WhatsApp.",
  openGraph: {
    title: "Mobil Katte — Katalog Mobil Bekas",
    description:
      "Temukan mobil bekas impianmu di Mobil Katte. Pilihan mobil bekas berkualitas dengan informasi kendaraan yang transparan.",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="id" className={`${inter.variable} ${plusJakarta.variable}`}>
      <body>
        <ToastProvider>
          <CarsProvider>{children}</CarsProvider>
        </ToastProvider>
      </body>
    </html>
  );
}