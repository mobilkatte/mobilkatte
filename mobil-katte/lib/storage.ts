"use client";

import { useCallback, useSyncExternalStore } from "react";
import { ADMIN_EMAIL, ADMIN_PASSWORD, CARS } from "./data";
import type { Car } from "./types";

export const STORE_KEY = "mk_cars";
export const ADMIN_SESSION_KEY = "mk_admin";

export function saveStoredCars(list: Car[]): void {
  try {
    window.localStorage.setItem(STORE_KEY, JSON.stringify(list));
  } catch {
    /* ignore */
  }
}

export function activeCars(list: Car[]): Car[] {
  return list.filter((c) => !c.deletedAt);
}

const CHANGE_EVENT = "mk-storage-change";

function emitChange(key: string) {
  window.dispatchEvent(new CustomEvent(CHANGE_EVENT, { detail: key }));
}

function subscribeKey(key: string, onChange: () => void) {
  const storageListener = (e: StorageEvent) => {
    if (e.key === key || e.key === null) onChange();
  };
  const customListener = (e: Event) => {
    if ((e as CustomEvent).detail === key) onChange();
  };
  window.addEventListener("storage", storageListener);
  window.addEventListener(CHANGE_EVENT, customListener);
  return () => {
    window.removeEventListener("storage", storageListener);
    window.removeEventListener(CHANGE_EVENT, customListener);
  };
}

let carsRawCache: string | null = null;
let carsCache: Car[] = CARS;

function readStoredCars(): Car[] {
  let raw: string | null = null;
  try {
    raw = window.localStorage.getItem(STORE_KEY);
  } catch {
    /* ignore */
  }
  if (raw !== carsRawCache) {
    carsRawCache = raw;
    if (raw) {
      try {
        const parsed = JSON.parse(raw);
        carsCache = Array.isArray(parsed) && parsed.length ? (parsed as Car[]) : CARS;
      } catch {
        carsCache = CARS;
      }
    } else {
      carsCache = CARS;
    }
  }
  return carsCache;
}

const subscribeCars = (onChange: () => void) => subscribeKey(STORE_KEY, onChange);

export function useCars(includeDeleted = false) {
  const all = useSyncExternalStore(subscribeCars, readStoredCars, () => CARS);
  const cars = includeDeleted ? all : activeCars(all);

  const commit = useCallback((list: Car[]) => {
    saveStoredCars(list);
    emitChange(STORE_KEY);
  }, []);

  return { cars, commit };
}

function readAdminAuthed(): boolean {
  try {
    return Boolean(window.localStorage.getItem(ADMIN_SESSION_KEY));
  } catch {
    return false;
  }
}

const subscribeAuth = (onChange: () => void) => subscribeKey(ADMIN_SESSION_KEY, onChange);

export function useAdminAuth() {
  const authed = useSyncExternalStore(subscribeAuth, readAdminAuthed, () => false);

  const login = (email: string, password: string): boolean => {
    if (email.toLowerCase() === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
      try {
        window.localStorage.setItem(
          ADMIN_SESSION_KEY,
          JSON.stringify({ email, name: "Administrator", loginAt: new Date().toISOString() })
        );
      } catch {
        /* ignore */
      }
      emitChange(ADMIN_SESSION_KEY);
      return true;
    }
    return false;
  };

  const logout = () => {
    try {
      window.localStorage.removeItem(ADMIN_SESSION_KEY);
    } catch {
      /* ignore */
    }
    emitChange(ADMIN_SESSION_KEY);
  };

  return { authed, login, logout };
}