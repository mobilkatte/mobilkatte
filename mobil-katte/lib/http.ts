import { ApiError } from "./auth";

export function handleApiError(err: unknown): Response {
  if (err instanceof ApiError) {
    return Response.json({ error: err.message }, { status: err.status });
  }
  const message = err instanceof Error ? err.message : "Terjadi kesalahan pada server.";
  return Response.json({ error: message }, { status: 500 });
}