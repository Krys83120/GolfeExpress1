import { create } from "zustand";
import type { Product } from "@golfeexpress/types";
import { MOCK_MENU_PRODUCTS } from "@/services/mockMenu";

interface ProMenuState {
  products: Product[];
  toggleAvailability: (productId: string) => void;
  deleteProduct: (productId: string) => void;
  addProduct: (product: Omit<Product, "id" | "proId">) => void;
  updateProduct: (productId: string, updates: Partial<Product>) => void;
}

export const useProMenuStore = create<ProMenuState>((set) => ({
  products: MOCK_MENU_PRODUCTS,

  toggleAvailability: (productId) =>
    set((state) => ({
      products: state.products.map((p) =>
        p.id === productId ? { ...p, isAvailable: !p.isAvailable } : p
      ),
    })),

  deleteProduct: (productId) =>
    set((state) => ({
      products: state.products.filter((p) => p.id !== productId),
    })),

  addProduct: (product) =>
    set((state) => ({
      products: [...state.products, { ...product, id: `prod-${Date.now()}`, proId: "pro-poke-paradise" }],
    })),

  updateProduct: (productId, updates) =>
    set((state) => ({
      products: state.products.map((p) => (p.id === productId ? { ...p, ...updates } : p)),
    })),
}));
