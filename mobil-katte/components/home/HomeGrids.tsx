"use client";

import CarCard from "@/components/CarCard";
import { useCars } from "@/lib/data-context";

export function FeaturedGrid() {
  const { cars } = useCars();
  const featured = cars.filter((c) => c.featured && c.status !== "Terjual").slice(0, 4);

  return (
    <div className="grid" id="featuredGrid">
      {featured.map((car) => (
        <CarCard key={car.id} car={car} />
      ))}
    </div>
  );
}

export function NewestGrid() {
  const { cars } = useCars();
  const newest = cars
    .filter((c) => c.status !== "Terjual")
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, 8);

  return (
    <div className="grid" id="newGrid">
      {newest.map((car) => (
        <CarCard key={car.id} car={car} />
      ))}
    </div>
  );
}