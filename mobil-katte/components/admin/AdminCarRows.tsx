"use client";

import Link from "next/link";
import { formatShortPrice, photoFallback, statusBadgeClass, taxBadgeClass } from "@/lib/data";
import type { Car } from "@/lib/types";
import { IconEdit, IconTrash } from "@/components/icons";
import SmartImage from "@/components/SmartImage";

export default function AdminCarRows({
  cars,
  onDelete,
}: {
  cars: Car[];
  onDelete: (car: Car) => void;
}) {
  if (!cars.length) {
    return (
      <tr className="empty-row">
        <td colSpan={8}>Tidak ada data mobil.</td>
      </tr>
    );
  }

  return (
    <>
      {cars.map((c) => {
        const thumb = c.photos && c.photos.length ? c.photos[0] : photoFallback();
        return (
          <tr key={c.id}>
            <td>
              <SmartImage className="thumb" src={thumb} alt={c.name} />
            </td>
            <td>
              <b>
                {c.brand} {c.name}
              </b>
            </td>
            <td>{c.type}</td>
            <td>{c.year}</td>
            <td>{formatShortPrice(c.price)}</td>
            <td>
              <span className={`badge ${taxBadgeClass(c.taxStatus)}`}>{c.taxStatus}</span>
            </td>
            <td>
              <span className={`badge ${statusBadgeClass(c.status)}`}>{c.status}</span>
            </td>
            <td>
              <div className="row-actions">
                <Link className="action-btn action-btn--edit" href={`/admin/cars/${c.id}/edit`}>
                  <IconEdit /> Edit
                </Link>
                <button className="action-btn action-btn--del" onClick={() => onDelete(c)}>
                  <IconTrash /> Hapus
                </button>
              </div>
            </td>
          </tr>
        );
      })}
    </>
  );
}