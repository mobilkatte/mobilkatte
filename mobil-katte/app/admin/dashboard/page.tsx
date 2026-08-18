"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import AdminCarRows from "@/components/admin/AdminCarRows";
import AdminLayout from "@/components/admin/AdminLayout";
import DeleteModal from "@/components/admin/DeleteModal";
import RequireAuth from "@/components/admin/RequireAuth";
import { IconCar2, IconCheck, IconClose, IconMoney, IconSearch, IconShield } from "@/components/icons";
import { useToast } from "@/components/Toast";
import { formatRupiah } from "@/lib/data";
import { useCars } from "@/lib/storage";
import type { Car } from "@/lib/types";

export default function AdminDashboardPage() {
  const { cars, commit } = useCars();
  const toast = useToast();
  const [kw, setKw] = useState("");
  const [deleteTarget, setDeleteTarget] = useState<Car | null>(null);

  const stats = useMemo(() => {
    const total = cars.length;
    const aktif = cars.filter((c) => c.status === "Tersedia" || c.status === "Dipesan").length;
    const pajakAktif = cars.filter((c) => c.taxStatus === "Aktif").length;
    const pajakNon = cars.filter((c) => c.taxStatus !== "Aktif").length;
    const totalNilai = cars.reduce((sum, c) => sum + c.price, 0);
    return { total, aktif, pajakAktif, pajakNon, totalNilai };
  }, [cars]);

  const recent = useMemo(() => {
    const q = kw.trim().toLowerCase();
    let list = [...cars].sort(
      (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
    if (q) {
      list = list.filter((c) =>
        (c.name + " " + c.brand + " " + c.type + " " + c.year).toLowerCase().includes(q)
      );
    }
    return list.slice(0, 6);
  }, [cars, kw]);

  const confirmDelete = () => {
    if (!deleteTarget) return;
    const list = [...cars];
    const car = list.find((c) => c.id === deleteTarget.id);
    if (car) {
      car.deletedAt = new Date().toISOString();
      commit(list);
      toast("Kendaraan berhasil dihapus (soft delete).");
    }
    setDeleteTarget(null);
  };

  return (
    <RequireAuth>
      <AdminLayout
        active="dashboard"
        title="Dashboard"
        subtitle="Ringkasan statistik katalog Mobil Katte"
        action={
          <Link href="/admin/cars/new" className="btn btn--primary">
            + Tambah Mobil
          </Link>
        }
      >
        <div className="stats">
          <div className="stat-card stat-card--1">
            <div className="icon">
              <IconCar2 />
            </div>
            <div>
              <div className="num" id="stTotal">
                {stats.total}
              </div>
              <div className="lbl">Total Mobil</div>
            </div>
          </div>
          <div className="stat-card stat-card--2">
            <div className="icon">
              <IconCheck />
            </div>
            <div>
              <div className="num" id="stAktif">
                {stats.aktif}
              </div>
              <div className="lbl">Mobil Aktif</div>
            </div>
          </div>
          <div className="stat-card stat-card--3">
            <div className="icon">
              <IconShield />
            </div>
            <div>
              <div className="num" id="stPajak">
                {stats.pajakAktif}
              </div>
              <div className="lbl">Pajak Aktif</div>
            </div>
          </div>
          <div className="stat-card stat-card--4">
            <div className="icon">
              <IconClose />
            </div>
            <div>
              <div className="num" id="stNonPajak">
                {stats.pajakNon}
              </div>
              <div className="lbl">Pajak Tidak Aktif</div>
            </div>
          </div>
          <div className="stat-card stat-card--5">
            <div className="icon">
              <IconMoney />
            </div>
            <div>
              <div className="num" id="stNilai" style={{ fontSize: 17 }}>
                {formatRupiah(stats.totalNilai)}
              </div>
              <div className="lbl">Total Nilai Inventory</div>
            </div>
          </div>
        </div>

        <div className="card-panel">
          <h3>Mobil Terbaru</h3>
          <p className="panel-sub">Unit yang paling baru dimasukkan ke katalog.</p>
          <div className="data-toolbar">
            <div className="search">
              <span className="search-icon" id="icRecentSearch">
                <IconSearch />
              </span>
              <input
                id="recentSearch"
                type="text"
                placeholder="Cari mobil terbaru, brand, tipe..."
                value={kw}
                onChange={(e) => setKw(e.target.value)}
              />
            </div>
            <span className="catalog__toolbar count" id="recentCount">
              {kw.trim()
                ? <>Menampilkan <b>{recent.length}</b> hasil untuk &quot;{kw.trim()}&quot;</>
                : "Menampilkan 6 unit terbaru"}
            </span>
          </div>
          <div className="table-wrap">
            <table className="data-table">
              <thead>
                <tr>
                  <th>Foto</th>
                  <th>Mobil</th>
                  <th>Type</th>
                  <th>Tahun</th>
                  <th>Harga</th>
                  <th>Pajak</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody id="recentRows">
                <AdminCarRows cars={recent} onDelete={setDeleteTarget} />
              </tbody>
            </table>
          </div>
        </div>

        <DeleteModal
          target={deleteTarget}
          onClose={() => setDeleteTarget(null)}
          onConfirm={confirmDelete}
        />
      </AdminLayout>
    </RequireAuth>
  );
}