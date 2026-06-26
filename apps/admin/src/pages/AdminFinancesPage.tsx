import React from "react";
import { StatCard } from "@/components/StatCard";
import {
  ADMIN_FINANCE_SUMMARY,
  MOCK_REVENUE_BY_CATEGORY,
  MOCK_PLATFORM_PAYOUTS,
} from "@/services/mockAdminFinances";

export function AdminFinancesPage() {
  const maxCategoryRevenue = Math.max(...MOCK_REVENUE_BY_CATEGORY.map((c) => c.revenue));

  return (
    <div className="flex-1 p-8">
      <div className="mb-6">
        <h1 className="font-heading text-2xl font-extrabold text-nuit">Finances plateforme</h1>
        <p className="text-sm text-gris">Vue consolidée des revenus GolfeExpress</p>
      </div>

      <div className="mb-6 grid grid-cols-4 gap-4">
        <StatCard icon="💰" label="Volume total (GMV)" value={`${ADMIN_FINANCE_SUMMARY.monthGrossVolume.toFixed(0)} €`} />
        <StatCard
          icon="🏦"
          label="Revenus plateforme"
          value={`${ADMIN_FINANCE_SUMMARY.platformRevenue.toFixed(0)} €`}
          accentColor="#2196F3"
        />
        <StatCard
          icon="🏪"
          label="Reversé aux commerçants"
          value={`${ADMIN_FINANCE_SUMMARY.proPayouts.toFixed(0)} €`}
          accentColor="#FF6B35"
        />
        <StatCard
          icon="🛵"
          label="Reversé aux livreurs"
          value={`${ADMIN_FINANCE_SUMMARY.riderPayouts.toFixed(0)} €`}
          accentColor="#9C27B0"
        />
      </div>

      <div className="mb-6 grid grid-cols-2 gap-4">
        <div className="rounded bg-white p-5 shadow-sm" style={{ boxShadow: "0 2px 12px rgba(0,0,0,0.05)" }}>
          <h3 className="mb-4 font-heading text-base font-bold text-nuit">📊 Revenus par catégorie</h3>
          <div className="flex flex-col gap-3">
            {MOCK_REVENUE_BY_CATEGORY.map((cat) => (
              <div key={cat.category}>
                <div className="mb-1 flex items-center justify-between text-sm">
                  <span className="text-nuit">
                    {cat.emoji} {cat.category}
                  </span>
                  <span className="font-semibold text-nuit">{cat.revenue.toFixed(0)} €</span>
                </div>
                <div className="h-2 overflow-hidden rounded-full bg-gris-light">
                  <div
                    className="h-full rounded-full bg-golfe-green"
                    style={{ width: `${(cat.revenue / maxCategoryRevenue) * 100}%` }}
                  />
                </div>
                <p className="mt-0.5 text-xs text-gris">{cat.orderCount} commandes</p>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded bg-white p-5 shadow-sm" style={{ boxShadow: "0 2px 12px rgba(0,0,0,0.05)" }}>
          <h3 className="mb-4 font-heading text-base font-bold text-nuit">⚙️ Taux moyen</h3>
          <div className="flex flex-col items-center justify-center py-6">
            <p className="font-heading text-5xl font-extrabold text-golfe-green">
              {(ADMIN_FINANCE_SUMMARY.avgCommissionRate * 100).toFixed(0)}%
            </p>
            <p className="mt-2 text-sm text-gris">Commission moyenne plateforme</p>
          </div>
        </div>
      </div>

      <div className="rounded bg-white p-5 shadow-sm" style={{ boxShadow: "0 2px 12px rgba(0,0,0,0.05)" }}>
        <h3 className="mb-4 font-heading text-base font-bold text-nuit">💸 Derniers versements</h3>
        <table className="w-full text-left">
          <thead>
            <tr className="border-b border-gris-light text-xs uppercase tracking-wide text-gris">
              <th className="py-2 pr-4 font-medium">Type</th>
              <th className="py-2 pr-4 font-medium">Bénéficiaire</th>
              <th className="py-2 pr-4 font-medium">Montant</th>
              <th className="py-2 pr-4 font-medium">Statut</th>
              <th className="py-2 pr-4 font-medium">Date</th>
            </tr>
          </thead>
          <tbody>
            {MOCK_PLATFORM_PAYOUTS.map((payout) => (
              <tr key={payout.id} className="border-b border-gris-light last:border-0">
                <td className="py-3 pr-4 text-sm text-nuit">{payout.recipientType === "PRO" ? "🏪 Commerçant" : "🛵 Livreur"}</td>
                <td className="py-3 pr-4 text-sm font-semibold text-nuit">{payout.recipientName}</td>
                <td className="py-3 pr-4 text-sm font-bold text-nuit">{payout.amount.toFixed(2)} €</td>
                <td className="py-3 pr-4">
                  <span
                    className="rounded-full px-2.5 py-1 text-xs font-semibold"
                    style={{
                      backgroundColor: payout.status === "paid" ? "#E8F5E9" : "#FFF3E0",
                      color: payout.status === "paid" ? "#2ECC71" : "#FF6B35",
                    }}
                  >
                    {payout.status === "paid" ? "Versé" : "En attente"}
                  </span>
                </td>
                <td className="py-3 pr-4 text-sm text-gris">{payout.dateLabel}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
