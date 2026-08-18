"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import AdminCarRows from "@/components/admin/AdminCarRows";
import AdminLayout from "@/components/admin/AdminLayout";
import DeleteModal from "@/components/admin/DeleteModal";
import RequireAuth from "@/components/admin/RequireAuth";
import { IconSearch } from "@/components/icons";
import { useToast } from "@/components/Toast";
import { useCars } from "@/lib/data-context";
import type { Car } from "@/lib/types";

const PER_PAGE = 6;

export default function AdminCarsPage() {
  const { cars, brands, removeCar } = useCars();
  const toast = useToast();
  const [kw, setKw] = useState("");
  const [fBrand, setFBrand] = useState("");
  const [fTax, setFTax] = useState("");
  const [fStatus, setFStatus] = useState("");
  const [page, setPage] = useState(1);
  const [deleteTarget, setDeleteTarget] = useState<Car | null>(null);

  const filtered = useMemo(() => {
    const q = kw.trim().toLowerCase();
    let list = [...cars];
    if (q) {
      list = list.filter((c) =>
        (c.name + " " + c.brand + " " + c.type + " " + c.year).toLowerCase().includes(q)
      );
    }
    if (fBrand) list = list.filter((c) => c.brand === fBrand);
    if (fTax) list = list.filter((c) => c.taxStatus === fTax);
    if (fStatus) list = list.filter((c) => c.status === fStatus);
    return list;
  }, [cars, kw, fBrand, fTax, fStatus]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PER_PAGE));
  const current = Math.min(page, totalPages);
  const pageItems = filtered.slice((current - 1) * PER_PAGE, current * PER_PAGE);

  const confirmDelete = async () => {
    if (!deleteTarget) return;
    try {
      await removeCar(deleteTarget.id);
      toast("Kendaraan berhasil dihapus (soft delete).");
    } catch (err) {
      toast(err instanceof Error ? err.message : "Gagal menghapus kendaraan.", "error");
    }
    setDeleteTarget(null);
  };

  return (
    <RequireAuth>
      <AdminLayout
        active="cars"
        title="Data Mobil"
        subtitle="Kelola seluruh kendaraan di katalog"
        action={
          <Link href="/admin/cars/new" className="btn btn--primary">
            + Tambah Mobil
          </Link>
        }
      >
        <div className="data-toolbar">
          <div className="search">
            <span className="search-icon" id="icSearch">
              <IconSearch />
            </span>
            <input
              id="tableSearch"
              type="text"
              placeholder="Cari mobil, brand, tipe..."
              value={kw}
              onChange={(e) => {
                setKw(e.target.value);
                setPage(1);
              }}
            />
          </div>
          <div className="filters">
            <select
              id="fBrand"
              value={fBrand}
              onChange={(e) => {
                setFBrand(e.target.value);
                setPage(1);
              }}
            >
              <option value="">Semua Brand</option>
              {brands.map((b) => (
                <option key={b.id} value={b.name}>
                  {b.name}
                </option>
              ))}
            </select>
            <select
              id="fTax"
              value={fTax}
              onChange={(e) => {
                setFTax(e.target.value);
                setPage(1);
              }}
            >
              <option value="">Semua Pajak</option>
              <option>Aktif</option>
              <option>Tidak Aktif</option>
            </select>
            <select
              id="fStatus"
              value={fStatus}
              onChange={(e) => {
                setFStatus(e.target.value);
                setPage(1);
              }}
            >
              <option value="">Semua Status</option>
              <option>Tersedia</option>
              <option>Dipesan</option>
              <option>Terjual</option>
              <option>Tidak Aktif</option>
            </select>
          </div>
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
            <tbody id="carsRows">
              <AdminCarRows cars={pageItems} onDelete={setDeleteTarget} />
            </tbody>
          </table>
        </div>

        {totalPages > 1 ? (
          <div className="pagination" id="carsPagination">
            <button onClick={() => setPage(current - 1)} disabled={current === 1}>
              ← Sebelumnya
            </button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
              <button key={p} className={p === current ? "active" : ""} onClick={() => setPage(p)}>
                {p}
              </button>
            ))}
            <button onClick={() => setPage(current + 1)} disabled={current === totalPages}>
              Berikutnya →
            </button>
          </div>
        ) : null}

        <DeleteModal
          target={deleteTarget}
          onClose={() => setDeleteTarget(null)}
          onConfirm={confirmDelete}
        />
      </AdminLayout>
    </RequireAuth>
  );
}