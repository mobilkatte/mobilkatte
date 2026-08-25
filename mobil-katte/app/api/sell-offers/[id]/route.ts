import { NextRequest } from "next/server";
import { requireAdmin } from "@/lib/auth";
import { handleApiError } from "@/lib/http";
import { getSupabase } from "@/lib/supabase";
import type { SellOfferPatch, SellOfferStatus } from "@/lib/types";

export const dynamic = "force-dynamic";

const VALID_STATUS: SellOfferStatus[] = ["Baru", "Dihubungi", "Diterima", "Ditolak"];

type Ctx = { params: Promise<{ id: string }> };

export async function PATCH(request: NextRequest, { params }: Ctx) {
  try {
    await requireAdmin(request);
    const { id } = await params;
    const carId = Number(id);
    const patch = (await request.json()) as SellOfferPatch;
    const supabase = getSupabase();

    const update: Record<string, unknown> = {};
    if (patch.status != null) {
      if (!VALID_STATUS.includes(patch.status)) {
        return Response.json({ error: "Status tidak valid." }, { status: 400 });
      }
      update.status = patch.status;
    }
    if (patch.adminNote !== undefined) {
      update.admin_note = patch.adminNote;
    }

    if (!Object.keys(update).length) {
      return Response.json({ ok: true });
    }

    const { error } = await supabase.from("sell_offers").update(update).eq("id", carId);
    if (error) throw error;
    return Response.json({ ok: true });
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
      .from("sell_offers")
      .update({ deleted_at: new Date().toISOString() })
      .eq("id", Number(id));
    if (error) throw error;
    return Response.json({ ok: true });
  } catch (err) {
    return handleApiError(err);
  }
}
