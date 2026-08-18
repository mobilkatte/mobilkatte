import { createHash, createHmac, timingSafeEqual } from "crypto";

export const AUTH_SALT = "mobilkatte-salt";
export const AUTH_TTL_MS = 1000 * 60 * 60 * 12; // 12 jam

export interface AdminPayload {
  email: string;
  name: string;
  exp: number;
}

export class ApiError extends Error {
  status: number;

  constructor(status: number, message: string) {
    super(message);
    this.status = status;
  }
}

function secret(): string {
  return process.env.AUTH_SECRET ?? "mobil-katte-dev-secret";
}

function sign(body: string): string {
  return createHmac("sha256", secret()).update(body).digest("base64url");
}

export function signToken(payload: Omit<AdminPayload, "exp">): string {
  const body = Buffer.from(
    JSON.stringify({ ...payload, exp: Date.now() + AUTH_TTL_MS })
  ).toString("base64url");
  return body + "." + sign(body);
}

export function verifyToken(token: string): AdminPayload | null {
  const [body, sig] = token.split(".");
  if (!body || !sig) return null;
  const expected = sign(body);
  const sigBuf = Buffer.from(sig);
  const expBuf = Buffer.from(expected);
  if (sigBuf.length !== expBuf.length || !timingSafeEqual(sigBuf, expBuf)) return null;
  try {
    const payload = JSON.parse(Buffer.from(body, "base64url").toString()) as AdminPayload;
    if (payload.exp > Date.now()) return payload;
  } catch {
    /* invalid payload */
  }
  return null;
}

export async function requireAdmin(request: Request): Promise<AdminPayload> {
  const header = request.headers.get("authorization") ?? "";
  const token = header.startsWith("Bearer ") ? header.slice(7) : "";
  const payload = verifyToken(token);
  if (!payload) throw new ApiError(401, "Unauthorized");
  return payload;
}

export function hashPassword(password: string): string {
  return createHash("sha256").update(password + "::" + AUTH_SALT).digest("hex");
}