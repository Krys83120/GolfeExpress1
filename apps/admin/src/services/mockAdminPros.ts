import { ProCategory, ProStatus, SubscriptionType } from "@golfeexpress/types";

export interface AdminProRow {
  id: string;
  businessName: string;
  emoji: string;
  category: ProCategory;
  city: string;
  status: ProStatus;
  subscriptionType: SubscriptionType;
  rating: number;
  ratingCount: number;
  totalOrders: number;
  monthRevenue: number;
}

export const MOCK_ADMIN_PROS: AdminProRow[] = [
  { id: "p1", businessName: "Poke Paradise", emoji: "🍣", category: ProCategory.RESTAURANT, city: "Sainte-Maxime", status: ProStatus.ACTIVE, subscriptionType: SubscriptionType.PREMIUM, rating: 4.8, ratingCount: 312, totalOrders: 1240, monthRevenue: 6840.5 },
  { id: "p2", businessName: "Boucherie du Port", emoji: "🥩", category: ProCategory.BOUCHERIE, city: "Port Grimaud", status: ProStatus.ACTIVE, subscriptionType: SubscriptionType.FREE, rating: 4.9, ratingCount: 187, totalOrders: 540, monthRevenue: 3200.0 },
  { id: "p3", businessName: "Parfumerie Soleil", emoji: "🧴", category: ProCategory.PARFUMERIE, city: "Sainte-Maxime", status: ProStatus.ACTIVE, subscriptionType: SubscriptionType.FREE, rating: 4.7, ratingCount: 94, totalOrders: 210, monthRevenue: 1480.0 },
  { id: "p4", businessName: "Fleuriste Riviera", emoji: "💐", category: ProCategory.FLEURISTE, city: "Sainte-Maxime", status: ProStatus.ACTIVE, subscriptionType: SubscriptionType.PREMIUM_PLUS, rating: 4.9, ratingCount: 56, totalOrders: 180, monthRevenue: 2100.0 },
  { id: "p5", businessName: "Pharmacie du Golfe", emoji: "💊", category: ProCategory.PHARMACIE, city: "Cogolin", status: ProStatus.ACTIVE, subscriptionType: SubscriptionType.FREE, rating: 4.6, ratingCount: 121, totalOrders: 460, monthRevenue: 2680.0 },
  { id: "p6", businessName: "Boulangerie des Issambres", emoji: "🥖", category: ProCategory.BOULANGERIE, city: "Les Issambres", status: ProStatus.PENDING, subscriptionType: SubscriptionType.FREE, rating: 0, ratingCount: 0, totalOrders: 0, monthRevenue: 0 },
  { id: "p7", businessName: "Librairie Marine", emoji: "📚", category: ProCategory.LIBRAIRIE, city: "Sainte-Maxime", status: ProStatus.SUSPENDED, subscriptionType: SubscriptionType.FREE, rating: 4.2, ratingCount: 28, totalOrders: 65, monthRevenue: 420.0 },
];

export const PRO_STATUS_LABELS: Record<ProStatus, { label: string; bg: string; text: string }> = {
  [ProStatus.PENDING]: { label: "En attente", bg: "#FFF3E0", text: "#FF6B35" },
  [ProStatus.ACTIVE]: { label: "Actif", bg: "#E8F5E9", text: "#2ECC71" },
  [ProStatus.SUSPENDED]: { label: "Suspendu", bg: "#FFEBEE", text: "#F44336" },
  [ProStatus.CLOSED]: { label: "Fermé", bg: "#F3F4F6", text: "#6B7280" },
};

export const SUBSCRIPTION_LABELS: Record<SubscriptionType, { label: string; color: string }> = {
  [SubscriptionType.FREE]: { label: "Gratuit", color: "#6B7280" },
  [SubscriptionType.PREMIUM]: { label: "Premium", color: "#2196F3" },
  [SubscriptionType.PREMIUM_PLUS]: { label: "Premium+", color: "#9C27B0" },
};
