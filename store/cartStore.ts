import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { CartItem } from '../types';

interface CartState {
  items: CartItem[];
  isOpen: boolean;
  addItem: (item: Omit<CartItem, 'id'>) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  toggleDrawer: () => void;
  setIsOpen: (isOpen: boolean) => void;
}

export const useCartStore = create<CartState>()(
  persist(
    (set) => ({
      items: [],
      isOpen: false,
      addItem: (item) =>
        set((state) => {
          const virtualId = `${item.product.id}-${item.selectedSize}-${item.selectedColor.name}`;
          const existingItem = state.items.find((i) => i.id === virtualId);
          if (existingItem) {
            return {
              items: state.items.map((i) =>
                i.id === virtualId ? { ...i, quantity: i.quantity + item.quantity } : i
              ),
              isOpen: true,
            };
          }
          return {
            items: [...state.items, { ...item, id: virtualId }],
            isOpen: true,
          };
        }),
      removeItem: (id) =>
        set((state) => ({ items: state.items.filter((i) => i.id !== id) })),
      updateQuantity: (id, quantity) =>
        set((state) => ({
          items: state.items.map((i) =>
            i.id === id ? { ...i, quantity: Math.max(1, quantity) } : i
          ),
        })),
      clearCart: () => set({ items: [] }),
      toggleDrawer: () => set((state) => ({ isOpen: !state.isOpen })),
      setIsOpen: (isOpen: boolean) => set({ isOpen }),
    }),
    {
      name: 'alvina-cart-storage',
      partialize: (state) => ({ items: state.items }), // Only persist items
    }
  )
);
