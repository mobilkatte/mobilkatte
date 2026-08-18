export interface Car {
  id: number;
  slug: string;
  brand: string;
  name: string;
  type: string;
  year: number;
  price: number;
  mileage: number;
  transmission: string;
  fuel: string;
  color: string;
  taxStatus: string;
  taxExpiredAt: string | null;
  condition: string;
  location: string;
  plate: string;
  videoUrl?: string;
  description: string;
  status: string;
  featured: boolean;
  createdAt: string;
  photos: string[];
  deletedAt?: string;
}