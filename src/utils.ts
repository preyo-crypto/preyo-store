import { Product, Order, CartItem } from './types';
import { DEMO_PRODUCTS } from './constants';

const STORAGE_KEYS = {
  PRODUCTS: 'preyo_products',
  ORDERS: 'preyo_orders',
  CART: 'preyo_cart',
  ADMIN_AUTH: 'preyo_admin_auth',
};

export const getProducts = (): Product[] => {
  const saved = localStorage.getItem(STORAGE_KEYS.PRODUCTS);
  if (!saved) {
    localStorage.setItem(STORAGE_KEYS.PRODUCTS, JSON.stringify(DEMO_PRODUCTS));
    return DEMO_PRODUCTS;
  }
  return JSON.parse(saved);
};

export const saveProducts = (products: Product[]) => {
  localStorage.setItem(STORAGE_KEYS.PRODUCTS, JSON.stringify(products));
};

export const getOrders = (): Order[] => {
  const saved = localStorage.getItem(STORAGE_KEYS.ORDERS);
  return saved ? JSON.parse(saved) : [];
};

export const saveOrders = (orders: Order[]) => {
  localStorage.setItem(STORAGE_KEYS.ORDERS, JSON.stringify(orders));
};

export const getCart = (): CartItem[] => {
  const saved = localStorage.getItem(STORAGE_KEYS.CART);
  return saved ? JSON.parse(saved) : [];
};

export const saveCart = (cart: CartItem[]) => {
  localStorage.setItem(STORAGE_KEYS.CART, JSON.stringify(cart));
};

export const generateOrderId = () => {
  return 'ORD-' + Math.random().toString(36).substr(2, 9).toUpperCase();
};
