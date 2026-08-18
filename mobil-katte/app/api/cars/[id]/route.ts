import { NextRequest } from "next/server";
import { requireAdmin } from "@/lib/auth";
import { handleApiError } from "@/lib/http";
import {
  fetchCarRow,
  getSupabase,
  inputToDb,
  replacePhotos,
  resolveBrandId,
  rowToCar,
} from "@/lib/supabase";
import type { CarInput } from "@/lib/types";

export const dynamic = "force-dynamic";

type Ctx = { params: Promise<{ id: string }> };

export async function GET(_request: NextRequest, { params }: Ctx) {
  try {
    const { id } = await params;
    const supabase = getSupabase();
    const { data, error } = await supabase
      .from("cars")
      .select("*, brands(name), car_photos(photo_url, sort_order)")
      .eq("id", Number(id))
      .is("deleted_at", null)
      .single();
    if (error || !data) {
      return Response.json({ error: "Mobil tidak ditemukan." }, { status: 404 });
    }
    return Response.json({ car: rowToCar(data as never) });
  } catch (err) {
    return handleApiError(err);
  }
}

export async function PUT(request: NextRequest, { params }: Ctx) {
  try {
    await requireAdmin(request);
    const { id } = await params;
    const input = (await request.json()) as CarInput;
    const supabase = getSupabase();
    const carId = Number(id);

    const brandId = await resolveBrandId(supabase, input.brand);
    const { error } = await supabase
      .from("cars")
      .update({ ...inputToDb(input), brand_id: brandId })
      .eq("id", carId);
    if (error) throw error;

    await replacePhotos(supabase, carId, input.photos);
    const full = await fetchCarRow(supabase, carId);
    return Response.json({ car: rowToCar(full) });
  } catch (err) {
    return handleApiError(err);
  }
}

export async function DELETE(request: NextRequest, { params }: Ctx) {
  try {
    await requireAdmin(request);
    const { id } = await params;
    const supabase = getSupabase();
    const { error } = await supabase
      .from("cars")
      .update({ deleted_at: new Date().toISOString() })
      .eq("id", Number(id));
    if (error) throw error;
    return Response.json({ ok: true });
  } catch (err) {
    return handleApiError(err);
  }
}