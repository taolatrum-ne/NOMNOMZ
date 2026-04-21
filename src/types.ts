export type DishTag = 'BBQ' | 'Hải sản' | 'Thịt' | 'Tráng miệng' | 'International' | 'Seafood' | 'đồ ngọt' | 'Fresh Mix' | 'fast food' | 'Veggie' | 'Meat Lover';

export interface Deal {
  id: string;
  restaurantName: string;
  restaurantId: string;
  price: number;
  originalPrice: number;
  pickupStart: string;
  pickupEnd: string;
  quantityRemaining: number;
  tags: DishTag[];
  distance: string;
  rating: number;
  type: string;
  description: string;
  images: string[];
  location: string;
  pickupLabel: string;
  options?: string[];
  specificWarning?: string;
  extraWarnings?: string[];
  certificationText?: string;
  isPaused?: boolean;
  terminalStatus?: 'active' | 'sold_out' | 'expired' | 'paused';
}

export interface User {
  id: string;
  name: string;
  phoneNumber: string;
  allergies: string[];
  favorites: string[];
}

export interface Order {
  id: string;
  dealId: string;
  restaurantName: string;
  quantity: number;
  price: number;
  status: 'pending' | 'accepted' | 'delivered';
  timestamp: string;
}

export interface AppNotification {
  id: string;
  title: string;
  message: string;
  timestamp: string;
  isRead: boolean;
  type: 'deal' | 'thanks' | 'system';
}
