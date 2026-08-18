"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { findCarBySlug, formatRupiah, formatShortPrice, photoFallback, waLink } from "@/lib/data";
import { useCars } from "@/lib/storage";
import { StatusBadge, TaxBadge } from "@/components/Badges";
import SmartImage from "@/components/SmartImage";
import {
  IconCalendar,
  IconColor,
  IconFuel,
  IconGauge,
  IconGear,
  IconMap,
  IconSearch,
  IconWhatsapp,
} from "@/components/icons";

export default function CarDetail() {
  const params = useParams<{ slug: string }>();
  const { cars } = useCars();
  const slug = typeof params?.slug === "string" ? params.slug : "";
  const car = useMemo(() => findCarBySlug(cars, slug), [cars, slug]);
  const [galleryIndex, setGalleryIndex] = useState(0);
  const [prevSlug, setPrevSlug] = useState(slug);

  if (slug !== prevSlug) {
    setPrevSlug(slug);
    setGalleryIndex(0);
  }

  useEffect(() => {
    if (!car) return;
    const title = `${car.brand} ${car.name} ${car.type} ${car.year} ${formatShortPrice(car.price)} | Mobil Katte`;
    document.title = title;
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute(
        "content",
        `${car.brand} ${car.name} ${car.type} tahun ${car.year}, pajak ${car.taxStatus.toLowerCase()}, harga ${formatRupiah(car.price)}. Lihat foto dan detail kendaraan di Mobil Katte.`
      );
    }
    const ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle) ogTitle.setAttribute("content", title);
  }, [car]);

  if (!car) {
    return (
      <div className="container" style={{ paddingTop: 36 }}>
        <div className="empty-state">
          <div className="icon">
            <IconSearch />
          </div>
          <h3>Mobil tidak ditemukan</h3>
          <p>Mobil yang Anda cari tidak tersedia.</p>
          <Link href="/mobil" className="btn btn--primary mt-16">
            Kembali ke Katalog
          </Link>
        </div>
      </div>
    );
  }

  const photos = car.photos && car.photos.length ? car.photos : [photoFallback()];
  const index = Math.min(galleryIndex, photos.length - 1);

  const taxBadge = (
    <TaxBadge status={car.taxStatus} expiredAt={car.taxExpiredAt} withDetail />
  );

  const videoHTML = car.videoUrl ? (
    <a
      href={car.videoUrl}
      target="_blank"
      rel="noopener"
      style={{ display: "inline-flex", alignItems: "center", gap: 6, color: "var(--accent-dark)", fontWeight: 700, textDecoration: "underline" }}
    >
      <svg width={15} height={15} viewBox="0 0 24 24" fill="currentColor">
        <path d="M23 7.2a3 3 0 0 0-2.1-2.1C19 4.5 12 4.5 12 4.5s-7 0-8.9.6A3 3 0 0 0 1 7.2 31 31 0 0 0 .5 12 31 31 0 0 0 1 16.8a3 3 0 0 0 2.1 2.1c1.9.6 8.9.6 8.9.6s7 0 8.9-.6a3 3 0 0 0 2.1-2.1A31 31 0 0 0 23.5 12 31 31 0 0 0 23 7.2ZM9.8 15V9l6.2 3Z" />
      </svg>
      Lihat Video Kendaraan
    </a>
  ) : (
    "—"
  );

  const specs: Array<[string, React.ReactNode]> = [
    ["Brand", car.brand],
    ["Nama Mobil", car.name],
    ["Type", car.type],
    ["Tahun", car.year],
    ["Harga", formatRupiah(car.price)],
    ["Transmisi", car.transmission],
    ["Bahan Bakar", car.fuel],
    ["Kilometer", car.mileage.toLocaleString("id-ID") + " KM"],
    ["Warna", car.color],
    ["Pajak", car.taxStatus],
    ["Kondisi", car.condition],
    ["Plat", car.plate],
    ["Lokasi", car.location],
    ["Status", car.status],
    ["Video", videoHTML],
  ];

  const waHref = waLink(car);

  return (
    <div className="container">
      <nav className="breadcrumb">
        <Link href="/">Home</Link>
        <span className="sep">/</span>
        <Link href="/mobil">Katalog Mobil</Link>
        <span className="sep">/</span>
        <span>
          {car.brand} {car.name}
        </span>
      </nav>

      <div className="detail">
        <div className="gallery">
          <div className="gallery__main">
            <button className="gallery__nav gallery__nav--prev" onClick={() => setGalleryIndex((index - 1 + photos.length) % photos.length)}>
              ‹
            </button>
            <button className="gallery__nav gallery__nav--next" onClick={() => setGalleryIndex((index + 1) % photos.length)}>
              ›
            </button>
            <span className="gallery__count">
              {index + 1} / {photos.length}
            </span>
            <SmartImage src={photos[index]} alt={`Foto ${car.brand} ${car.name}`} lazy={false} />
          </div>
          <div className="gallery__thumbs">
            {photos.map((p, i) => (
              <button key={i} className={i === index ? "active" : ""} onClick={() => setGalleryIndex(i)}>
                <SmartImage src={p} alt={`Foto ${i + 1}`} />
              </button>
            ))}
          </div>
        </div>

        <aside className="detail-info">
          <div className="detail-info__head">
            <span className="brand">{car.brand}</span>
            <h1>
              {car.brand} {car.name}
            </h1>
            <p className="type">
              Type: {car.type} · {car.year}
            </p>
            <div className="mt-8">{taxBadge}</div>
            <div className="mt-8">
              <StatusBadge status={car.status} />
            </div>
          </div>

          <div className="detail-info__price">
            <span className="label">Harga</span>
            <div className="value">{formatRupiah(car.price)}</div>
          </div>

          <div className="detail-info__body">
            <div className="info-list">
              <div className="info-item">
                <span className="ic">
                  <IconCalendar />
                </span>
                <span>
                  <span>Tahun</span>
                  <b>{car.year}</b>
                </span>
              </div>
              <div className="info-item">
                <span className="ic">
                  <IconGauge />
                </span>
                <span>
                  <span>Kilometer</span>
                  <b>{car.mileage.toLocaleString("id-ID")} km</b>
                </span>
              </div>
              <div className="info-item">
                <span className="ic">
                  <IconGear />
                </span>
                <span>
                  <span>Transmisi</span>
                  <b>{car.transmission}</b>
                </span>
              </div>
              <div className="info-item">
                <span className="ic">
                  <IconFuel />
                </span>
                <span>
                  <span>Bahan Bakar</span>
                  <b>{car.fuel}</b>
                </span>
              </div>
              <div className="info-item">
                <span className="ic">
                  <IconColor />
                </span>
                <span>
                  <span>Warna</span>
                  <b>{car.color}</b>
                </span>
              </div>
              <div className="info-item">
                <span className="ic">
                  <IconMap />
                </span>
                <span>
                  <span>Lokasi</span>
                  <b>{car.location}</b>
                </span>
              </div>
            </div>
          </div>

          <div className="detail-info__contact">
            <a href={waHref} target="_blank" className="btn btn--green btn--lg btn--block">
              <IconWhatsapp /> Tanya Mobil Ini
            </a>
          </div>
        </aside>
      </div>

      <div className="detail-specs">
        <h2>Spesifikasi Kendaraan</h2>
        <table className="spec-table">
          <tbody>
            {specs.map(([label, value]) => (
              <tr key={label}>
                <th>{label}</th>
                <td>{value}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="detail-desc">
        <div className="card">
          <h2>Deskripsi</h2>
          <p>{car.description}</p>
        </div>
      </div>
    </div>
  );
}