import { NextRequest } from "next/server";
import { handleApiError } from "@/lib/http";
import { getSupabase, rowToCar } from "@/lib/supabase";

export const dynamic = "force-dynamic";

type Ctx = { params: Promise<{ slug: string }> };

export async function GET(request: NextRequest, { params }: Ctx) {
  try {
    const { slug } = await params;
    const supabase = getSupabase();
    const { data, error } = await supabase
      .from("cars")
      .select("*, brands(name), car_photos(photo_url, sort_order)")
      .eq("slug", slug)
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