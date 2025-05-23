import { create } from 'zustand';
import { CartItem, Product } from '../types/product';

interface CartStore {
  items: CartItem[];
  addItem: (product: Product) => void;
  removeItem: (productId: number) => void;
  updateQuantity: (productId: number, quantity: number) => void;
  clearCart: () => void;
  total: () => number;
}

export const useCartStore = create<CartStore>((set, get) => ({
  items: [],
  addItem: (product) => {
    set((state) => {
      const existingItem = state.items.find(item => item.product.id === product.id);
      if (existingItem) {
        return {
          items: state.items.map(item =>
            item.product.id === product.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          ),
        };
      }
      return { items: [...state.items, { product, quantity: 1 }] };
    });
  },
  removeItem: (productId) => {
    set((state) => ({
      items: state.items.filter(item => item.product.id !== productId),
    }));
  },
  updateQuantity: (productId, quantity) => {
    set((state) => ({
      items: state.items.map(item =>
        item.product.id === productId
          ? { ...item, quantity: Math.max(0, quantity) }
          : item
      ),
    }));
  },
  clearCart: () => set({ items: [] }),
  total: () => {
    const items = get().items;
    return items.reduce((sum, item) => sum + (item.product.priceNumber * item.quantity), 0);
  },
}));