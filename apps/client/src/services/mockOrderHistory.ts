import { OrderStatus } from "@golfeexpress/types";

export interface ClientOrderHistoryItem {
  id: string;
  orderNumber: string;
  proName: string;
  proEmoji: string;
  proGradientTo: string;
  itemsSummary: string;
  total: number;
  status: OrderStatus;
  placedAtLabel: string;
  isActive: boolean; // true si la commande est en cours (peut être suivie)
}

export const MOCK_CLIENT_ORDERS: ClientOrderHistoryItem[] = [
  {
    id: "ord-c-1",
    orderNumber: "#GE-10234",
    proName: "Poke Paradise",
    proEmoji: "🍣",
    proGradientTo: "#FF6B35",
    itemsSummary: "2x Poke Saumon, 1x Bubble Tea",
    total: 35.3,
    status: OrderStatus.IN_DELIVERY,
    placedAtLabel: "Aujourd'hui, 18:05",
    isActive: true,
  },
  {
    id: "ord-c-2",
    proName: "Boucherie du Port",
    proEmoji: "🥩",
    proGradientTo: "#A0522D",
    orderNumber: "#GE-10198",
    itemsSummary: "1kg Côte de boeuf, Merguez x6",
    total: 42.5,
    status: OrderStatus.DELIVERED,
    placedAtLabel: "Hier, 12:30",
    isActive: false,
  },
  {
    id: "ord-c-3",
    proName: "Fleuriste Riviera",
    proEmoji: "💐",
    proGradientTo: "#27AE60",
    orderNumber: "#GE-10145",
    itemsSummary: "Bouquet \"Soleil du Golfe\"",
    total: 38.0,
    status: OrderStatus.DELIVERED,
    placedAtLabel: "12 juin, 09:15",
    isActive: false,
  },
  {
    id: "ord-c-4",
    proName: "Parfumerie Soleil",
    proEmoji: "🧴",
    proGradientTo: "#FFB6C1",
    orderNumber: "#GE-10089",
    itemsSummary: "Crème solaire SPF50, Après-soleil",
    total: 24.9,
    status: OrderStatus.CANCELLED,
    placedAtLabel: "3 juin, 16:40",
    isActive: false,
  },
];
