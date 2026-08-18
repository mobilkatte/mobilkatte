import { NextRequest } from "next/server";
import { requireAdmin } from "@/lib/auth";
import { handleApiError } from "@/lib/http";
import { getSupabase } from "@/lib/supabase";

export const dynamic = "force-dynamic";

type Ctx = { params: Promise<{ id: string }> };

export async function PUT(request: NextRequest, { params }: Ctx) {
  try {
    await requireAdmin(request);
    const { id } = await params;
    const { name } = (await request.json()) as { name?: string };
    const clean = (name ?? "").trim();
    if (!clean) {
      return Response.json({ error: "Nama brand tidak boleh kosong." }, { status: 400 });
    }

    const supabase = getSupabase();
    const { data: dup } = await supabase.from("brands").select("id").eq("name", clean).neq("id", Number(id)).maybeSingle();
    if (dup) {
      return Response.json({ error: "Brand dengan nama tersebut sudah ada." }, { status: 409 });
    }

    const { data, error } = await supabase.from("brands").update({ name: clean }).eq("id", Number(id)).select("id, name").single();
    if (error) throw error;
    return Response.json({
      brand: { id: data.id, name: data.name, slug: data.name.toLowerCase().replace(/[^a-z0-9]+/g, "-") },
    });
  } catch (err) {
    return handleApiError(err);
  }
}

export async function DELETE(request: NextRequest, { params }: Ctx) {
  try {
    await requireAdmin(request);
    const { id } = await params;
    const supabase = getSupabase();

    const { data: used } = await supabase.from("cars").select("id").eq("brand_id", Number(id)).limit(1).maybeSingle();
    if (used) {
      return Response.json({ error: "Brand tidak bisa dihapus karena masih dipakai oleh mobil." }, { status: 400 });
    }

    const { error } = await supabase.from("brands").delete().eq("id", Number(id));
    if (error) throw error;
    return Response.json({ ok: true });
  } catch (err) {
    return handleApiError(err);
  }
}