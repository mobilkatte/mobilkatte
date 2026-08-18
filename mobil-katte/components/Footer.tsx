"use client";

import Link from "next/link";
import { WA_NUMBER } from "@/lib/data";
import { useCars } from "@/lib/data-context";
import { IconFacebook, IconInstagram, IconMap, IconPhone, IconTiktok, IconWhatsapp } from "./icons";

export default function Footer() {
  const { settings } = useCars();
  const waNumber = settings?.wa_number || WA_NUMBER;
  const phone = settings?.contact_phone || "+62 812-3456-7890";
  const address = settings?.contact_address || "Jl. Mobil Katte No. 88, Makassar";
  const aboutText =
    settings?.about_description ||
    "Katalog mobil bekas yang cepat, sederhana, transparan, dan mudah dihubungi. Temukan mobil bekas berkualitas dengan informasi kendaraan yang jelas.";
  return (
    <footer className="footer" id="kontak">
      <div className="container footer__top">
        <div>
          <div className="logo">
            <img src="/assets/logo.png" alt="Mobil Katte" className="brand-logo" />
            <span>MOBIL KATTE</span>
          </div>
          <p>{aboutText}</p>
          <div className="footer__social">
            <a href="#" aria-label="Instagram">
              <IconInstagram />
            </a>
            <a href="#" aria-label="Facebook">
              <IconFacebook />
            </a>
            <a href="#" aria-label="TikTok">
              <IconTiktok />
            </a>
          </div>
        </div>

        <div>
          <h4>Menu</h4>
          <ul>
            <li><Link href="/">Home</Link></li>
            <li><Link href="/mobil">Katalog Mobil</Link></li>
            <li><Link href="/#tentang">Tentang Kami</Link></li>
            <li><Link href="/admin/login">Login Admin</Link></li>
          </ul>
        </div>

        <div>
          <h4>Brand</h4>
          <ul>
            <li><Link href="/mobil?brand=toyota">Toyota</Link></li>
            <li><Link href="/mobil?brand=honda">Honda</Link></li>
            <li><Link href="/mobil?brand=mitsubishi">Mitsubishi</Link></li>
            <li><Link href="/mobil?brand=daihatsu">Daihatsu</Link></li>
          </ul>
        </div>

        <div>
          <h4>Kontak</h4>
          <ul>
            <li style={{ display: "flex", gap: 8, alignItems: "center" }}>
              <IconWhatsapp />
              <a href={`https://wa.me/${waNumber}`} target="_blank" rel="noopener noreferrer">
                WhatsApp
              </a>
            </li>
            <li style={{ display: "flex", gap: 8, alignItems: "center" }}>
              <IconPhone />
              <span>{phone}</span>
            </li>
            <li style={{ display: "flex", gap: 8, alignItems: "center" }}>
              <IconMap />
              <span>{address}</span>
            </li>
          </ul>
        </div>
      </div>

      <div className="footer__bottom">
        <div className="container">
          © {new Date().getFullYear()} MOBIL KATTE — Katalog Mobil Bekas. Semua hak dilindungi.
        </div>
      </div>
    </footer>
  );
}