import { create } from "zustand";
import { OrderStatus } from "@golfeexpress/types";

export interface ActiveDelivery {
  orderId: string;
  proName: string;
  proEmoji: string;
  routeLabel: string; // ex: "Port Grimaud → Sainte-Maxime"
  earnings: number;
  tip: number;
  step: 0 | 1 | 2 | 3; // 0: accepté, 1: récupéré, 2: en route, 3: livré
}

interface RiderSessionState {
  isOnline: boolean;
  toggleOnline: () => void;

  activeDelivery: ActiveDelivery | null;
  acceptOrder: (delivery: ActiveDelivery) => void;
  advanceStep: () => void;
  completeDelivery: () => void;

  todayEarnings: number;
  todayDeliveries: number;
  todayRating: number;
  onlineSinceMinutes: number;
}

export const useRiderSessionStore = create<RiderSessionState>((set, get) => ({
  isOnline: true,
  toggleOnline: () => set((state) => ({ isOnline: !state.isOnline })),

  activeDelivery: null,
  acceptOrder: (delivery) => set({ activeDelivery: delivery }),

  advanceStep: () =>
    set((state) => {
      if (!state.activeDelivery) return state;
      const nextStep = Math.min(3, state.activeDelivery.step + 1) as ActiveDelivery["step"];
      return { activeDelivery: { ...state.activeDelivery, step: nextStep } };
    }),

  completeDelivery: () =>
    set((state) => ({
      activeDelivery: null,
      todayEarnings: state.todayEarnings + (state.activeDelivery?.earnings ?? 0) + (state.activeDelivery?.tip ?? 0),
      todayDeliveries: state.todayDeliveries + 1,
    })),

  todayEarnings: 87.5,
  todayDeliveries: 12,
  todayRating: 4.9,
  onlineSinceMinutes: 200, // 3h20
}));

// Mapping step -> statut de commande global (pour cohérence avec OrderStatus du schéma Prisma)
export function stepToOrderStatus(step: ActiveDelivery["step"]): OrderStatus {
  switch (step) {
    case 0:
      return OrderStatus.RIDER_ASSIGNED;
    case 1:
      return OrderStatus.PICKED_UP;
    case 2:
      return OrderStatus.IN_DELIVERY;
    case 3:
      return OrderStatus.DELIVERED;
  }
}
