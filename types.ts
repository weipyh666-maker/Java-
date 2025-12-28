export type DeliveryMode = 'delivery' | 'pickup';

export enum OrderStatus {
  PENDING_PAYMENT = '待付款',
  PREPARING = '商家准备中',
  DELIVERING = '配送中',
  READY_FOR_PICKUP = '待取餐',
  COMPLETED = '已完成',
  CANCELLED = '已取消'
}

export interface MenuItem {
  id: string;
  name: string;
  price: number;
  image: string;
  description?: string;
  category: string; // Added category for menu grouping
  sales?: number; // Monthly sales
}

export interface Review {
  id: string;
  userName: string;
  userAvatar: string;
  rating: number;
  date: string;
  content: string;
  images?: string[];
  reply?: string;
}

export interface VendorInfo {
  address: string;
  phone: string;
  openingHours: string;
  licenseImage?: string;
  announcement?: string;
  services: string[]; // e.g. ["WIFI", "Parking"]
}

export interface Vendor {
  id: string;
  name: string;
  rating: number;
  ratingCount: number;
  distance: string; // e.g. "1.2km"
  timeEstimate: string; // e.g. "30-40 min"
  deliveryFee?: number;
  minOrderPrice?: number;
  tags: string[]; // e.g. ["Fast Food", "Burgers"]
  image: string;
  promotion?: string;
  isPickupAvailable: boolean;
  address?: string;
  menu?: MenuItem[]; // Added optional menu
  reviews?: Review[]; // Added reviews
  info?: VendorInfo; // Added detailed info
}

export interface Order {
  id: string;
  vendorId: string; // Added vendorId for navigation
  vendorName: string;
  vendorImage: string;
  items: { name: string; quantity: number; price: number }[];
  totalAmount: number;
  status: OrderStatus;
  date: string;
  mode: DeliveryMode;
}

export interface User {
  name: string;
  phone: string;
  avatar: string;
  balance: number;
  points: number;
  coupons: number;
}