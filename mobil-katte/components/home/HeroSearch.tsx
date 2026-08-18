"use client";

import { useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";

export default function HeroSearch() {
  const router = useRouter();
  const [q, setQ] = useState("");

  const submit = (e: FormEvent) => {
    e.preventDefault();
    router.push(q.trim() ? `/mobil?keyword=${encodeURIComponent(q.trim())}` : "/mobil");
  };

  return (
    <form className="hero__searchbox" onSubmit={submit}>
      <input
        value={q}
        onChange={(e) => setQ(e.target.value)}
        type="text"
        placeholder="Cari mobil, brand, atau tipe... (mis. Avanza, Toyota, Brio)"
      />
      <button type="submit" className="btn btn--primary" style={{ padding: "12px 28px" }}>
        Cari
      </button>
    </form>
  );
}