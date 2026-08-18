"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { IconClose, IconMenu, IconSearch } from "./icons";

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const [open, setOpen] = useState(false);

  const links = [
    { key: "home", label: "Home", href: "/" },
    { key: "catalog", label: "Katalog Mobil", href: "/mobil" },
    { key: "about", label: "Tentang Kami", href: "/#tentang" },
    { key: "contact", label: "Kontak", href: "/#kontak" },
  ];

  const isActive = (key: string, href: string) => {
    if (key === "home") return pathname === "/";
    if (href.startsWith("/#")) return pathname === "/";
    return pathname.startsWith("/mobil");
  };

  const goSearch = (q: string) => {
    router.push(q ? `/mobil?keyword=${encodeURIComponent(q)}` : "/mobil");
  };

  const onDesktopSearch = (e: FormEvent) => {
    e.preventDefault();
    const input = document.getElementById("navSearch") as HTMLInputElement | null;
    goSearch(input?.value ?? "");
  };

  const onMobileSearch = (e: FormEvent) => {
    e.preventDefault();
    const input = document.getElementById("navSearchMobile") as HTMLInputElement | null;
    goSearch(input?.value ?? "");
  };

  return (
    <header className="navbar">
      <div className="container navbar__inner">
        <Link href="/" className="navbar__logo">
          <img src="/assets/logo.png" alt="Mobil Katte" className="brand-logo" />
          <span>
            MOBIL KATTE<small>Katalog Mobil Bekas</small>
          </span>
        </Link>

        <form className="navbar__search navbar__search--desktop" onSubmit={onDesktopSearch}>
          <IconSearch />
          <input id="navSearch" type="text" placeholder="Cari mobil, brand, atau tipe..." />
          <button type="submit">Cari</button>
        </form>

        <nav className={`navbar__links${open ? " open" : ""}`}>
          {links.map((l) => (
            <Link key={l.key} href={l.href} className={isActive(l.key, l.href) ? "active" : ""} onClick={() => setOpen(false)}>
              {l.label}
            </Link>
          ))}
        </nav>

        <button
          className="navbar__toggle"
          onClick={() => setOpen((o) => !o)}
          aria-label="Menu"
        >
          {open ? <IconClose /> : <IconMenu />}
        </button>
      </div>

      <div className="container navbar__searchrow">
        <form className="navbar__search navbar__search--mobile" onSubmit={onMobileSearch}>
          <IconSearch />
          <input id="navSearchMobile" type="text" placeholder="Cari mobil, brand, atau tipe..." />
          <button type="submit">Cari</button>
        </form>
      </div>
    </header>
  );
}