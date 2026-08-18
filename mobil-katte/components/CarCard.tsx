"use client";

import Link from "next/link";
import { formatRupiah, photoFallback } from "@/lib/data";
import type { Car } from "@/lib/types";
import { StatusBadge, TaxBadge } from "./Badges";
import { IconCalendar, IconGauge, IconGear } from "./icons";
import SmartImage from "./SmartImage";

export default function CarCard({ car }: { car: Car }) {
  const sold = car.status === "Terjual";
  const img = car.photos && car.photos.length ? car.photos[0] : photoFallback();
  const href = `/mobil/${car.slug}`;

  return (
    <article className="car-card">
      <Link className="car-card__media" href={href}>
        {sold ? <span className="badge badge--sold">TERJUAL</span> : null}
        <SmartImage src={img} alt={`${car.brand} ${car.name} ${car.type} ${car.year}`} />
        <TaxBadge status={car.taxStatus} />
      </Link>

      <div className="car-card__body">
        <div className="car-card__meta">
          <span className="car-card__brand">{car.brand}</span>
          <StatusBadge status={car.status} />
        </div>
        <h3 className="car-card__title">
          <Link href={href}>
            {car.brand} {car.name}
          </Link>
        </h3>
        <p className="car-card__type">Type: {car.type}</p>
        <ul className="car-card__specs">
          <li>
            <IconCalendar /> {car.year}
          </li>
          <li>
            <IconGauge /> {car.mileage.toLocaleString("id-ID")} km
          </li>
          <li>
            <IconGear /> {car.transmission}
          </li>
        </ul>
        <div className="car-card__price">{formatRupiah(car.price)}</div>
        <div className="car-card__footer">
          <Link href={href} className="btn btn--primary btn--block">
            Lihat Detail
          </Link>
        </div>
      </div>
    </article>
  );
}