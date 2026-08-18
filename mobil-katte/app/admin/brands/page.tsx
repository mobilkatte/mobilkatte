"use client";

import { useMemo, useState } from "react";
import AdminLayout from "@/components/admin/AdminLayout";
import RequireAuth from "@/components/admin/RequireAuth";
import { IconBrand, IconEdit, IconSearch, IconTrash } from "@/components/icons";
import { useToast } from "@/components/Toast";
import { getBrandList, slugify } from "@/lib/data";
import { useCars } from "@/lib/storage";

export default function AdminBrandsPage() {
  const { cars, commit } = useCars(true);
  const toast = useToast();
  const [kw, setKw] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [editingIndex, setEditingIndex] = useState(-1);
  const [input, setInput] = useState("");

  const brands = useMemo(() => {
    const q = kw.trim().toLowerCase();
    const list = getBrandList(cars);
    return q ? list.filter((b) => b.toLowerCase().includes(q)) : list;
  }, [cars, kw]);

  const countFor = (brand: string) => cars.filter((c) => c.brand === brand).length;

  const openAdd = () => {
    setEditingIndex(-1);
    setInput("");
    setModalOpen(true);
  };

  const openEdit = (i: number) => {
    const list = getBrandList(cars);
    setEditingIndex(list.indexOf(list[i]));
    setInput(list[i]);
    setModalOpen(true);
  };

  const closeModal = () => setModalOpen(false);

  const saveBrand = () => {
    const name = input.trim();
    if (!name) {
      toast("Nama brand tidak boleh kosong.", "error");
      return;
    }
    const list = [...cars];
    if (editingIndex >= 0) {
      const oldName = getBrandList(cars)[editingIndex];
      list.forEach((c) => {
        if (c.brand === oldName) c.brand = name;
      });
      commit(list);
      toast("Brand berhasil diperbarui.");
    } else {
      toast("Brand " + name + " ditambahkan (simulasi — ubah di database untuk MVP).");
    }
    closeModal();
  };

  const deleteBrand = (i: number) => {
    const name = getBrandList(cars)[i];
    toast("Brand " + name + " dihapus (simulasi).", "error");
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
                {brands.length ? (
                  brands.map((b, i) => (
                    <tr key={b}>
                      <td>{i + 1}</td>
                      <td>
                        <b>{b}</b>
                      </td>
                      <td>{slugify(b)}</td>
                      <td>{countFor(b)}</td>
                      <td>
                        <div className="row-actions">
                          <button className="action-btn action-btn--edit" onClick={() => openEdit(i)}>
                            <IconEdit /> Edit
                          </button>
                          <button className="action-btn action-btn--del" onClick={() => deleteBrand(i)}>
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
            <h3 id="brandModalTitle">{editingIndex >= 0 ? "Edit Brand" : "Tambah Brand"}</h3>
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