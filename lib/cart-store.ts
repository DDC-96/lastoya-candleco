"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
  scent: string;
}

interface CartState {
  items: CartItem[];
  isOpen: boolean;
  addItem: (item: Omit<CartItem, "quantity">) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  openCart: () => void;
  closeCart: () => void;
  total: number;
  itemCount: number;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      isOpen: false,

      total: 0,
      itemCount: 0,

      addItem: (item) => {
        set((state) => {
          const items = state.items.find((i) => i.id === item.id)
            ? state.items.map((i) =>
                i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
              )
            : [...state.items, { ...item, quantity: 1 }];
          return {
            items,
            isOpen: true,
            itemCount: items.reduce((sum, i) => sum + i.quantity, 0),
            total: items.reduce((sum, i) => sum + i.price * i.quantity, 0),
          };
        });
      },

      removeItem: (id) =>
        set((state) => {
          const items = state.items.filter((i) => i.id !== id);
          return {
            items,
            itemCount: items.reduce((sum, i) => sum + i.quantity, 0),
            total: items.reduce((sum, i) => sum + i.price * i.quantity, 0),
          };
        }),

      updateQuantity: (id, quantity) => {
        if (quantity <= 0) {
          get().removeItem(id);
          return;
        }
        set((state) => {
          const items = state.items.map((i) =>
            i.id === id ? { ...i, quantity } : i
          );
          return {
            items,
            itemCount: items.reduce((sum, i) => sum + i.quantity, 0),
            total: items.reduce((sum, i) => sum + i.price * i.quantity, 0),
          };
        });
      },

      clearCart: () => set({ items: [] }),
      openCart: () => set({ isOpen: true }),
      closeCart: () => set({ isOpen: false }),
    }),
    {
      name: "lastoya-cart",
    }
  )
);
