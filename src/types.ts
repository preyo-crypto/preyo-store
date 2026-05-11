export type Category = 'Classic' | 'Oversized' | 'Graphic' | 'Couple' | 'Premium' | 'Custom';
export type Size = 'S' | 'M' | 'L' | 'XL' | 'XXL';
export type OrderStatus = 'Pending' | 'Confirmed' | 'Cancelled' | 'Delivered';
export type PaymentMethod = 'Cash on Delivery' | 'bKash' | 'Nagad';

export interface Product {
  id: string;
  name: string;
  price: number;
  category: Category;
  sizes: Size[];
  colors: string[];
  description: string;
  stock: number;
  imageUrl: string;
}

export interface CartItem extends Product {
  selectedSize: Size;
  selectedColor: string;
  quantity: number;
}

export interface Order {
  id: string;
  customerName: string;
  phoneNumber: string;
  email?: string;
  address: string;
  items: CartItem[];
  totalPrice: number;
  paymentMethod: PaymentMethod;
  note?: string;
  status: OrderStatus;
  createdAt: string;
}

export interface AdminStats {
  totalProducts: number;
  totalOrders: number;
  pendingOrders: number;
  confirmedOrders: number;
  totalSales: number;
}
