"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import AdminLayout from "@/components/admin/AdminLayout";
import CarForm from "@/components/admin/CarForm";
import RequireAuth from "@/components/admin/RequireAuth";

export default function AdminEditCarPage() {
  const params = useParams<{ id: string }>();
  const id = Number(params?.id);

  return (
    <RequireAuth>
      <AdminLayout
        active="car-form"
        title="Edit Mobil"
        subtitle="Perbarui informasi kendaraan di bawah ini"
        action={
          <Link href="/admin/cars" className="btn btn--outline">
            ← Kembali
          </Link>
        }
      >
        <CarForm editingId={Number.isFinite(id) ? id : undefined} />
      </AdminLayout>
    </RequireAuth>
  );
}