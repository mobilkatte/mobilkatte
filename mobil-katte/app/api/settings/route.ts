import { NextRequest } from "next/server";
import { requireAdmin } from "@/lib/auth";
import { handleApiError } from "@/lib/http";
import { getSupabase } from "@/lib/supabase";
import type { Settings } from "@/lib/types";

export const dynamic = "force-dynamic";

export const SETTINGS_DEFAULTS: Settings = {
  wa_number: "6281234567890",
  admin_email: "admin@mobilkatte.com",
  contact_phone: "+62 812-3456-7890",
  contact_address: "Jl. Mobil Katte No. 88, Makassar",
  about_kicker: "Kenapa Kami",
  about_title: "Mengapa Mobil Katte?",
  about_subtitle: "Kami membuat jual beli mobil bekas jadi mudah, jelas, dan terpercaya.",
  about_description:
    "Katalog mobil bekas yang cepat, sederhana, transparan, dan mudah dihubungi. Temukan mobil bekas berkualitas dengan informasi kendaraan yang jelas.",
  about_card1_title: "Informasi Jelas",
  about_card1_desc:
    "Setiap mobil dilengkapi data lengkap: tahun, pajak, kilometer, hingga kondisi kendaraan.",
  about_card2_title: "Pilihan Beragam",
  about_card2_desc:
    "Ratusan mobil dari 12+ brand ternama dengan berbagai tipe dan rentang harga.",
  about_card3_title: "Harga Transparan",
  about_card3_desc: "Harga tertera jelas di setiap unit. Tanpa biaya tersembunyi, apa adanya.",
  about_card4_title: "Mudah Dihubungi",
  about_card4_desc:
    "Hubungi kami langsung lewat WhatsApp dengan satu klik dari halaman mobil.",
};

const KEYS = Object.keys(SETTINGS_DEFAULTS) as (keyof Settings)[];

export async function GET() {
  try {
    const supabase = getSupabase();
    const { data, error } = await supabase.from("settings").select("key, value");
    if (error) throw error;

    const map: Partial<Record<string, string>> = {};
    (data ?? []).forEach((s) => {
      map[s.key] = s.value;
    });

    const settings = {} as Settings;
    KEYS.forEach((k) => {
      settings[k] = (map[k] ?? SETTINGS_DEFAULTS[k]) as string;
    });

    return Response.json({ settings });
  } catch (err) {
    return handleApiError(err);
  }
}

export async function PUT(request: NextRequest) {
  try {
    await requireAdmin(request);
    const body = (await request.json()) as Partial<Settings>;

    const patch: Record<string, string> = {};
    KEYS.forEach((k) => {
      const v = body[k];
      if (typeof v === "string") patch[k] = v;
    });
    if (!Object.keys(patch).length) {
      return Response.json({ error: "Tidak ada data untuk disimpan." }, { status: 400 });
    }

    const supabase = getSupabase();
    const rows = Object.entries(patch).map(([key, value]) => ({ key, value }));
    const { error } = await supabase
      .from("settings")
      .upsert(rows, { onConflict: "key" });
    if (error) throw error;

    return Response.json({ ok: true });
  } catch (err) {
    return handleApiError(err);
  }
}