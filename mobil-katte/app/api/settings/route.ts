import { handleApiError } from "@/lib/http";
import { getSupabase } from "@/lib/supabase";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const supabase = getSupabase();
    const { data, error } = await supabase.from("settings").select("key, value");
    if (error) throw error;

    const map: Record<string, string> = {};
    (data ?? []).forEach((s) => {
      map[s.key] = s.value;
    });

    return Response.json({
      settings: {
        wa_number: map.wa_number ?? "6281234567890",
        admin_email: map.admin_email ?? "admin@mobilkatte.com",
      },
    });
  } catch (err) {
    return handleApiError(err);
  }
}