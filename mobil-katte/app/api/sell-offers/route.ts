import { NextRequest } from "next/server";
import { ApiError, requireAdmin } from "@/lib/auth";
import { handleApiError } from "@/lib/http";
import {
  getSupabase,
  insertSellOffer,
  rowToSellOffer,
  type SellOfferRow,
} from "@/lib/supabase";
import type { SellOfferInput } from "@/lib/types";

export const dynamic = "force-dynamic";

const MAX_PHOTO_BYTES = 5 * 1024 * 1024;
const MAX_PHOTOS = 8;

function isDataUrl(s: string): boolean {
  return s.startsWith("data:image/");
}

export async function POST(request: NextRequest) {
  try {
    const input = (await request.json()) as SellOfferInput;

    const brand = (input.brand ?? "").trim();
    const name = (input.name ?? "").trim();
    const type = (input.type ?? "").trim();
    const sellerName = (input.sellerName ?? "").trim();
    const sellerPhone = (input.sellerPhone ?? "").trim();
    const year = input.year != null ? Number(input.year) : null;
    const price = input.price != null ? Number(input.price) : null;

    if (!brand || !name || !sellerName || !sellerPhone) {
      throw new ApiError(400, "Mohon lengkapi field bertanda * (Brand, Nama Mobil, Nama Penjual, No. WhatsApp).");
    }
    if (year != null && (Number.isNaN(year) || year < 1900 || year > 2100)) {
      throw new ApiError(400, "Tahun kendaraan tidak valid.");
    }
    if (price != null && (Number.isNaN(price) || price < 0)) {
      throw new ApiError(400, "Harga yang diharapkan tidak valid.");
    }

    const photos = (input.photos ?? []).filter(Boolean).slice(0, MAX_PHOTOS);
    for (const p of photos) {
      if (!isDataUrl(p)) {
        throw new ApiError(400, "Format foto tidak didukung.");
      }
      const comma = p.indexOf(",");
      const meta = comma > 0 ? p.slice(0, comma) : "";
      const base64 = comma > 0 ? p.slice(comma + 1) : "";
      const bytes = Math.ceil((base64.length * 3) / 4);
      if (bytes > MAX_PHOTO_BYTES) {
        throw new ApiError(400, "Ukuran foto maksimal 5 MB per foto.");
      }
      void meta;
    }

    const supabase = getSupabase();
    const id = await insertSellOffer(supabase, {
      brand,
      name,
      type,
      year,
      price,
      mileage: Number(input.mileage) || 0,
      transmission: input.transmission ?? "",
      fuel: input.fuel ?? "",
      color: (input.color ?? "").trim(),
      taxStatus: input.taxStatus ?? "Aktif",
      location: (input.location ?? "").trim(),
      plate: (input.plate ?? "").trim(),
      description: (input.description ?? "").trim(),
      sellerName,
      sellerPhone,
      sellerEmail: (input.sellerEmail ?? "").trim() || null,
      photos,
    });

    return Response.json({ ok: true, id }, { status: 201 });
  } catch (err) {
    return handleApiError(err);
  }
}

export async function GET(request: NextRequest) {
  try {
    await requireAdmin(request);
    const supabase = getSupabase();
    const sp = request.nextUrl.searchParams;
    const status = sp.get("status");
    const kw = sp.get("keyword")?.trim();

    let q = supabase.from("sell_offers").select("*, sell_offer_photos(photo_url, sort_order)");
    q = q.is("deleted_at", null);
    if (status) q = q.eq("status", status);
    if (kw) {
      q = q.or(
        `name.ilike.%${kw}%,brand.ilike.%${kw}%,type.ilike.%${kw}%,seller_name.ilike.%${kw}%,seller_phone.ilike.%${kw}%`
      );
    }

    const { data, error } = await q.order("created_at", { ascending: false });
    if (error) throw error;

    const offers = (data ?? []).map((row) => rowToSellOffer(row as unknown as SellOfferRow));
    return Response.json({ offers });
  } catch (err) {
    return handleApiError(err);
  }
}