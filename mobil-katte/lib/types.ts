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
  contact_phone: string;
  contact_address: string;
  about_kicker: string;
  about_title: string;
  about_subtitle: string;
  about_description: string;
  about_card1_title: string;
  about_card1_desc: string;
  about_card2_title: string;
  about_card2_desc: string;
  about_card3_title: string;
  about_card3_desc: string;
  about_card4_title: string;
  about_card4_desc: string;
}

export interface AdminSession {
  email: string;
  name: string;
  token: string;
  loginAt: string;
}