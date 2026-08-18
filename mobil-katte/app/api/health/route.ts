import { handleApiError } from "@/lib/http";
import { getSupabase } from "@/lib/supabase";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const supabase = getSupabase();
    const tables = ["admins", "brands", "cars", "car_photos", "settings"];
    const result: Record<string, { exists: boolean; count: number | null; error?: string }> = {};

    for (const table of tables) {
      try {
        const { count, error } = await supabase.from(table).select("*", { count: "exact", head: true });
        if (error) {
          result[table] = { exists: false, count: null, error: error.message };
        } else {
          result[table] = { exists: true, count };
        }
      } catch (e) {
        result[table] = { exists: false, count: null, error: e instanceof Error ? e.message : "unknown" };
      }
    }

    return Response.json({ ok: true, url: process.env.NEXT_PUBLIC_SUPABASE_URL, tables: result });
  } catch (err) {
    return handleApiError(err);
  }
}