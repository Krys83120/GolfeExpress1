import React, { useState } from "react";
import { Search, MoreVertical, Star } from "lucide-react";
import { MOCK_ADMIN_PROS, PRO_STATUS_LABELS, SUBSCRIPTION_LABELS } from "@/services/mockAdminPros";

export function ProsPage() {
  const [search, setSearch] = useState("");

  const filtered = MOCK_ADMIN_PROS.filter((p) =>
    `${p.businessName} ${p.city}`.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="flex-1 p-8">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="font-heading text-2xl font-extrabold text-nuit">Commerçants</h1>
          <p className="text-sm text-gris">{MOCK_ADMIN_PROS.length} commerçants sur la plateforme</p>
        </div>
      </div>

      <div className="mb-4 flex items-center gap-2 rounded-sm border border-gris-light bg-white px-3 py-2">
        <Search size={16} className="text-gris" />
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Rechercher un commerçant..."
          className="flex-1 text-sm outline-none"
        />
      </div>

      <div className="rounded bg-white p-5 shadow-sm" style={{ boxShadow: "0 2px 12px rgba(0,0,0,0.05)" }}>
        <table className="w-full text-left">
          <thead>
            <tr className="border-b border-gris-light text-xs uppercase tracking-wide text-gris">
              <th className="py-2 pr-4 font-medium">Commerçant</th>
              <th className="py-2 pr-4 font-medium">Ville</th>
              <th className="py-2 pr-4 font-medium">Abonnement</th>
              <th className="py-2 pr-4 font-medium">Note</th>
              <th className="py-2 pr-4 font-medium">Commandes</th>
              <th className="py-2 pr-4 font-medium">CA (mois)</th>
              <th className="py-2 pr-4 font-medium">Statut</th>
              <th className="py-2 pr-4 font-medium"></th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((pro) => {
              const statusMeta = PRO_STATUS_LABELS[pro.status];
              const subMeta = SUBSCRIPTION_LABELS[pro.subscriptionType];
              return (
                <tr key={pro.id} className="border-b border-gris-light last:border-0">
                  <td className="py-3 pr-4">
                    <div className="flex items-center gap-3">
                      <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gris-light text-lg">
                        {pro.emoji}
                      </div>
                      <span className="text-sm font-semibold text-nuit">{pro.businessName}</span>
                    </div>
                  </td>
                  <td className="py-3 pr-4 text-sm text-gris">{pro.city}</td>
                  <td className="py-3 pr-4">
                    <span className="text-sm font-semibold" style={{ color: subMeta.color }}>
                      {subMeta.label}
                    </span>
                  </td>
                  <td className="py-3 pr-4">
                    {pro.ratingCount > 0 ? (
                      <div className="flex items-center gap-1 text-sm text-nuit">
                        <Star size={12} fill="#FF6B35" color="#FF6B35" />
                        {pro.rating.toFixed(1)}
                        <span className="text-xs text-gris">({pro.ratingCount})</span>
                      </div>
                    ) : (
                      <span className="text-xs text-gris">—</span>
                    )}
                  </td>
                  <td className="py-3 pr-4 text-sm text-nuit">{pro.totalOrders}</td>
                  <td className="py-3 pr-4 text-sm font-semibold text-nuit">
                    {pro.monthRevenue > 0 ? `${pro.monthRevenue.toFixed(0)} €` : "—"}
                  </td>
                  <td className="py-3 pr-4">
                    <span
                      className="rounded-full px-2.5 py-1 text-xs font-semibold"
                      style={{ backgroundColor: statusMeta.bg, color: statusMeta.text }}
                    >
                      {statusMeta.label}
                    </span>
                  </td>
                  <td className="py-3 pr-4 text-right">
                    <button className="rounded-sm p-1.5 text-gris hover:bg-gris-light">
                      <MoreVertical size={16} />
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
