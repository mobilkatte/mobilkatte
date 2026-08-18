import { ApiError } from "./auth";

interface ErrorLike {
  message?: unknown;
  code?: string;
  details?: string;
  hint?: string;
}

function isErrorLike(err: unknown): err is ErrorLike {
  return typeof err === "object" && err !== null;
}

function messageOf(err: unknown): string {
  if (err instanceof Error) return err.message;
  if (isErrorLike(err) && typeof err.message === "string") return err.message;
  return "Terjadi kesalahan pada server.";
}

function statusFor(code: string | undefined): number {
  switch (code) {
    case "23505": return 409; // duplicate key
    case "23503": // foreign key violation
    case "23514": // check violation
    case "23502": // not null violation
      return 400;
    case "42501": // insufficient privilege
      return 403;
    default:
      return 500;
  }
}

export function handleApiError(err: unknown): Response {
  if (err instanceof ApiError) {
    return Response.json({ error: err.message }, { status: err.status });
  }
  console.error("[api-error]", err);
  const status = isErrorLike(err) ? statusFor((err as ErrorLike).code) : 500;
  const extra: Record<string, string> = {};
  if (isErrorLike(err)) {
    const e = err as ErrorLike;
    if (typeof e.code === "string") extra.code = e.code;
    if (typeof e.details === "string" && e.details) extra.details = e.details;
    if (typeof e.hint === "string" && e.hint) extra.hint = e.hint;
  }
  return Response.json({ error: messageOf(err), ...extra }, { status });
}