export interface Product {
  id: string;
  category: string;
  name: string;
  subtext: string;
  price: number;
  badge?: string; // e.g., 'Organic', 'Top Rated', 'On Sale', 'Bulk Deal', 'Cold Pressed', 'Antioxidant', 'Bestseller', 'Eco-Refill'
  image: string;
  rating?: number;
  reviewsCount?: number;
  description?: string;
  isOrganic?: boolean;
}

export interface CartItem {
  id: string; // matches product ID
  product: Product;
  quantity: number;
}

export interface UserRecord {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'user';
  avatarInitials: string;
  orderDate?: string;
  amount?: number;
  status?: 'Paid' | 'Pending';
}

export type ScreenType = 'home' | 'shop' | 'cart' | 'login' | 'admin';
