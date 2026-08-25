"use client";

import { useState } from "react";
import { formatRupiah } from "@/lib/data";
import { deleteSellOffer, updateSellOffer } from "@/lib/api";
import type { SellOffer, SellOfferStatus } from "@/lib/types";

const STATUS_OPTIONS: SellOfferStatus[] = ["Baru", "Dihubungi", "Diterima", "Ditolak"];

export default function SellOfferModal({
  offer,
  onClose,
  onChange,
  onDelete,
}: {
  offer: SellOffer;
  onClose: () => void;
  onChange: (updated: SellOffer) => void;
  onDelete: (id: number) => void;
}) {
  const [status, setStatus] = useState<SellOfferStatus>(offer.status);
  const [note, setNote] = useState(offer.adminNote ?? "");
  const [saving, setSaving] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false);

  const save = async () => {
    setSaving(true);
    try {
      await updateSellOffer(offer.id, { status, adminNote: note });
      onChange({ ...offer, status, adminNote: note });
      onClose();
    } catch (err) {
      alert(err instanceof Error ? err.message : "Gagal menyimpan.");
    } finally {
      setSaving(false);
    }
  };

  const doDelete = async () => {
    setSaving(true);
    try {
      await deleteSellOffer(offer.id);
      onDelete(offer.id);
      onClose();
    } catch (err) {
      alert(err instanceof Error ? err.message : "Gagal menghapus.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-head">
          <h3>
            {offer.brand} {offer.name} {offer.type}
          </h3>
          <button className="modal-close" onClick={onClose} aria-label="Tutup">
            ×
          </button>
        </div>

        <div className="modal-body">
          {offer.photos.length ? (
            <div className="offer-photos">
              {offer.photos.map((p, i) => (
                <img key={i} src={p} alt={`Foto ${i + 1}`} />
              ))}
            </div>
          ) : (
            <p className="muted">Tidak ada foto.</p>
          )}

          <div className="offer-grid">
            <div>
              <span>Tahun</span>
              <b>{offer.year ?? "-"}</b>
            </div>
            <div>
              <span>Harga Harapan</span>
              <b>{offer.price != null ? formatRupiah(offer.price) : "-"}</b>
            </div>
            <div>
              <span>Kilometer</span>
              <b>{offer.mileage ? offer.mileage.toLocaleString("id-ID") + " KM" : "-"}</b>
            </div>
            <div>
              <span>Transmisi</span>
              <b>{offer.transmission || "-"}</b>
            </div>
            <div>
              <span>Bahan Bakar</span>
              <b>{offer.fuel || "-"}</b>
            </div>
            <div>
              <span>Warna</span>
              <b>{offer.color || "-"}</b>
            </div>
            <div>
              <span>Status Pajak</span>
              <b>{offer.taxStatus}</b>
            </div>
            <div>
              <span>Lokasi</span>
              <b>{offer.location || "-"}</b>
            </div>
            <div>
              <span>Plat</span>
              <b>{offer.plate || "-"}</b>
            </div>
          </div>

          <div className="offer-seller">
            <h4>Data Penjual</h4>
            <div className="offer-grid">
              <div>
                <span>Nama</span>
                <b>{offer.sellerName}</b>
              </div>
              <div>
                <span>WhatsApp</span>
                <b>
                  <a href={`https://wa.me/${offer.sellerPhone.replace(/\D/g, "")}`} target="_blank" rel="noreferrer">
                    {offer.sellerPhone}
                  </a>
                </b>
              </div>
              <div>
                <span>Email</span>
                <b>{offer.sellerEmail || "-"}</b>
              </div>
            </div>
          </div>

          {offer.description ? (
            <div className="offer-desc">
              <h4>Deskripsi</h4>
              <p>{offer.description}</p>
            </div>
          ) : null}

          <div className="field mt-16">
            <label>Status Penawaran</label>
            <select value={status} onChange={(e) => setStatus(e.target.value as SellOfferStatus)}>
              {STATUS_OPTIONS.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
          </div>

          <div className="field mt-16">
            <label>Catatan Admin</label>
            <textarea
              placeholder="Catatan internal (opsional)"
              value={note}
              onChange={(e) => setNote(e.target.value)}
            />
          </div>
        </div>

        <div className="modal-foot">
          {confirmDelete ? (
            <div className="confirm-row">
              <span>Hapus penawaran ini?</span>
              <button className="btn btn--danger" onClick={doDelete} disabled={saving}>
                Ya, Hapus
              </button>
              <button className="btn btn--outline" onClick={() => setConfirmDelete(false)} disabled={saving}>
                Batal
              </button>
            </div>
          ) : (
            <>
              <button className="btn btn--danger" onClick={() => setConfirmDelete(true)} disabled={saving}>
                Hapus
              </button>
              <button className="btn btn--primary" onClick={save} disabled={saving}>
                {saving ? "Menyimpan..." : "Simpan"}
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
