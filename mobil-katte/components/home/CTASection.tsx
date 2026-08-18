"use client";

import { useCars } from "@/lib/data-context";
import { WA_NUMBER } from "@/lib/data";

export default function CTASection() {
  const { settings } = useCars();
  const wa = settings?.wa_number || WA_NUMBER;
  const href = `https://wa.me/${wa}?text=${encodeURIComponent(
    "Halo Mobil Katte, saya mencari mobil bekas..."
  )}`;

  return (
    <section className="section">
      <div className="container">
        <div className="cta">
          <h2>Tidak menemukan mobil yang Anda cari?</h2>
          <p>
            Kami bantu cari mobil bekas sesuai budget dan kebutuhan Anda. Cukup kirim pesan ke
            WhatsApp kami.
          </p>
          <a href={href} target="_blank" className="btn btn--white btn--lg">
            Chat via WhatsApp
          </a>
        </div>
      </div>
    </section>
  );
}