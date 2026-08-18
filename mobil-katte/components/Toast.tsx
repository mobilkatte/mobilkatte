"use client";

import { createContext, useCallback, useContext, useRef, useState, type ReactNode } from "react";

interface ToastItem {
  id: number;
  msg: string;
  type: string;
}

type ToastFn = (msg: string, type?: "success" | "error") => void;

const ToastContext = createContext<ToastFn>(() => {});

export const useToast = () => useContext(ToastContext);

export function ToastProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<ToastItem[]>([]);
  const idRef = useRef(0);

  const toast = useCallback<ToastFn>((msg, type = "success") => {
    const id = ++idRef.current;
    setItems((prev) => [...prev, { id, msg, type }]);
    setTimeout(() => {
      setItems((prev) => prev.filter((t) => t.id !== id));
    }, 2600);
  }, []);

  return (
    <ToastContext.Provider value={toast}>
      {children}
      <div className="toast-stack">
        {items.map((t) => (
          <div key={t.id} className={`toast toast--${t.type} show`}>
            {t.msg}
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}