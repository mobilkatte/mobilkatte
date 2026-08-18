"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  useSyncExternalStore,
  type ReactNode,
} from "react";
import {
  adminLogin as apiAdminLogin,
  clearAdminSession,
  createBrand,
  createCar,
  deleteBrand,
  fetchBrands,
  fetchCars,
  fetchSettings,
  softDeleteCar,
  updateBrand,
  updateCar,
  updateSettings,
} from "./api";
import type { AdminSession, Brand, Car, CarInput, Settings } from "./types";

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

interface DataContextValue {
  cars: Car[];
  brands: Brand[];
  settings: Settings | null;
  loading: boolean;
  reload: () => Promise<void>;
  saveCar: (input: CarInput, id?: number) => Promise<void>;
  removeCar: (id: number) => Promise<void>;
  addBrand: (name: string) => Promise<void>;
  renameBrand: (id: number, name: string) => Promise<void>;
  deleteBrandById: (id: number) => Promise<void>;
  saveSettings: (patch: Partial<Settings>) => Promise<void>;
}

const DataContext = createContext<DataContextValue | null>(null);

export function CarsProvider({ children }: { children: ReactNode }) {
  const [cars, setCars] = useState<Car[]>([]);
  const [brands, setBrands] = useState<Brand[]>([]);
  const [settings, setSettings] = useState<Settings | null>(null);
  const [loading, setLoading] = useState(true);

  const reload = useCallback(async () => {
    try {
      const [carList, brandList, settingList] = await Promise.all([
        fetchCars(),
        fetchBrands(),
        fetchSettings(),
      ]);
      setCars(carList);
      setBrands(brandList);
      setSettings(settingList);
    } catch (err) {
      console.error("Gagal memuat data:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    // setState di sini terjadi setelah await (async), bukan sinkron.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    reload();
  }, [reload]);

  const saveCar = useCallback(
    async (input: CarInput, id?: number) => {
      if (id) await updateCar(id, input);
      else await createCar(input);
      await reload();
    },
    [reload]
  );

  const removeCar = useCallback(
    async (id: number) => {
      await softDeleteCar(id);
      await reload();
    },
    [reload]
  );

  const addBrand = useCallback(
    async (name: string) => {
      await createBrand(name);
      await reload();
    },
    [reload]
  );

  const renameBrand = useCallback(
    async (id: number, name: string) => {
      await updateBrand(id, name);
      await reload();
    },
    [reload]
  );

  const deleteBrandById = useCallback(
    async (id: number) => {
      await deleteBrand(id);
      await reload();
    },
    [reload]
  );

  const saveSettings = useCallback(
    async (patch: Partial<Settings>) => {
      await updateSettings(patch);
      await reload();
    },
    [reload]
  );

  const value = useMemo<DataContextValue>(
    () => ({
      cars,
      brands,
      settings,
      loading,
      reload,
      saveCar,
      removeCar,
      addBrand,
      renameBrand,
      deleteBrandById,
      saveSettings,
    }),
    [cars, brands, settings, loading, reload, saveCar, removeCar, addBrand, renameBrand, deleteBrandById, saveSettings]
  );

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
}

export function useCars(): DataContextValue {
  const ctx = useContext(DataContext);
  if (!ctx) throw new Error("useCars harus dipakai di dalam <CarsProvider>.");
  return ctx;
}

let sessionRaw: string | null = null;
let sessionCache: AdminSession | null = null;

function readSession(): AdminSession | null {
  let raw: string | null = null;
  try {
    raw = window.localStorage.getItem("mk_admin");
  } catch {
    /* ignore */
  }
  if (raw !== sessionRaw) {
    sessionRaw = raw;
    try {
      sessionCache = raw ? (JSON.parse(raw) as AdminSession) : null;
    } catch {
      sessionCache = null;
    }
  }
  return sessionCache;
}

export function useAdminAuth() {
  const session = useSyncExternalStore(
    (onChange) => subscribeKey("mk_admin", onChange),
    readSession,
    () => null
  );

  const login = useCallback(async (email: string, password: string) => {
    const ok = await apiAdminLogin(email, password);
    if (ok) emitChange("mk_admin");
    return ok;
  }, []);

  const logout = useCallback(() => {
    clearAdminSession();
    emitChange("mk_admin");
  }, []);

  const authed = !!session;

  return { authed, ready: true, login, logout, session };
}