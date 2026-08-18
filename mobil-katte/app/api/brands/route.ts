import { NextRequest } from "next/server";
import { requireAdmin } from "@/lib/auth";
import { handleApiError } from "@/lib/http";
import { getSupabase } from "@/lib/supabase";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const supabase = getSupabase();
    const { data: brands, error } = await supabase.from("brands").select("id, name").order("name");
    if (error) throw error;

    const { data: carBrandIds } = await supabase.from("cars").select("brand_id").is("deleted_at", null);
    const counts: Record<number, number> = {};
    (carBrandIds ?? []).forEach((r) => {
      counts[r.brand_id] = (counts[r.brand_id] ?? 0) + 1;
    });

    return Response.json({
      brands: (brands ?? []).map((b) => ({
        id: b.id,
        name: b.name,
        slug: b.name.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
        count: counts[b.id] ?? 0,
      })),
    });
  } catch (err) {
    return handleApiError(err);
  }
}

export async function POST(request: NextRequest) {
  try {
    await requireAdmin(request);
    const { name } = (await request.json()) as { name?: string };
    const clean = (name ?? "").trim();
    if (!clean) {
      return Response.json({ error: "Nama brand tidak boleh kosong." }, { status: 400 });
    }

    const supabase = getSupabase();
    const { data: existing } = await supabase.from("brands").select("id").eq("name", clean).maybeSingle();
    if (existing) {
      return Response.json({ error: "Brand sudah ada." }, { status: 409 });
    }

    const { data, error } = await supabase.from("brands").insert({ name: clean }).select("id, name").single();
    if (error) throw error;
    return Response.json(
      { brand: { id: data.id, name: data.name, slug: data.name.toLowerCase().replace(/[^a-z0-9]+/g, "-"), count: 0 } },
      { status: 201 }
    );
  } catch (err) {
    return handleApiError(err);
  }
}