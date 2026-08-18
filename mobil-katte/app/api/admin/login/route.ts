import { NextRequest } from "next/server";
import { ApiError, hashPassword, signToken } from "@/lib/auth";
import { handleApiError } from "@/lib/http";
import { getSupabase } from "@/lib/supabase";

export const dynamic = "force-dynamic";

export async function POST(request: NextRequest) {
  try {
    const { email, password } = (await request.json()) as { email?: string; password?: string };
    if (!email || !password) throw new ApiError(400, "Email dan password wajib diisi.");

    const supabase = getSupabase();
    const { data: admin, error } = await supabase
      .from("admins")
      .select("id, email, password_hash, name")
      .eq("email", email.toLowerCase().trim())
      .maybeSingle();
    if (error) throw error;
    if (!admin || admin.password_hash !== hashPassword(password)) {
      throw new ApiError(401, "Email atau password salah.");
    }

    const token = signToken({ email: admin.email, name: admin.name });
    return Response.json({ token, email: admin.email, name: admin.name });
  } catch (err) {
    return handleApiError(err);
  }
}