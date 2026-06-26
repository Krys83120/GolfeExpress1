import React from "react";
import { StatCard } from "@/components/StatCard";
import { MOCK_PAYOUTS, FINANCE_SUMMARY } from "@/services/mockFinances";

export function FinancesPage() {
  return (
    <div className="flex-1 p-8">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="font-heading text-2xl font-extrabold text-nuit">Finances</h1>
          <p className="text-sm text-gris">
            Abonnement <span className="font-semibold text-golfe-green">{FINANCE_SUMMARY.subscriptionType}</span> · Commission{" "}
            {(FINANCE_SUMMARY.commissionRate * 100).toFixed(0)}%
          </p>
        </div>
        <button className="rounded-sm border-2 border-gris-light px-4 py-2 text-sm font-semibold text-nuit">
          Télécharger le relevé
        </button>
      </div>

      <div className="mb-6 grid grid-cols-3 gap-4">
        <StatCard icon="💰" label="CA brut (mois)" value={`${FINANCE_SUMMARY.monthGross.toFixed(2)} €`} />
        <StatCard
          icon="📉"
          label="Commission plateforme"
          value={`${FINANCE_SUMMARY.monthCommission.toFixed(2)} €`}
          accentColor="#FF6B35"
        />
        <StatCard
          icon="✅"
          label="Net perçu (mois)"
          value={`${FINANCE_SUMMARY.monthNet.toFixed(2)} €`}
          accentColor="#2196F3"
        />
      </div>

      <div className="mb-6 rounded bg-white p-5 shadow-sm" style={{ boxShadow: "0 2px 12px rgba(0,0,0,0.05)" }}>
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gris">Prochain versement</p>
            <p className="font-heading text-2xl font-extrabold text-nuit">
              {FINANCE_SUMMARY.nextPayoutAmount.toFixed(2)} €
            </p>
          </div>
          <div className="rounded-full bg-orange-50 px-4 py-2 text-sm font-semibold text-corail">
            Prévu le {FINANCE_SUMMARY.nextPayoutDateLabel}
          </div>
        </div>
      </div>

      <div className="rounded bg-white p-5 shadow-sm" style={{ boxShadow: "0 2px 12px rgba(0,0,0,0.05)" }}>
        <h3 className="mb-4 font-heading text-base font-bold text-nuit">📄 Historique des versements</h3>
        <table className="w-full text-left">
          <thead>
            <tr className="border-b border-gris-light text-xs uppercase tracking-wide text-gris">
              <th className="py-2 pr-4 font-medium">Période</th>
              <th className="py-2 pr-4 font-medium">CA brut</th>
              <th className="py-2 pr-4 font-medium">Commission</th>
              <th className="py-2 pr-4 font-medium">Net perçu</th>
              <th className="py-2 pr-4 font-medium">Statut</th>
              <th className="py-2 pr-4 font-medium">Date</th>
            </tr>
          </thead>
          <tbody>
            {MOCK_PAYOUTS.map((payout) => (
              <tr key={payout.id} className="border-b border-gris-light last:border-0">
                <td className="py-3 pr-4 text-sm text-nuit">{payout.periodLabel}</td>
                <td className="py-3 pr-4 text-sm text-nuit">{payout.grossAmount.toFixed(2)} €</td>
                <td className="py-3 pr-4 text-sm text-corail">-{payout.commission.toFixed(2)} €</td>
                <td className="py-3 pr-4 text-sm font-bold text-nuit">{payout.netAmount.toFixed(2)} €</td>
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
