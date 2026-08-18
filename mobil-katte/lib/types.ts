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

export interface CarInput {
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
  featured?: boolean;
  photos: string[];
}

export interface Brand {
  id: number;
  name: string;
  slug: string;
  count?: number;
}

export interface Settings {
  wa_number: string;
  admin_email: string;
}

export interface AdminSession {
  email: string;
  name: string;
  token: string;
  loginAt: string;
}