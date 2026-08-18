"use client";

import type { Car } from "@/lib/types";
import { IconTrash } from "@/components/icons";

export default function DeleteModal({
  target,
  onClose,
  onConfirm,
}: {
  target: Car | null;
  onClose: () => void;
  onConfirm: () => void;
}) {
  return (
    <div className={`modal-backdrop${target ? " show" : ""}`} id="deleteModal">
      <div className="modal">
        <div className="modal-icon" id="icTrash">
          <IconTrash />
        </div>
        <h3>Hapus Kendaraan?</h3>
        <p>Apakah Anda yakin ingin menghapus kendaraan ini?</p>
        <div className="modal-actions">
          <button className="btn btn--outline" onClick={onClose}>
            Batal
          </button>
          <button className="btn btn--dark" onClick={onConfirm}>
            Hapus
          </button>
        </div>
      </div>
    </div>
  );
}