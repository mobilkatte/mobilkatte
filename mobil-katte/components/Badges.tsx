import { statusBadgeClass, taxBadgeClass } from "@/lib/data";
import { IconShield } from "./icons";

export function TaxBadge({
  status,
  expiredAt,
  withDetail = false,
}: {
  status: string;
  expiredAt?: string | null;
  withDetail?: boolean;
}) {
  if (status === "Aktif") {
    return (
      <span className={`badge ${taxBadgeClass(status)}`}>
        <IconShield /> Pajak Aktif
        {withDetail && expiredAt ? (
          <span style={{ fontWeight: 500 }}> · Berlaku sampai {expiredAt}</span>
        ) : null}
      </span>
    );
  }
  return <span className={`badge ${taxBadgeClass(status)}`}>Pajak Tidak Aktif</span>;
}

export function StatusBadge({ status }: { status: string }) {
  return <span className={`badge ${statusBadgeClass(status)}`}>{status}</span>;
}