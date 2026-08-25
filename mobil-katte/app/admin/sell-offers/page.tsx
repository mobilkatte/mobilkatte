"use client";

import { useEffect, useMemo, useState } from "react";
import AdminLayout from "@/components/admin/AdminLayout";
import RequireAuth from "@/components/admin/RequireAuth";
import SellOfferModal from "@/components/admin/SellOfferModal";
import { IconSearch } from "@/components/icons";
import { useToast } from "@/components/Toast";
import { formatRupiah, offerStatusClass } from "@/lib/data";
import { fetchSellOffers, updateSellOffer } from "@/lib/api";
import type { SellOffer, SellOfferStatus } from "@/lib/types";

const STATUS_FILTERS = ["", "Baru", "Dihubungi", "Diterima", "Ditolak"];

export default function AdminSellOffersPage() {
  const toast = useToast();
  const [offers, setOffers] = useState<SellOffer[]>([]);
  const [loading, setLoading] = useState(true);
  const [kw, setKw] = useState("");
  const [fStatus, setFStatus] = useState("");
  const [selected, setSelected] = useState<SellOffer | null>(null);

  const load = async () => {
    setLoading(true);
    try {
      const data = await fetchSellOffers({ keyword: kw || undefined, status: fStatus || undefined });
      setOffers(data);
    } catch (err) {
      toast(err instanceof Error ? err.message : "Gagal memuat penawaran.", "error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // setState di sini terjadi setelah await (async), bukan sinkron.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const stats = useMemo(() => {
    const baru = offers.filter((o) => o.status === "Baru").length;
    const diterima = offers.filter((o) => o.status === "Diterima").length;
    const ditolak = offers.filter((o) => o.status === "Ditolak").length;
    return { total: offers.length, baru, diterima, ditolak };
  }, [offers]);

  const onStatusQuick = async (offer: SellOffer, status: SellOfferStatus) => {
    try {
      await updateSellOffer(offer.id, { status });
      setOffers((list) => list.map((o) => (o.id === offer.id ? { ...o, status } : o)));
      toast(`Status penawaran diubah ke "${status}".`);
    } catch (err) {
      toast(err instanceof Error ? err.message : "Gagal mengubah status.", "error");
    }
  };

  const onDelete = (id: number) => {
    setOffers((list) => list.filter((o) => o.id !== id));
    toast("Penawaran dihapus.");
  };

  return (
    <RequireAuth>
      <AdminLayout
        active="sell-offers"
        title="Penawaran Mobil"
        subtitle="Penawaran mobil dari user yang menawarkan kendaraannya dibeli"
      >
        <div className="stats">
          <div className="stat-card stat-card--1">
            <div>
              <div className="num">{stats.total}</div>
              <div className="lbl">Total Penawaran</div>
            </div>
          </div>
          <div className="stat-card stat-card--2">
            <div>
              <div className="num">{stats.baru}</div>
              <div className="lbl">Baru</div>
            </div>
          </div>
          <div className="stat-card stat-card--4">
            <div>
              <div className="num">{stats.diterima}</div>
              <div className="lbl">Diterima</div>
            </div>
          </div>
          <div className="stat-card stat-card--3">
            <div>
              <div className="num">{stats.ditolak}</div>
              <div className="lbl">Ditolak</div>
            </div>
          </div>
        </div>

        <div className="card-panel mt-24">
          <div className="data-toolbar">
            <div className="search">
              <span className="search-icon">
                <IconSearch />
              </span>
              <input
                type="text"
                placeholder="Cari brand, mobil, penjual, no. wa..."
                value={kw}
                onChange={(e) => {
                  setKw(e.target.value);
                  setTimeout(load, 300);
                }}
              />
            </div>
            <div className="filters">
              <select
                value={fStatus}
                onChange={(e) => {
                  setFStatus(e.target.value);
                  setTimeout(load, 0);
                }}
              >
                {STATUS_FILTERS.map((s) => (
                  <option key={s || "all"} value={s}>
                    {s || "Semua Status"}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {loading ? (
            <p className="panel-sub">Memuat...</p>
          ) : offers.length === 0 ? (
            <p className="panel-sub">Belum ada penawaran mobil masuk.</p>
          ) : (
            <div className="table-wrap">
              <table className="data-table">
                <thead>
                  <tr>
                    <th>Foto</th>
                    <th>Mobil</th>
                    <th>Penjual</th>
                    <th>Harga</th>
                    <th>Status</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {offers.map((o) => (
                    <tr key={o.id}>
                      <td>
                        {o.photos.length ? (
                          <img className="thumb" src={o.photos[0]} alt={o.name} />
                        ) : (
                          <span className="thumb thumb--empty">-</span>
                        )}
                      </td>
                      <td>
                        <b>
                          {o.brand} {o.name} {o.type}
                        </b>
                        <div className="muted small">
                          {o.year ?? "-"} · {o.location || "-"}
                        </div>
                      </td>
                      <td>
                        {o.sellerName}
                        <div className="muted small">{o.sellerPhone}</div>
                      </td>
                      <td>{o.price != null ? formatRupiah(o.price) : "-"}</td>
                      <td>
                        <span className={`badge ${offerStatusClass(o.status)}`}>{o.status}</span>
                        <div className="row-actions">
                          {(["Dihubungi", "Diterima", "Ditolak"] as SellOfferStatus[]).map((s) =>
                            s === o.status ? null : (
                              <button
                                key={s}
                                className="link-btn"
                                onClick={() => onStatusQuick(o, s)}
                              >
                                {s}
                              </button>
                            )
                          )}
                        </div>
                      </td>
                      <td>
                        <button className="btn btn--outline btn--sm" onClick={() => setSelected(o)}>
                          Detail
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {selected ? (
          <SellOfferModal
            offer={selected}
            onClose={() => setSelected(null)}
            onChange={(updated) => {
              setOffers((list) => list.map((o) => (o.id === updated.id ? updated : o)));
            }}
            onDelete={onDelete}
          />
        ) : null}
      </AdminLayout>
    </RequireAuth>
  );
}
