export interface AvailableOrder {
  id: string;
  proEmoji: string;
  proGradientFrom: string;
  proGradientTo: string;
  proName: string;
  proAddress: string;
  earnings: number;
  pickupLabel: string;
  pickupDistanceKm: number;
  dropoffLabel: string;
  dropoffDistanceKm: number;
  etaMinutes: number;
  totalDistanceKm: number;
  itemCount: number;
}

// Correspond aux 2 commandes visibles dans golfeexpress_livreur.html
export const MOCK_AVAILABLE_ORDERS: AvailableOrder[] = [
  {
    id: "order-001",
    proEmoji: "🍣",
    proGradientFrom: "#FF8C5A",
    proGradientTo: "#FF6B35",
    proName: "Poke Paradise",
    proAddress: "Port Grimaud, Quai de l'Ormeau",
    earnings: 8.5,
    pickupLabel: "Port Grimaud",
    pickupDistanceKm: 1.2,
    dropoffLabel: "12 Av. de la Plage, Sainte-Maxime",
    dropoffDistanceKm: 2.8,
    etaMinutes: 25,
    totalDistanceKm: 4.0,
    itemCount: 2,
  },
  {
    id: "order-002",
    proEmoji: "🥩",
    proGradientFrom: "#8B4513",
    proGradientTo: "#A0522D",
    proName: "Boucherie du Port",
    proAddress: "Port Grimaud, Place du Marché",
    earnings: 10.2,
    pickupLabel: "Port Grimaud",
    pickupDistanceKm: 1.5,
    dropoffLabel: "5 Rue du Port, Grimaud",
    dropoffDistanceKm: 3.2,
    etaMinutes: 35,
    totalDistanceKm: 4.7,
    itemCount: 5,
  },
];
