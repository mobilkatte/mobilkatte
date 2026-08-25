"use client";

import { useState, type FormEvent } from "react";
import { useToast } from "@/components/Toast";
import { BRANDS, SLOT_NAMES } from "@/lib/data";
import { createSellOffer } from "@/lib/api";
import type { SellOfferInput } from "@/lib/types";

const MAX_PHOTOS = 8;

const EMPTY_FORM = {
  sellerName: "",
  sellerPhone: "",
  sellerEmail: "",
  brand: "",
  name: "",
  type: "",
  year: "",
  price: "",
  mileage: "",
  transmission: "Automatic",
  fuel: "Bensin",
  color: "",
  taxStatus: "Aktif",
  location: "",
  plate: "",
  description: "",
};

export default function SellCarSection() {
  const toast = useToast();
  const [form, setForm] = useState({ ...EMPTY_FORM });
  const [photos, setPhotos] = useState<(string | null)[]>(Array(MAX_PHOTOS).fill(null));
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);

  const set = (key: string, value: string) => setForm((f) => ({ ...f, [key]: value }));

  const onPick = (index: number, file: File) => {
    if (file.size > 5 * 1024 * 1024) {
      toast("Ukuran foto maksimal 5 MB.", "error");
      return;
    }
    const reader = new FileReader();
    reader.onload = (e) => {
      setPhotos((p) => {
        const next = [...p];
        next[index] = String(e.target?.result ?? "");
        return next;
      });
    };
    reader.readAsDataURL(file);
  };

  const onPhotosPicked = (files: FileList | null) => {
    if (!files) return;
    const accepted: File[] = [];
    Array.from(files).forEach((file) => {
      if (file.size > 5 * 1024 * 1024) {
        toast(`Foto "${file.name}" terlalu besar (maks 5 MB).`, "error");
        return;
      }
      accepted.push(file);
    });
    let remaining = MAX_PHOTOS - photos.filter(Boolean).length;
    accepted.forEach((file) => {
      if (remaining <= 0) {
        toast("Slot foto sudah penuh (maks 8 foto).", "error");
        return;
      }
      const reader = new FileReader();
      reader.onload = (e) => {
        const data = String(e.target?.result ?? "");
        setPhotos((p) => {
          const idx = p.findIndex((v) => !v);
          if (idx === -1) return p;
          const next = [...p];
          next[idx] = data;
          return next;
        });
      };
      reader.readAsDataURL(file);
      remaining--;
    });
  };

  const removePhoto = (index: number) => {
    setPhotos((p) => {
      const next = [...p];
      next[index] = null;
      return next;
    });
  };

  const filledCount = photos.filter(Boolean).length;

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const name = form.name.trim();
    const sellerName = form.sellerName.trim();
    const sellerPhone = form.sellerPhone.trim();

    if (!form.brand || !name || !sellerName || !sellerPhone) {
      toast("Mohon lengkapi field bertanda * (Brand, Nama Mobil, Nama Penjual, No. WhatsApp).", "error");
      return;
    }

    const input: SellOfferInput = {
      brand: form.brand,
      name,
      type: form.type.trim(),
      year: form.year ? Number(form.year) : null,
      price: form.price ? Number(form.price) : null,
      mileage: Number(form.mileage) || 0,
      transmission: form.transmission,
      fuel: form.fuel,
      color: form.color.trim(),
      taxStatus: form.taxStatus,
      location: form.location.trim(),
      plate: form.plate.trim(),
      description: form.description.trim(),
      sellerName,
      sellerPhone,
      sellerEmail: form.sellerEmail.trim() || null,
      photos: filledCount ? (photos.filter(Boolean) as string[]) : [],
    };

    setSubmitting(true);
    try {
      await createSellOffer(input);
      setDone(true);
      toast("Penawaran mobil berhasil dikirim. Admin akan meninjau segera.");
      setForm({ ...EMPTY_FORM });
      setPhotos(Array(MAX_PHOTOS).fill(null));
    } catch (err) {
      toast(err instanceof Error ? err.message : "Gagal mengirim penawaran.", "error");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section className="section section--alt" id="jual-mobil">
      <div className="container">
        <div className="section-head">
          <span className="kicker">Jual Cepat</span>
          <h2>Tawarkan Mobil Anda</h2>
          <p>
            Punya mobil bekas dan ingin menjualnya? Isi data mobil di bawah ini, kami dari Mobil Katte
            akan meninjau dan menghubungi Anda jika tertarik membeli.
          </p>
        </div>

        {done ? (
          <div className="card-panel ta-center">
            <h3>Terima kasih!</h3>
            <p className="panel-sub">
              Penawaran mobil Anda sudah kami terima. Tim Mobil Katte akan meninjau dan menghubungi Anda
              melalui WhatsApp atau telepon.
            </p>
            <button type="button" className="btn btn--dark btn--lg" onClick={() => setDone(false)}>
              Tawarkan Mobil Lain
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="card-panel">
            <h3>Data Penjual</h3>
            <p className="panel-sub">Kontak agar kami bisa menghubungi Anda.</p>
            <div className="form-grid">
              <div className="field">
                <label>
                  Nama Lengkap <span className="req">*</span>
                </label>
                <input
                  type="text"
                  placeholder="Nama Anda"
                  required
                  value={form.sellerName}
                  onChange={(e) => set("sellerName", e.target.value)}
                />
              </div>
              <div className="field">
                <label>
                  No. WhatsApp <span className="req">*</span>
                </label>
                <input
                  type="tel"
                  placeholder="0812xxxxxx"
                  required
                  value={form.sellerPhone}
                  onChange={(e) => set("sellerPhone", e.target.value)}
                />
              </div>
              <div className="field">
                <label>Email</label>
                <input
                  type="email"
                  placeholder="email@contoh.com"
                  value={form.sellerEmail}
                  onChange={(e) => set("sellerEmail", e.target.value)}
                />
              </div>
            </div>

            <h3 className="mt-24">Informasi Mobil</h3>
            <p className="panel-sub">Data kendaraan yang Anda tawarkan.</p>
            <div className="form-grid">
              <div className="field">
                <label>
                  Brand <span className="req">*</span>
                </label>
                <select value={form.brand} onChange={(e) => set("brand", e.target.value)}>
                  <option value="">-- Pilih Brand --</option>
                  {BRANDS.map((b) => (
                    <option key={b} value={b}>
                      {b}
                    </option>
                  ))}
                </select>
              </div>
              <div className="field">
                <label>
                  Nama Mobil <span className="req">*</span>
                </label>
                <input
                  type="text"
                  placeholder="contoh: Avanza"
                  required
                  value={form.name}
                  onChange={(e) => set("name", e.target.value)}
                />
              </div>
              <div className="field">
                <label>Type</label>
                <input
                  type="text"
                  placeholder="contoh: 1.5 G"
                  value={form.type}
                  onChange={(e) => set("type", e.target.value)}
                />
              </div>
              <div className="field">
                <label>Tahun</label>
                <input
                  type="number"
                  min={1980}
                  max={2027}
                  placeholder="2022"
                  value={form.year}
                  onChange={(e) => set("year", e.target.value)}
                />
              </div>
              <div className="field">
                <label>Harga yang Diharapkan (Rp)</label>
                <input
                  type="number"
                  min={0}
                  placeholder="215000000"
                  value={form.price}
                  onChange={(e) => set("price", e.target.value)}
                />
                <span className="hint">Angka penuh tanpa titik. Contoh: 215000000</span>
              </div>
              <div className="field">
                <label>Kilometer (KM)</label>
                <input
                  type="number"
                  min={0}
                  placeholder="35000"
                  value={form.mileage}
                  onChange={(e) => set("mileage", e.target.value)}
                />
              </div>
              <div className="field">
                <label>Transmisi</label>
                <select value={form.transmission} onChange={(e) => set("transmission", e.target.value)}>
                  <option>Automatic</option>
                  <option>Manual</option>
                  <option>CVT</option>
                  <option>Dual Clutch</option>
                </select>
              </div>
              <div className="field">
                <label>Bahan Bakar</label>
                <select value={form.fuel} onChange={(e) => set("fuel", e.target.value)}>
                  <option>Bensin</option>
                  <option>Diesel</option>
                  <option>Hybrid</option>
                  <option>Listrik</option>
                </select>
              </div>
              <div className="field">
                <label>Warna</label>
                <input
                  type="text"
                  placeholder="contoh: Hitam"
                  value={form.color}
                  onChange={(e) => set("color", e.target.value)}
                />
              </div>
              <div className="field">
                <label>Status Pajak</label>
                <select value={form.taxStatus} onChange={(e) => set("taxStatus", e.target.value)}>
                  <option>Aktif</option>
                  <option>Tidak Aktif</option>
                </select>
              </div>
              <div className="field">
                <label>Lokasi</label>
                <input
                  type="text"
                  placeholder="contoh: Makassar"
                  value={form.location}
                  onChange={(e) => set("location", e.target.value)}
                />
              </div>
              <div className="field">
                <label>Plat Nomor</label>
                <input
                  type="text"
                  placeholder="contoh: DD 1234 AB"
                  value={form.plate}
                  onChange={(e) => set("plate", e.target.value)}
                />
              </div>
            </div>
            <div className="field mt-16">
              <label>Deskripsi</label>
              <textarea
                placeholder="Ceritakan kondisi kendaraan, riwayat servis, keunggulan, dll."
                value={form.description}
                onChange={(e) => set("description", e.target.value)}
              />
            </div>

            <div className="card-panel mt-24">
              <h3>Foto Mobil</h3>
              <p className="panel-sub">
                Opsional. Foto membantu kami menilai mobil Anda. Maks 5 MB per foto (JPG, PNG, WebP).
              </p>
              <div className="upload-actions">
                <button
                  type="button"
                  className="btn btn--dark btn--lg"
                  onClick={() => document.getElementById("sellPhotoInput")?.click()}
                >
                  Unggah Foto
                </button>
                <span className="upload-hint">
                  {filledCount
                    ? `${filledCount} foto terpilih (${filledCount}/${MAX_PHOTOS} slot)`
                    : "Belum ada foto terpilih"}
                </span>
                <input
                  type="file"
                  id="sellPhotoInput"
                  accept="image/*"
                  multiple
                  style={{ display: "none" }}
                  onChange={(e) => onPhotosPicked(e.target.files)}
                />
              </div>
              <div className="upload-grid">
                {SLOT_NAMES.map((name, i) => {
                  const photo = photos[i];
                  return (
                    <label className={`upload-slot${photo ? " is-primary" : ""}`} key={name}>
                      {photo ? (
                        <button
                          type="button"
                          className="remove"
                          aria-label={`Hapus ${name}`}
                          title="Hapus foto"
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            removePhoto(i);
                          }}
                        >
                          ×
                        </button>
                      ) : null}
                      {photo ? <img src={photo} alt={name} /> : null}
                      <span className="tag">{photo ? name : "+ " + name}</span>
                      <span className="note">{photo ? "Klik untuk ganti" : "Klik untuk upload"}</span>
                      <input
                        type="file"
                        accept="image/*"
                        style={{ display: "none" }}
                        onChange={(e) => {
                          const f = e.target.files?.[0];
                          if (f) onPick(i, f);
                        }}
                      />
                    </label>
                  );
                })}
              </div>
            </div>

            <div className="mt-24" style={{ display: "flex", justifyContent: "flex-end" }}>
              <button type="submit" className="btn btn--primary btn--lg" disabled={submitting}>
                {submitting ? "Mengirim..." : "Kirim Penawaran"}
              </button>
            </div>
          </form>
        )}
      </div>
    </section>
  );
}
