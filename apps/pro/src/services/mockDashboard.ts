import { Order, OrderStatus, PaymentStatus } from "@golfeexpress/types";

export interface RevenuePoint {
  label: string; // jour de la semaine
  value: number;
}

export const MOCK_REVENUE_WEEK: RevenuePoint[] = [
  { label: "Lun", value: 320 },
  { label: "Mar", value: 280 },
  { label: "Mer", value: 410 },
  { label: "Jeu", value: 390 },
  { label: "Ven", value: 520 },
  { label: "Sam", value: 680 },
  { label: "Dim", value: 590 },
];

export interface TopProduct {
  name: string;
  emoji: string;
  salesCount: number;
  revenue: number;
}

export const MOCK_TOP_PRODUCTS: TopProduct[] = [
  { name: "Poke Saumon", emoji: "🍣", salesCount: 87, revenue: 1296.3 },
  { name: "Poke Thon", emoji: "🐟", salesCount: 64, revenue: 1017.6 },
  { name: "Bubble Tea", emoji: "🧋", salesCount: 112, revenue: 616.0 },
  { name: "Poke Végétarien", emoji: "🥑", salesCount: 41, revenue: 528.9 },
];

export interface DashboardOrderRow {
  id: string;
  orderNumber: string;
  clientName: string;
  itemsSummary: string;
  total: number;
  status: OrderStatus;
  placedAtLabel: string;
}

export const MOCK_ORDERS_TABLE: DashboardOrderRow[] = [
  {
    id: "ord-1",
    orderNumber: "#GE-10234",
    clientName: "Sophie M.",
    itemsSummary: "2x Poke Saumon, 1x Bubble Tea",
    total: 35.3,
    status: OrderStatus.PREPARING,
    placedAtLabel: "Il y a 5 min",
  },
  {
    id: "ord-2",
    orderNumber: "#GE-10233",
    clientName: "Thomas R.",
    itemsSummary: "1x Poke Thon, 1x Poke Végétarien",
    total: 28.8,
    status: OrderStatus.READY,
    placedAtLabel: "Il y a 12 min",
  },
  {
    id: "ord-3",
    orderNumber: "#GE-10232",
    clientName: "Léa B.",
    itemsSummary: "3x Bubble Tea",
    total: 16.5,
    status: OrderStatus.RIDER_ASSIGNED,
    placedAtLabel: "Il y a 18 min",
  },
  {
    id: "ord-4",
    orderNumber: "#GE-10231",
    clientName: "Karim D.",
    itemsSummary: "1x Poke Saumon",
    total: 14.9,
    status: OrderStatus.DELIVERED,
    placedAtLabel: "Il y a 45 min",
  },
  {
    id: "ord-5",
    orderNumber: "#GE-10230",
    clientName: "Anna V.",
    itemsSummary: "2x Poke Thon, 2x Bubble Tea",
    total: 42.8,
    status: OrderStatus.DELIVERED,
    placedAtLabel: "Il y a 1h",
  },
];

export const ORDER_STATUS_LABELS: Record<OrderStatus, { label: string; bg: string; text: string }> = {
  [OrderStatus.PENDING]: { label: "En attente", bg: "#FFF3E0", text: "#FF6B35" },
  [OrderStatus.CONFIRMED]: { label: "Confirmée", bg: "#E3F2FD", text: "#2196F3" },
  [OrderStatus.PREPARING]: { label: "En préparation", bg: "#FFF3E0", text: "#FF6B35" },
  [OrderStatus.READY]: { label: "Prête", bg: "#E3F2FD", text: "#2196F3" },
  [OrderStatus.RIDER_ASSIGNED]: { label: "Livreur assigné", bg: "#F3E5F5", text: "#9C27B0" },
  [OrderStatus.PICKED_UP]: { label: "Récupérée", bg: "#F3E5F5", text: "#9C27B0" },
  [OrderStatus.IN_DELIVERY]: { label: "En livraison", bg: "#F3E5F5", text: "#9C27B0" },
  [OrderStatus.DELIVERED]: { label: "Livrée", bg: "#E8F5E9", text: "#2ECC71" },
  [OrderStatus.CANCELLED]: { label: "Annulée", bg: "#FFEBEE", text: "#F44336" },
  [OrderStatus.REFUNDED]: { label: "Remboursée", bg: "#FFEBEE", text: "#F44336" },
};
