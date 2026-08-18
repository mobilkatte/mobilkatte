import { NextRequest } from "next/server";
import { requireAdmin } from "@/lib/auth";
import { handleApiError } from "@/lib/http";
import { getSupabase } from "@/lib/supabase";

export const dynamic = "force-dynamic";

type Ctx = { params: Promise<{ id: string }> };

export async function PATCH(request: NextRequest, { params }: Ctx) {
  try {
    await requireAdmin(request);
    const { id } = await params;
    const supabase = getSupabase();
    const { error } = await supabase
      .from("cars")
      .update({ deleted_at: null })
      .eq("id", Number(id));
    if (error) throw error;
    return Response.json({ ok: true });
  } catch (err) {
    return handleApiError(err);
  }
}