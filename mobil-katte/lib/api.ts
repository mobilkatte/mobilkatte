"use client";

import type { AdminSession, Brand, Car, CarInput, Settings } from "./types";

const SESSION_KEY = "mk_admin";

export function getAdminSession(): AdminSession | null {
  try {
    const raw = window.localStorage.getItem(SESSION_KEY);
    if (raw) return JSON.parse(raw) as AdminSession;
  } catch {
    /* ignore */
  }
  return null;
}

export function setAdminSession(session: AdminSession): void {
  try {
    window.localStorage.setItem(SESSION_KEY, JSON.stringify(session));
  } catch {
    /* ignore */
  }
}

export function clearAdminSession(): void {
  try {
    window.localStorage.removeItem(SESSION_KEY);
  } catch {
    /* ignore */
  }
}

async function http<T>(url: string, options?: RequestInit): Promise<T> {
  const res = await fetch(url, options);
  const data = await res.json().catch(() => null);
  if (!res.ok) {
    const message =
      (data && typeof data === "object" && "error" in data ? String((data as { error: string }).error) : "") ||
      `Permintaan gagal (${res.status})`;
    throw new Error(message);
  }
  return data as T;
}

function authHeaders(extra?: HeadersInit): HeadersInit {
  const session = getAdminSession();
  return {
    ...(session ? { Authorization: "Bearer " + session.token } : {}),
    ...extra,
  };
}

export interface CarsQuery {
  keyword?: string;
  brand?: string;
  min?: number;
  max?: number;
  status?: string;
  tax?: string;
  featured?: boolean;
  includeDeleted?: boolean;
}

export function fetchCars(q: CarsQuery = {}): Promise<Car[]> {
  const p = new URLSearchParams();
  if (q.keyword) p.set("keyword", q.keyword);
  if (q.brand) p.set("brand", q.brand);
  if (q.min != null) p.set("min", String(q.min));
  if (q.max != null) p.set("max", String(q.max));
  if (q.status) p.set("status", q.status);
  if (q.tax) p.set("tax", q.tax);
  if (q.featured) p.set("featured", "true");
  if (q.includeDeleted) p.set("includeDeleted", "true");
  const qs = p.toString();
  return http<{ cars: Car[] }>(qs ? `/api/cars?${qs}` : "/api/cars").then((d) => d.cars);
}

export function fetchCarBySlug(slug: string): Promise<Car> {
  return http<{ car: Car }>(`/api/cars/slug/${slug}`).then((d) => d.car);
}

export function createCar(input: CarInput): Promise<Car> {
  return http<{ car: Car }>("/api/cars", {
    method: "POST",
    headers: authHeaders({ "Content-Type": "application/json" }),
    body: JSON.stringify(input),
  }).then((d) => d.car);
}

export function updateCar(id: number, input: CarInput): Promise<Car> {
  return http<{ car: Car }>(`/api/cars/${id}`, {
    method: "PUT",
    headers: authHeaders({ "Content-Type": "application/json" }),
    body: JSON.stringify(input),
  }).then((d) => d.car);
}

export function softDeleteCar(id: number): Promise<void> {
  return http(`/api/cars/${id}`, { method: "DELETE", headers: authHeaders() });
}

export function restoreCar(id: number): Promise<void> {
  return http(`/api/cars/${id}/restore`, { method: "PATCH", headers: authHeaders() });
}

export function fetchBrands(): Promise<Brand[]> {
  return http<{ brands: Brand[] }>("/api/brands").then((d) => d.brands);
}

export function createBrand(name: string): Promise<Brand> {
  return http<{ brand: Brand }>("/api/brands", {
    method: "POST",
    headers: authHeaders({ "Content-Type": "application/json" }),
    body: JSON.stringify({ name }),
  }).then((d) => d.brand);
}

export function updateBrand(id: number, name: string): Promise<Brand> {
  return http<{ brand: Brand }>(`/api/brands/${id}`, {
    method: "PUT",
    headers: authHeaders({ "Content-Type": "application/json" }),
    body: JSON.stringify({ name }),
  }).then((d) => d.brand);
}

export function deleteBrand(id: number): Promise<void> {
  return http(`/api/brands/${id}`, { method: "DELETE", headers: authHeaders() });
}

export function fetchSettings(): Promise<Settings> {
  return http<{ settings: Settings }>("/api/settings").then((d) => d.settings);
}

export async function adminLogin(email: string, password: string): Promise<boolean> {
  const data = await http<{ token: string; email: string; name: string }>("/api/admin/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });
  if (!data.token) return false;
  setAdminSession({
    email: data.email,
    name: data.name,
    token: data.token,
    loginAt: new Date().toISOString(),
  });
  return true;
}