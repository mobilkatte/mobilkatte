import type { Metadata } from "next";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import Catalog from "@/components/catalog/Catalog";

export const metadata: Metadata = {
  title: "Katalog Mobil Bekas — Mobil Katte",
  description:
    "Jelajahi katalog mobil bekas lengkap. Cari berdasarkan nama, brand, tipe, filter harga, tahun, dan status pajak.",
};

function num(v: string | string[] | undefined): number | null {
  const s = Array.isArray(v) ? v[0] : v;
  if (!s) return null;
  const n = Number(s);
  return Number.isFinite(n) ? n : null;
}

function str(v: string | string[] | undefined): string {
  return (Array.isArray(v) ? v[0] : v) ?? "";
}

export default async function CatalogPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const sp = await searchParams;

  return (
    <>
      <Navbar />
      <Catalog
        initialParams={{
          keyword: str(sp.keyword),
          min: num(sp.min),
          max: num(sp.max),
          brand: str(sp.brand),
          page: num(sp.page) ?? 1,
        }}
      />
      <Footer />
    </>
  );
}