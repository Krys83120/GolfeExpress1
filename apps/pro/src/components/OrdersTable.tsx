import React from "react";
import type { DashboardOrderRow } from "@/services/mockDashboard";
import { ORDER_STATUS_LABELS } from "@/services/mockDashboard";

interface OrdersTableProps {
  orders: DashboardOrderRow[];
}

export function OrdersTable({ orders }: OrdersTableProps) {
  return (
    <div className="rounded bg-white p-5 shadow-sm" style={{ boxShadow: "0 2px 12px rgba(0,0,0,0.05)" }}>
      <div className="mb-4 flex items-center justify-between">
        <h3 className="font-heading text-base font-bold text-nuit">🧾 Commandes récentes</h3>
        <button className="text-sm font-semibold text-golfe-green">Voir tout</button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead>
            <tr className="border-b border-gris-light text-xs uppercase tracking-wide text-gris">
              <th className="py-2 pr-4 font-medium">Commande</th>
              <th className="py-2 pr-4 font-medium">Client</th>
              <th className="py-2 pr-4 font-medium">Articles</th>
              <th className="py-2 pr-4 font-medium">Total</th>
              <th className="py-2 pr-4 font-medium">Statut</th>
              <th className="py-2 pr-4 font-medium">Reçue</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => {
              const statusMeta = ORDER_STATUS_LABELS[order.status];
              return (
                <tr key={order.id} className="border-b border-gris-light last:border-0">
                  <td className="py-3 pr-4 text-sm font-semibold text-nuit">{order.orderNumber}</td>
                  <td className="py-3 pr-4 text-sm text-nuit">{order.clientName}</td>
                  <td className="py-3 pr-4 text-sm text-gris">{order.itemsSummary}</td>
                  <td className="py-3 pr-4 text-sm font-bold text-nuit">{order.total.toFixed(2)} €</td>
                  <td className="py-3 pr-4">
                    <span
                      className="rounded-full px-2.5 py-1 text-xs font-semibold"
                      style={{ backgroundColor: statusMeta.bg, color: statusMeta.text }}
                    >
                      {statusMeta.label}
                    </span>
                  </td>
                  <td className="py-3 pr-4 text-sm text-gris">{order.placedAtLabel}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
