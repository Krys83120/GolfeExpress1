import { create } from "zustand";
import { OrderStatus } from "@golfeexpress/types";
import { MOCK_PRO_ORDERS, type ProOrderRow } from "@/services/mockProOrders";

interface ProOrdersState {
  orders: ProOrderRow[];
  advanceStatus: (orderId: string, nextStatus: OrderStatus) => void;
  cancelOrder: (orderId: string) => void;
}

export const useProOrdersStore = create<ProOrdersState>((set) => ({
  orders: MOCK_PRO_ORDERS,
  advanceStatus: (orderId, nextStatus) =>
    set((state) => ({
      orders: state.orders.map((o) => (o.id === orderId ? { ...o, status: nextStatus } : o)),
    })),
  cancelOrder: (orderId) =>
    set((state) => ({
      orders: state.orders.map((o) => (o.id === orderId ? { ...o, status: OrderStatus.CANCELLED } : o)),
    })),
}));
