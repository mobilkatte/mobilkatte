import { NextRequest } from "next/server";
import { requireAdmin } from "@/lib/auth";
import { handleApiError } from "@/lib/http";
import {
  fetchCarRow,
  generateUniqueSlug,
  getSupabase,
  inputToDb,
  replacePhotos,
  resolveBrandId,
  rowToCar,
  type CarRow,
} from "@/lib/supabase";
import type { CarInput } from "@/lib/types";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  try {
    const supabase = getSupabase();
    const sp = request.nextUrl.searchParams;
    const includeDeleted = sp.get("includeDeleted") === "true";
    const featured = sp.get("featured") === "true";
    const status = sp.get("status");
    const tax = sp.get("tax");
    const kw = sp.get("keyword")?.trim();
    const brandSlug = sp.get("brand")?.trim();
    const minRaw = sp.get("min");
    const maxRaw = sp.get("max");

    let q = supabase.from("cars").select("*, brands(name), car_photos(photo_url, sort_order)");

    if (!includeDeleted) q = q.is("deleted_at", null);
    if (featured) q = q.eq("featured", true);
    if (status) q = q.eq("status", status);
    if (tax) q = q.eq("tax_status", tax);
    if (kw) q = q.or(`name.ilike.%${kw}%,type.ilike.%${kw}%`);
    if (brandSlug) {
      const { data: brands } = await supabase.from("brands").select("id, name");
      const match = (brands ?? []).find((b) => b.name.toLowerCase().replace(/[^a-z0-9]+/g, "-") === brandSlug);
      if (!match) return Response.json({ cars: [], total: 0 });
      q = q.eq("brand_id", match.id);
    }
    if (minRaw) q = q.gte("price", Number(minRaw));
    if (maxRaw) q = q.lte("price", Number(maxRaw));

    const { data, error } = await q.order("created_at", { ascending: false });
    if (error) throw error;

    const cars = (data ?? []).map((row) => rowToCar(row as unknown as CarRow));
    return Response.json({ cars, total: cars.length });
  } catch (err) {
    return handleApiError(err);
  }
}

export async function POST(request: NextRequest) {
  try {
    await requireAdmin(request);
    const input = (await request.json()) as CarInput;
    const supabase = getSupabase();

    const brandId = await resolveBrandId(supabase, input.brand);
    const slug = await generateUniqueSlug(supabase, input.brand, input.name, input.type, input.year);

    const { data: inserted, error } = await supabase
      .from("cars")
      .insert({ ...inputToDb(input), brand_id: brandId, slug })
      .select("id")
      .single();
    if (error) throw error;

    await replacePhotos(supabase, inserted.id, input.photos);
    const full = await fetchCarRow(supabase, inserted.id);
    return Response.json({ car: rowToCar(full) }, { status: 201 });
  } catch (err) {
    return handleApiError(err);
  }
}