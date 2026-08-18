"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { useToast } from "@/components/Toast";
import { getBrandList, photoFallback, SLOT_NAMES, slugify } from "@/lib/data";
import { useCars } from "@/lib/storage";
import type { Car } from "@/lib/types";

const EMPTY_FORM = {
  brand: "",
  name: "",
  type: "",
  year: "",
  price: "",
  mileage: "",
  transmission: "Automatic",
  fuel: "Bensin",
  color: "",
  condition: "Bekas",
  taxStatus: "Aktif",
  taxExpiredAt: "",
  plate: "",
  location: "",
  status: "Tersedia",
  videoUrl: "",
  description: "",
};

const MAX_PHOTOS = 8;

export default function CarForm({ editingId }: { editingId?: number }) {
  const router = useRouter();
  const toast = useToast();
  const { cars, commit } = useCars(true);
  const [form, setForm] = useState({ ...EMPTY_FORM });
  const [photos, setPhotos] = useState<(string | null)[]>(Array(MAX_PHOTOS).fill(null));
  const [source, setSource] = useState("");

  const target = editingId ? cars.find((c) => c.id === editingId) : undefined;
  const sourceKey = editingId
    ? target
      ? `${editingId}@${target.slug}`
      : `${editingId}@pending`
    : "";

  if (sourceKey !== source) {
    setSource(sourceKey);
    if (target) {
      setForm({
        brand: target.brand,
        name: target.name,
        type: target.type,
        year: String(target.year),
        price: String(target.price),
        mileage: String(target.mileage),
        transmission: target.transmission,
        fuel: target.fuel,
        color: target.color,
        condition: target.condition,
        taxStatus: target.taxStatus,
        taxExpiredAt: target.taxExpiredAt || "",
        plate: target.plate,
        location: target.location,
        status: target.status,
        videoUrl: target.videoUrl || "",
        description: target.description,
      });
      const seed = Array(MAX_PHOTOS).fill(null) as (string | null)[];
      target.photos.forEach((p, i) => {
        if (i < MAX_PHOTOS) seed[i] = p;
      });
      setPhotos(seed);
    }
  }

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
      toast(`Foto ${SLOT_NAMES[index]} diperbarui.`);
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

  const filledCount = photos.filter(Boolean).length;

  const saveCar = (e: FormEvent) => {
    e.preventDefault();
    const brand = form.brand;
    const name = form.name.trim();
    const type = form.type.trim();
    const year = Number(form.year);
    const price = Number(form.price);

    if (!brand || !name || !type || !year || !price) {
      toast("Mohon lengkapi field bertanda * (Brand, Nama, Type, Tahun, Harga).", "error");
      return;
    }

    const data = {
      brand,
      name,
      type,
      year,
      price,
      mileage: Number(form.mileage) || 0,
      transmission: form.transmission,
      fuel: form.fuel,
      color: form.color.trim(),
      condition: form.condition,
      taxStatus: form.taxStatus,
      taxExpiredAt: form.taxExpiredAt.trim() || null,
      plate: form.plate.trim(),
      location: form.location.trim() || "Makassar",
      status: form.status,
      videoUrl: form.videoUrl.trim(),
      description: form.description.trim(),
      photos: filledCount ? (photos.filter(Boolean) as string[]) : [photoFallback()],
    };

    const list = [...cars];
    if (editingId) {
      const car = list.find((c) => c.id === editingId);
      if (car) Object.assign(car, data);
      commit(list);
      toast("Data mobil berhasil diperbarui.");
    } else {
      const newId = list.reduce((m, c) => Math.max(m, c.id), 0) + 1;
      const newCar: Car = {
        ...data,
        id: newId,
        slug: slugify(brand + " " + name + " " + type + " " + year) + "-" + newId,
        featured: false,
        createdAt: new Date().toISOString().slice(0, 10),
      };
      list.push(newCar);
      commit(list);
      toast("Mobil baru berhasil disimpan.");
    }
    setTimeout(() => router.push("/admin/cars"), 900);
  };

  return (
    <form onSubmit={saveCar}>
      <div className="card-panel mt-16">
        <h3>Informasi Mobil</h3>
        <p className="panel-sub">Data utama kendaraan yang tampil di katalog publik.</p>
        <div className="form-grid">
          <div className="field">
            <label>
              Brand <span className="req">*</span>
            </label>
            <select value={form.brand} onChange={(e) => set("brand", e.target.value)}>
              <option value="">-- Pilih Brand --</option>
              {getBrandList(cars).map((b) => (
                <option key={b}>{b}</option>
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
            <label>
              Type <span className="req">*</span>
            </label>
            <input
              type="text"
              placeholder="contoh: 1.5 G"
              required
              value={form.type}
              onChange={(e) => set("type", e.target.value)}
            />
          </div>
          <div className="field">
            <label>
              Tahun <span className="req">*</span>
            </label>
            <input
              type="number"
              min={1980}
              max={2027}
              placeholder="2022"
              required
              value={form.year}
              onChange={(e) => set("year", e.target.value)}
            />
          </div>
          <div className="field">
            <label>
              Harga (Rp) <span className="req">*</span>
            </label>
            <input
              type="number"
              min={0}
              placeholder="215000000"
              required
              value={form.price}
              onChange={(e) => set("price", e.target.value)}
            />
            <span className="hint">Masukkan angka penuh, tanpa titik. Contoh: 215000000</span>
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
            <label>Kondisi</label>
            <select value={form.condition} onChange={(e) => set("condition", e.target.value)}>
              <option>Bekas</option>
              <option>Baru</option>
            </select>
          </div>
          <div className="field">
            <label>Status Pajak</label>
            <select value={form.taxStatus} onChange={(e) => set("taxStatus", e.target.value)}>
              <option>Aktif</option>
              <option>Tidak Aktif</option>
            </select>
          </div>
          <div className="field">
            <label>Pajak Berlaku Sampai</label>
            <input
              type="text"
              placeholder="contoh: 15 Desember 2026"
              value={form.taxExpiredAt}
              onChange={(e) => set("taxExpiredAt", e.target.value)}
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
            <label>Status Kendaraan</label>
            <select value={form.status} onChange={(e) => set("status", e.target.value)}>
              <option>Tersedia</option>
              <option>Dipesan</option>
              <option>Terjual</option>
              <option>Tidak Aktif</option>
            </select>
          </div>
          <div className="field">
            <label>Tautan Link Video</label>
            <input
              type="url"
              placeholder="https://www.youtube.com/watch?v=..."
              value={form.videoUrl}
              onChange={(e) => set("videoUrl", e.target.value)}
            />
            <span className="hint">Opsional. Tempel link video YouTube/Instagram mobil.</span>
          </div>
        </div>
        <div className="field mt-16">
          <label>Deskripsi</label>
          <textarea
            placeholder="Deskripsi kondisi kendaraan, riwayat servis, keunggulan, dll."
            value={form.description}
            onChange={(e) => set("description", e.target.value)}
          />
        </div>
      </div>

      <div className="card-panel mt-24">
        <h3>Foto Mobil</h3>
        <p className="panel-sub">
          Foto pertama = foto utama / thumbnail. Maks 5 MB per foto (JPG, PNG, WebP). Klik slot untuk
          mengganti foto.
        </p>
        <div className="upload-actions">
          <button type="button" className="btn btn--dark btn--lg" onClick={() => document.getElementById("photoFileInput")?.click()}>
            Unggah Foto
          </button>
          <span className="upload-hint" id="uploadHint">
            {filledCount
              ? `${filledCount} foto terpilih (${filledCount === MAX_PHOTOS ? "semua slot terisi" : `${filledCount}/${MAX_PHOTOS} slot terisi`})`
              : "Belum ada foto terpilih"}
          </span>
          <input
            type="file"
            id="photoFileInput"
            accept="image/*"
            multiple
            style={{ display: "none" }}
            onChange={(e) => onPhotosPicked(e.target.files)}
          />
        </div>
        <div className="upload-grid" id="uploadGrid">
          {SLOT_NAMES.map((name, i) => {
            const photo = photos[i];
            return (
              <label className={`upload-slot${photo ? " is-primary" : ""}`} key={name}>
                {i === 0 && photo ? <span className="primary-tag">UTAMA</span> : null}
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

      <div className="mt-24" style={{ display: "flex", gap: 12, justifyContent: "flex-end", flexWrap: "wrap" }}>
        <a href="/admin/cars" className="btn btn--outline btn--lg">
          Batal
        </a>
        <button type="submit" className="btn btn--primary btn--lg" id="saveBtn">
          {editingId ? "Update Mobil" : "Simpan Mobil"}
        </button>
      </div>
    </form>
  );
}