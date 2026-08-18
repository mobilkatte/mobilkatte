"use client";

import Link from "next/link";
import AdminLayout from "@/components/admin/AdminLayout";
import CarForm from "@/components/admin/CarForm";
import RequireAuth from "@/components/admin/RequireAuth";

export default function AdminNewCarPage() {
  return (
    <RequireAuth>
      <AdminLayout
        active="car-form"
        title="Tambah Mobil"
        subtitle="Lengkapi informasi kendaraan di bawah ini"
        action={
          <Link href="/admin/cars" className="btn btn--outline">
            ← Kembali
          </Link>
        }
      >
        <CarForm />
      </AdminLayout>
    </RequireAuth>
  );
}