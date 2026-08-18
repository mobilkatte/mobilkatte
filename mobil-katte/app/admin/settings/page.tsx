"use client";

import { useState, type FormEvent } from "react";
import AdminLayout from "@/components/admin/AdminLayout";
import RequireAuth from "@/components/admin/RequireAuth";
import { useToast } from "@/components/Toast";
import { useCars } from "@/lib/data-context";
import type { Settings } from "@/lib/types";

const CARDS: Array<{ t: keyof Settings; d: keyof Settings; label: string }> = [
  { t: "about_card1_title", d: "about_card1_desc", label: "Kartu 1" },
  { t: "about_card2_title", d: "about_card2_desc", label: "Kartu 2" },
  { t: "about_card3_title", d: "about_card3_desc", label: "Kartu 3" },
  { t: "about_card4_title", d: "about_card4_desc", label: "Kartu 4" },
];

export default function AdminSettingsPage() {
  const { settings, saveSettings } = useCars();
  const toast = useToast();
  const [source, setSource] = useState("");
  const [form, setForm] = useState<Settings | null>(null);
  const [saving, setSaving] = useState(false);

  const sourceKey = settings ? Object.values(settings).join("\u0001") : "";

  if (settings && (form === null || source !== sourceKey)) {
    setSource(sourceKey);
    setForm({ ...settings });
  }

  const set = (key: keyof Settings, value: string) =>
    setForm((f) => (f ? { ...f, [key]: value } : f));

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!form) return;
    if (!form.wa_number.trim()) {
      toast("Nomor WhatsApp tidak boleh kosong.", "error");
      return;
    }
    setSaving(true);
    try {
      await saveSettings(form);
      toast("Pengaturan berhasil disimpan.");
    } catch (err) {
      toast(err instanceof Error ? err.message : "Gagal menyimpan pengaturan.", "error");
    } finally {
      setSaving(false);
    }
  };

  return (
    <RequireAuth>
      <AdminLayout
        active="settings"
        title="Pengaturan"
        subtitle="Kelola kontak, WhatsApp, dan konten Tentang Kami"
      >
        {form ? (
          <form onSubmit={handleSubmit}>
            <div className="card-panel mt-16">
              <h3>Kontak & WhatsApp</h3>
              <p className="panel-sub">
                Nomor WhatsApp dipakai untuk semua tombol chat dan link kontak di situs publik.
              </p>
              <div className="form-grid">
                <div className="field">
                  <label>
                    Nomor WhatsApp <span className="req">*</span>
                  </label>
                  <input
                    type="text"
                    placeholder="contoh: 6281234567890"
                    value={form.wa_number}
                    onChange={(e) => set("wa_number", e.target.value)}
                  />
                  <span className="hint">Format internasional tanpa + atau spasi. Contoh: 6281234567890</span>
                </div>
                <div className="field">
                  <label>Nomor Telepon (tampil di footer)</label>
                  <input
                    type="text"
                    placeholder="contoh: +62 812-3456-7890"
                    value={form.contact_phone}
                    onChange={(e) => set("contact_phone", e.target.value)}
                  />
                </div>
                <div className="field">
                  <label>Alamat (tampil di footer)</label>
                  <input
                    type="text"
                    placeholder="contoh: Jl. Mobil Katte No. 88, Makassar"
                    value={form.contact_address}
                    onChange={(e) => set("contact_address", e.target.value)}
                  />
                </div>
              </div>
            </div>

            <div className="card-panel mt-24">
              <h3>Tentang Kami</h3>
              <p className="panel-sub">Konten bagian &quot;Tentang Kami&quot; di halaman utama.</p>
              <div className="form-grid">
                <div className="field">
                  <label>Kicker</label>
                  <input
                    type="text"
                    placeholder="contoh: Kenapa Kami"
                    value={form.about_kicker}
                    onChange={(e) => set("about_kicker", e.target.value)}
                  />
                </div>
                <div className="field">
                  <label>Judul</label>
                  <input
                    type="text"
                    placeholder="contoh: Mengapa Mobil Katte?"
                    value={form.about_title}
                    onChange={(e) => set("about_title", e.target.value)}
                  />
                </div>
              </div>
              <div className="field mt-16">
                <label>Subjudul</label>
                <input
                  type="text"
                  value={form.about_subtitle}
                  onChange={(e) => set("about_subtitle", e.target.value)}
                />
              </div>
              <div className="field mt-16">
                <label>Paragraf Deskripsi (tampil di footer)</label>
                <textarea
                  rows={3}
                  value={form.about_description}
                  onChange={(e) => set("about_description", e.target.value)}
                />
              </div>
            </div>

            <div className="card-panel mt-24">
              <h3>Kartu Keunggulan</h3>
              <p className="panel-sub">Empat kartu yang tampil di bagian Tentang Kami.</p>
              {CARDS.map((c) => (
                <div className="mb-16" key={c.label}>
                  <div className="field">
                    <label>{c.label} — Judul</label>
                    <input
                      type="text"
                      value={form[c.t]}
                      onChange={(e) => set(c.t, e.target.value)}
                    />
                  </div>
                  <div className="field mt-16">
                    <label>{c.label} — Deskripsi</label>
                    <textarea
                      rows={2}
                      value={form[c.d]}
                      onChange={(e) => set(c.d, e.target.value)}
                    />
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-24" style={{ display: "flex", gap: 12, justifyContent: "flex-end" }}>
              <button type="submit" className="btn btn--primary btn--lg" disabled={saving}>
                {saving ? "Menyimpan..." : "Simpan Pengaturan"}
              </button>
            </div>
          </form>
        ) : (
          <div className="card-panel mt-16">Memuat pengaturan...</div>
        )}
      </AdminLayout>
    </RequireAuth>
  );
}