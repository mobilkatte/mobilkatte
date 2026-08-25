import "server-only";

import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import { slugify } from "./data";
import type { Car, CarInput } from "./types";

export interface CarRow {
  id: number;
  slug: string;
  brand_id: number;
  brand: string | null;
  name: string;
  type: string;
  year: number;
  price: number;
  mileage: number;
  transmission: string;
  fuel: string;
  color: string;
  tax_status: string;
  tax_expired_at: string | null;
  condition: string;
  location: string;
  plate: string;
  video_url: string | null;
  description: string;
  status: string;
  featured: boolean;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
  car_photos: { photo_url: string; sort_order: number }[] | null;
}

export function rowToCar(row: CarRow): Car {
  return {
    id: row.id,
    slug: row.slug,
    brand: row.brand ?? "",
    name: row.name,
    type: row.type,
    year: row.year,
    price: row.price,
    mileage: row.mileage,
    transmission: row.transmission,
    fuel: row.fuel,
    color: row.color,
    taxStatus: row.tax_status,
    taxExpiredAt: row.tax_expired_at,
    condition: row.condition,
    location: row.location,
    plate: row.plate,
    videoUrl: row.video_url ?? undefined,
    description: row.description,
    status: row.status,
    featured: row.featured,
    createdAt: row.created_at,
    photos: (row.car_photos ?? []).slice().sort((a, b) => a.sort_order - b.sort_order).map((p) => p.photo_url),
    deletedAt: row.deleted_at ?? undefined,
  };
}

let client: SupabaseClient | null = null;

export function getSupabase(): SupabaseClient {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) {
    throw new Error(
      "Supabase belum dikonfigurasi. Salin .env.local.example ke .env.local lalu isi NEXT_PUBLIC_SUPABASE_URL dan SUPABASE_SERVICE_ROLE_KEY."
    );
  }
  if (!client) {
    client = createClient(url, key, { auth: { persistSession: false } });
  }
  return client;
}

const CAR_SELECT = "*, brands(name), car_photos(photo_url, sort_order)";

export async function fetchCarRow(supabase: SupabaseClient, id: number): Promise<CarRow> {
  const { data, error } = await supabase.from("cars").select(CAR_SELECT).eq("id", id).single();
  if (error) throw error;
  return data as unknown as CarRow;
}

export function inputToDb(input: CarInput) {
  return {
    name: input.name,
    type: input.type,
    year: input.year,
    price: input.price,
    mileage: input.mileage,
    transmission: input.transmission,
    fuel: input.fuel,
    color: input.color,
    tax_status: input.taxStatus,
    tax_expired_at: input.taxExpiredAt,
    condition: input.condition,
    location: input.location,
    plate: input.plate,
    video_url: input.videoUrl || null,
    description: input.description,
    status: input.status,
    featured: input.featured ?? false,
  };
}

export async function resolveBrandId(supabase: SupabaseClient, brandName: string): Promise<number> {
  const name = brandName.trim();
  const { data: existing } = await supabase
    .from("brands")
    .select("id")
    .eq("name", name)
    .maybeSingle();
  if (existing) return existing.id;
  const { data: created, error } = await supabase
    .from("brands")
    .insert({ name })
    .select("id")
    .single();
  if (error) throw error;
  return created.id;
}

export async function generateUniqueSlug(
  supabase: SupabaseClient,
  brandName: string,
  name: string,
  type: string,
  year: number
): Promise<string> {
  const base = slugify(`${brandName} ${name} ${type} ${year}`);
  let slug = base;
  let n = 1;
  while (true) {
    const { data } = await supabase.from("cars").select("id").eq("slug", slug).maybeSingle();
    if (!data) return slug;
    n += 1;
    slug = `${base}-${n}`;
  }
}

export async function replacePhotos(supabase: SupabaseClient, carId: number, photos: string[]): Promise<void> {
  const { error: de } = await supabase.from("car_photos").delete().eq("car_id", carId);
  if (de) throw de;
  if (!photos.length) return;
  const { error: ie } = await supabase.from("car_photos").insert(
    photos.map((url, i) => ({ car_id: carId, photo_url: url, sort_order: i }))
  );
  if (ie) throw ie;
}

export interface SellOfferRow {
  id: number;
  brand: string;
  name: string;
  type: string;
  year: number | null;
  price: number | null;
  mileage: number;
  transmission: string;
  fuel: string;
  color: string;
  tax_status: string;
  location: string;
  plate: string;
  description: string;
  seller_name: string;
  seller_phone: string;
  seller_email: string | null;
  status: string;
  admin_note: string | null;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
  sell_offer_photos: { photo_url: string; sort_order: number }[] | null;
}

export function rowToSellOffer(row: SellOfferRow) {
  return {
    id: row.id,
    brand: row.brand ?? "",
    name: row.name,
    type: row.type,
    year: row.year,
    price: row.price,
    mileage: row.mileage ?? 0,
    transmission: row.transmission ?? "",
    fuel: row.fuel ?? "",
    color: row.color ?? "",
    taxStatus: row.tax_status,
    location: row.location ?? "",
    plate: row.plate ?? "",
    description: row.description ?? "",
    sellerName: row.seller_name ?? "",
    sellerPhone: row.seller_phone ?? "",
    sellerEmail: row.seller_email ?? null,
    status: (row.status as SellOfferRow["status"]) || "Baru",
    adminNote: row.admin_note ?? null,
    photos: (row.sell_offer_photos ?? [])
      .slice()
      .sort((a, b) => a.sort_order - b.sort_order)
      .map((p) => p.photo_url),
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  };
}

const SELL_OFFER_SELECT = "*, sell_offer_photos(photo_url, sort_order)";

export async function insertSellOffer(
  supabase: SupabaseClient,
  input: {
    brand: string;
    name: string;
    type: string;
    year: number | null;
    price: number | null;
    mileage: number;
    transmission: string;
    fuel: string;
    color: string;
    taxStatus: string;
    location: string;
    plate: string;
    description: string;
    sellerName: string;
    sellerPhone: string;
    sellerEmail: string | null;
    photos: string[];
  }
) {
  const { data: inserted, error } = await supabase
    .from("sell_offers")
    .insert({
      brand: input.brand,
      name: input.name,
      type: input.type,
      year: input.year,
      price: input.price,
      mileage: input.mileage,
      transmission: input.transmission,
      fuel: input.fuel,
      color: input.color,
      tax_status: input.taxStatus,
      location: input.location,
      plate: input.plate,
      description: input.description,
      seller_name: input.sellerName,
      seller_phone: input.sellerPhone,
      seller_email: input.sellerEmail,
      status: "Baru",
    })
    .select("id")
    .single();
  if (error) throw error;

  const offerId = inserted.id;
  if (input.photos.length) {
    const { error: pe } = await supabase.from("sell_offer_photos").insert(
      input.photos.map((url, i) => ({ offer_id: offerId, photo_url: url, sort_order: i }))
    );
    if (pe) throw pe;
  }
  return offerId;
}

export async function fetchSellOfferRow(supabase: SupabaseClient, id: number): Promise<SellOfferRow> {
  const { data, error } = await supabase.from("sell_offers").select(SELL_OFFER_SELECT).eq("id", id).single();
  if (error) throw error;
  return data as unknown as SellOfferRow;
}