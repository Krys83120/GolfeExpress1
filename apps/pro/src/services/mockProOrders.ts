import { OrderStatus } from "@golfeexpress/types";

export interface ProOrderItem {
  name: string;
  quantity: number;
}

export interface ProOrderRow {
  id: string;
  orderNumber: string;
  clientName: string;
  clientPhone: string;
  items: ProOrderItem[];
  total: number;
  status: OrderStatus;
  placedAt: Date;
  deliveryAddress: string;
  riderName?: string;
  clientNote?: string;
}

const now = Date.now();

export const MOCK_PRO_ORDERS: ProOrderRow[] = [
  {
    id: "ord-1",
    orderNumber: "#GE-10234",
    clientName: "Sophie M.",
    clientPhone: "06 12 34 56 78",
    items: [
      { name: "Poke Saumon", quantity: 2 },
      { name: "Bubble Tea", quantity: 1 },
    ],
    total: 35.3,
    status: OrderStatus.PREPARING,
    placedAt: new Date(now - 5 * 60 * 1000),
    deliveryAddress: "12 Av. de la Plage, Sainte-Maxime",
    clientNote: "Sans oignon svp",
  },
  {
    id: "ord-2",
    orderNumber: "#GE-10233",
    clientName: "Thomas R.",
    clientPhone: "06 98 76 54 32",
    items: [
      { name: "Poke Thon", quantity: 1 },
      { name: "Poke Végétarien", quantity: 1 },
    ],
    total: 28.8,
    status: OrderStatus.READY,
    placedAt: new Date(now - 12 * 60 * 1000),
    deliveryAddress: "5 Rue du Port, Grimaud",
  },
  {
    id: "ord-3",
    orderNumber: "#GE-10232",
    clientName: "Léa B.",
    clientPhone: "07 11 22 33 44",
    items: [{ name: "Bubble Tea", quantity: 3 }],
    total: 16.5,
    status: OrderStatus.RIDER_ASSIGNED,
    placedAt: new Date(now - 18 * 60 * 1000),
    deliveryAddress: "Place du Marché, Port Grimaud",
    riderName: "Lucas B.",
  },
  {
    id: "ord-4",
    orderNumber: "#GE-10231",
    clientName: "Karim D.",
    clientPhone: "06 55 44 33 22",
    items: [{ name: "Poke Saumon", quantity: 1 }],
    total: 14.9,
    status: OrderStatus.DELIVERED,
    placedAt: new Date(now - 45 * 60 * 1000),
    deliveryAddress: "8 Bd Jean Moulin, Sainte-Maxime",
  },
  {
    id: "ord-5",
    orderNumber: "#GE-10230",
    clientName: "Anna V.",
    clientPhone: "06 77 88 99 00",
    items: [
      { name: "Poke Thon", quantity: 2 },
      { name: "Bubble Tea", quantity: 2 },
    ],
    total: 42.8,
    status: OrderStatus.DELIVERED,
    placedAt: new Date(now - 60 * 60 * 1000),
    deliveryAddress: "3 Chemin des Vignes, Sainte-Maxime",
  },
  {
    id: "ord-6",
    orderNumber: "#GE-10229",
    clientName: "Marc T.",
    clientPhone: "06 44 33 22 11",
    items: [{ name: "Poke Végétarien", quantity: 1 }],
    total: 12.9,
    status: OrderStatus.PENDING,
    placedAt: new Date(now - 1 * 60 * 1000),
    deliveryAddress: "Résidence Les Calanques, Sainte-Maxime",
  },
];

// Ordre logique de progression — utilisé pour proposer la prochaine action au Pro
export const ORDER_STATUS_FLOW: OrderStatus[] = [
  OrderStatus.PENDING,
  OrderStatus.CONFIRMED,
  OrderStatus.PREPARING,
  OrderStatus.READY,
  OrderStatus.RIDER_ASSIGNED,
  OrderStatus.PICKED_UP,
  OrderStatus.IN_DELIVERY,
  OrderStatus.DELIVERED,
];

export function getNextStatus(current: OrderStatus): OrderStatus | null {
  const index = ORDER_STATUS_FLOW.indexOf(current);
  if (index === -1 || index === ORDER_STATUS_FLOW.length - 1) return null;
  return ORDER_STATUS_FLOW[index + 1];
}

export const NEXT_ACTION_LABELS: Partial<Record<OrderStatus, string>> = {
  [OrderStatus.PENDING]: "Confirmer",
  [OrderStatus.CONFIRMED]: "Démarrer la préparation",
  [OrderStatus.PREPARING]: "Marquer comme prête",
  [OrderStatus.READY]: "En attente d'un livreur",
};
