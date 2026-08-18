"use client";

import { useMemo, useState } from "react";
import AdminLayout from "@/components/admin/AdminLayout";
import RequireAuth from "@/components/admin/RequireAuth";
import { IconBrand, IconEdit, IconSearch, IconTrash } from "@/components/icons";
import { useToast } from "@/components/Toast";
import { useCars } from "@/lib/data-context";
import type { Brand } from "@/lib/types";

export default function AdminBrandsPage() {
  const { brands, addBrand, renameBrand, deleteBrandById } = useCars();
  const toast = useToast();
  const [kw, setKw] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [editingBrand, setEditingBrand] = useState<Brand | null>(null);
  const [input, setInput] = useState("");

  const filtered = useMemo(() => {
    const q = kw.trim().toLowerCase();
    return q ? brands.filter((b) => b.name.toLowerCase().includes(q)) : brands;
  }, [brands, kw]);

  const openAdd = () => {
    setEditingBrand(null);
    setInput("");
    setModalOpen(true);
  };

  const openEdit = (b: Brand) => {
    setEditingBrand(b);
    setInput(b.name);
    setModalOpen(true);
  };

  const closeModal = () => setModalOpen(false);

  const saveBrand = async () => {
    const name = input.trim();
    if (!name) {
      toast("Nama brand tidak boleh kosong.", "error");
      return;
    }
    try {
      if (editingBrand) {
        await renameBrand(editingBrand.id, name);
        toast("Brand berhasil diperbarui.");
      } else {
        await addBrand(name);
        toast("Brand berhasil ditambahkan.");
      }
    } catch (err) {
      toast(err instanceof Error ? err.message : "Gagal menyimpan brand.", "error");
      return;
    }
    closeModal();
  };

  const deleteBrand = async (b: Brand) => {
    try {
      await deleteBrandById(b.id);
      toast("Brand berhasil dihapus.");
    } catch (err) {
      toast(err instanceof Error ? err.message : "Gagal menghapus brand.", "error");
    }
  };

  return (
    <RequireAuth>
      <AdminLayout
        active="brands"
        title="Kelola Brand"
        subtitle="Daftar brand mobil yang tersedia di katalog"
        action={
          <button className="btn btn--primary" onClick={openAdd}>
            + Tambah Brand
          </button>
        }
      >
        <div className="data-toolbar">
          <div className="search">
            <span className="search-icon" id="icSearch">
              <IconSearch />
            </span>
            <input
              id="brandSearch"
              type="text"
              placeholder="Cari brand..."
              value={kw}
              onChange={(e) => setKw(e.target.value)}
            />
          </div>
        </div>

        <div className="card-panel">
          <div className="table-wrap">
            <table className="data-table">
              <thead>
                <tr>
                  <th>No</th>
                  <th>Nama Brand</th>
                  <th>Slug</th>
                  <th>Jumlah Mobil</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody id="brandRows">
                {filtered.length ? (
                  filtered.map((b, i) => (
                    <tr key={b.id}>
                      <td>{i + 1}</td>
                      <td>
                        <b>{b.name}</b>
                      </td>
                      <td>{b.slug}</td>
                      <td>{b.count ?? 0}</td>
                      <td>
                        <div className="row-actions">
                          <button className="action-btn action-btn--edit" onClick={() => openEdit(b)}>
                            <IconEdit /> Edit
                          </button>
                          <button className="action-btn action-btn--del" onClick={() => deleteBrand(b)}>
                            <IconTrash /> Hapus
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr className="empty-row">
                    <td colSpan={5}>Tidak ada brand.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        <div className={`modal-backdrop${modalOpen ? " show" : ""}`} id="brandModal">
          <div className="modal">
            <div className="modal-icon" style={{ background: "var(--accent-soft)", color: "var(--accent-dark)" }} id="icBrand">
              <IconBrand />
            </div>
            <h3 id="brandModalTitle">{editingBrand ? "Edit Brand" : "Tambah Brand"}</h3>
            <div className="field">
              <label>Nama Brand</label>
              <input
                id="brandInput"
                type="text"
                placeholder="contoh: Toyota"
                value={input}
                onChange={(e) => setInput(e.target.value)}
              />
            </div>
            <div className="modal-actions mt-24">
              <button className="btn btn--outline" onClick={closeModal}>
                Batal
              </button>
              <button className="btn btn--primary" onClick={saveBrand}>
                Simpan
              </button>
            </div>
          </div>
        </div>
      </AdminLayout>
    </RequireAuth>
  );
}