import type { Car } from "./types";

export const WA_NUMBER = "6281234567890";

// Referensi brand default. Sumber data utama brand ada di tabel `brands` (Supabase).
export const BRANDS: string[] = [
  "Audi", "BMW", "BYD", "Chery", "Chevrolet", "Daihatsu", "Ford", "Honda", "Hyundai", "Isuzu", "Jeep", "Kia", "Lexus",
  "Mazda", "Mercedes-Benz", "MG", "Mini", "Mitsubishi", "Nissan",
  "Porsche", "Subaru", "Suzuki", "Toyota", "Wuling",
];

export function formatRupiah(angka: number): string {
  return "Rp " + Math.round(angka).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}

export function formatShortPrice(angka: number): string {
  if (angka >= 1000000000) return (angka / 1000000000).toFixed(1).replace(".0", "") + " M";
  if (angka >= 1000000) return (angka / 1000000).toFixed(1).replace(".0", "") + " Juta";
  return formatRupiah(angka);
}

export function slugify(text: string): string {
  return text.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}

export function findCarBySlug(cars: Car[], slug: string): Car | undefined {
  return cars.find((c) => c.slug === slug);
}

export function findCarById(cars: Car[], id: number): Car | undefined {
  return cars.find((c) => c.id === id);
}

export function taxBadgeClass(status: string): string {
  return status === "Aktif" ? "badge--tax-active" : "badge--tax-inactive";
}

export function statusBadgeClass(status: string): string {
  switch (status) {
    case "Tersedia": return "badge--status-tersedia";
    case "Terjual": return "badge--status-terjual";
    case "Dipesan": return "badge--status-dipesan";
    default: return "badge--status-nonaktif";
  }
}

export function carStatusLabel(status: string): string {
  return status === "Terjual" ? "TERJUAL" : "";
}

export function photoFallback(): string {
  return "data:image/svg+xml;charset=UTF-8," + encodeURIComponent(
    '<svg xmlns="http://www.w3.org/2000/svg" width="800" height="600"><defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#1a1a1d"/><stop offset="1" stop-color="#26262a"/></linearGradient></defs><rect width="800" height="600" fill="url(#g)"/><text x="400" y="330" font-family="Arial" font-size="34" fill="rgba(255,255,255,.9)" text-anchor="middle">MOBIL KATTE</text></svg>'
  );
}

export function waLink(car: Car, waNumber?: string, text?: string): string {
  const no = waNumber || WA_NUMBER;
  const msg = text || "Halo Mobil Katte, saya tertarik dengan " + car.brand + " " + car.name +
    " " + car.type + " Tahun " + car.year + " dengan harga " + formatRupiah(car.price) + ".";
  return "https://wa.me/" + no + "?text=" + encodeURIComponent(msg);
}

export const SLOT_NAMES = ["Foto Utama", "Foto Depan", "Foto Belakang", "Foto Samping", "Foto Interior", "Foto Dashboard", "Foto Mesin", "Foto Lainnya"];