export const ADMIN_FINANCE_SUMMARY = {
  monthGrossVolume: 48200.0, // GMV total
  platformRevenue: 7230.0, // commissions perçues
  proPayouts: 36150.0,
  riderPayouts: 4820.0,
  avgCommissionRate: 0.15,
};

export interface CategoryRevenueRow {
  category: string;
  emoji: string;
  revenue: number;
  orderCount: number;
}

export const MOCK_REVENUE_BY_CATEGORY: CategoryRevenueRow[] = [
  { category: "Restaurants", emoji: "🍽️", revenue: 28400.0, orderCount: 1820 },
  { category: "Boucherie", emoji: "🥩", revenue: 8200.0, orderCount: 410 },
  { category: "Pharmacie", emoji: "💊", revenue: 5100.0, orderCount: 380 },
  { category: "Fleuriste", emoji: "💐", revenue: 3600.0, orderCount: 210 },
  { category: "Autres", emoji: "📦", revenue: 2900.0, orderCount: 190 },
];

export interface PlatformPayoutRow {
  id: string;
  recipientType: "PRO" | "RIDER";
  recipientName: string;
  amount: number;
  status: "paid" | "pending";
  dateLabel: string;
}

export const MOCK_PLATFORM_PAYOUTS: PlatformPayoutRow[] = [
  { id: "pp1", recipientType: "PRO", recipientName: "Poke Paradise", amount: 5814.42, status: "paid", dateLabel: "23 juin" },
  { id: "pp2", recipientType: "PRO", recipientName: "Boucherie du Port", amount: 2720.0, status: "paid", dateLabel: "23 juin" },
  { id: "pp3", recipientType: "RIDER", recipientName: "Lucas Bertrand", amount: 412.3, status: "paid", dateLabel: "23 juin" },
  { id: "pp4", recipientType: "RIDER", recipientName: "Karim Saidi", amount: 380.5, status: "pending", dateLabel: "30 juin" },
];
