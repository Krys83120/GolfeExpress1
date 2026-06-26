import React from "react";
import { StatCard } from "@/components/StatCard";
import { RevenueChart } from "@/components/RevenueChart";
import { TopProductsCard } from "@/components/TopProductsCard";
import { OrdersTable } from "@/components/OrdersTable";
import { MOCK_REVENUE_WEEK, MOCK_TOP_PRODUCTS, MOCK_ORDERS_TABLE } from "@/services/mockDashboard";
import { useProDashboardStore, type PeriodFilter } from "@/store/useProDashboardStore";

const PERIOD_LABELS: Record<PeriodFilter, string> = {
  today: "Aujourd'hui",
  week: "Cette semaine",
  month: "Ce mois",
};

export function DashboardPage() {
  const period = useProDashboardStore((s) => s.period);
  const setPeriod = useProDashboardStore((s) => s.setPeriod);

  return (
    <div className="flex-1 p-8">
      {/* TOP BAR */}
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="font-heading text-2xl font-extrabold text-nuit">Dashboard</h1>
          <p className="text-sm text-gris">Bienvenue, Poke Paradise 👋</p>
        </div>
        <div className="flex gap-2 rounded-sm bg-gris-light p-1">
          {(Object.keys(PERIOD_LABELS) as PeriodFilter[]).map((key) => (
            <button
              key={key}
              onClick={() => setPeriod(key)}
              className="rounded-sm px-4 py-2 text-sm font-semibold transition-colors"
              style={{
                backgroundColor: period === key ? "white" : "transparent",
                color: period === key ? "#1A1A2E" : "#6B7280",
                boxShadow: period === key ? "0 1px 4px rgba(0,0,0,0.08)" : "none",
              }}
            >
              {PERIOD_LABELS[key]}
            </button>
          ))}
        </div>
      </div>

      {/* STATS */}
      <div className="mb-6 grid grid-cols-4 gap-4">
        <StatCard icon="💰" label="Chiffre d'affaires" value="1 248 €" trend={{ value: "12%", positive: true }} />
        <StatCard
          icon="🧾"
          label="Commandes"
          value="87"
          trend={{ value: "8%", positive: true }}
          accentColor="#2196F3"
        />
        <StatCard
          icon="⭐"
          label="Note moyenne"
          value="4.8"
          trend={{ value: "0.1", positive: true }}
          accentColor="#FF6B35"
        />
        <StatCard
          icon="⏱️"
          label="Temps de préparation"
          value="14 min"
          trend={{ value: "2 min", positive: false }}
          accentColor="#9C27B0"
        />
      </div>

      {/* CHART + TOP PRODUCTS */}
      <div className="mb-6 grid grid-cols-3 gap-4">
        <div className="col-span-2">
          <RevenueChart data={MOCK_REVENUE_WEEK} />
        </div>
        <TopProductsCard products={MOCK_TOP_PRODUCTS} />
      </div>

      {/* ORDERS TABLE */}
      <OrdersTable orders={MOCK_ORDERS_TABLE} />
    </div>
  );
}
