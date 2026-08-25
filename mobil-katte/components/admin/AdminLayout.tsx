"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, type ReactNode } from "react";
import { useAdminAuth } from "@/lib/data-context";
import {
  IconBrand,
  IconCar2,
  IconDashboard,
  IconImage,
  IconLogout,
  IconMoney,
  IconPlus,
  IconSettings,
} from "@/components/icons";

interface AdminLayoutProps {
  active: string;
  title: string;
  subtitle: string;
  action?: ReactNode;
  children: ReactNode;
}

export default function AdminLayout({ active, title, subtitle, action, children }: AdminLayoutProps) {
  const [open, setOpen] = useState(false);
  const { logout } = useAdminAuth();
  const router = useRouter();

  const items = [
    { key: "dashboard", label: "Dashboard", href: "/admin/dashboard", icon: IconDashboard },
    { key: "cars", label: "Data Mobil", href: "/admin/cars", icon: IconCar2 },
    { key: "car-form", label: "Tambah Mobil", href: "/admin/cars/new", icon: IconPlus },
    { key: "sell-offers", label: "Penawaran Mobil", href: "/admin/sell-offers", icon: IconMoney },
    { key: "brands", label: "Brand", href: "/admin/brands", icon: IconBrand },
    { key: "photos", label: "Foto Mobil", href: "/admin/cars", icon: IconImage },
    { key: "settings", label: "Pengaturan", href: "/admin/settings", icon: IconSettings },
  ];

  const doLogout = () => {
    logout();
    router.push("/admin/login");
  };

  return (
    <div className="admin">
      <aside className={`admin-sidebar${open ? " open" : ""}`} id="adminNav">
        <div className="brand">
          <img src="/assets/logo.png" alt="Mobil Katte" className="brand-logo" />
          <span>MOBIL KATTE</span>
        </div>
        <nav className="admin-nav">
          {items.map((it) => (
            <Link
              key={it.key}
              href={it.href}
              className={it.key === active ? "active" : ""}
              onClick={() => setOpen(false)}
            >
              <it.icon /> {it.label}
            </Link>
          ))}
        </nav>
        <div className="logout">
          <button
            className="btn btn--outline btn--block"
            style={{ color: "#cbd5e1", borderColor: "rgba(255,255,255,.2)" }}
            onClick={doLogout}
          >
            <IconLogout /> Logout
          </button>
        </div>
      </aside>

      <main className="admin-main">
        <div className="admin-topbar">
          <div>
            <button className="admin-burger" onClick={() => setOpen((o) => !o)} aria-label="Menu">
              ☰
            </button>
            <h1>{title}</h1>
            <div className="sub">{subtitle}</div>
          </div>
          {action}
        </div>
        {children}
      </main>
    </div>
  );
}