import React from "react";
import { StatCard } from "@/components/StatCard";
import { GlobalRevenueChart } from "@/components/GlobalRevenueChart";
import { LiveMapCard } from "@/components/LiveMapCard";
import { ValidationCard } from "@/components/ValidationCard";
import { SettingsTable } from "@/components/SettingsTable";
import { SupportedCitiesGrid } from "@/components/SupportedCitiesGrid";
import { MOCK_GLOBAL_REVENUE_WEEK, MOCK_LIVE_RIDERS, MOCK_SUPPORTED_CITIES } from "@/services/mockAdminDashboard";
import { useAdminDashboardStore } from "@/store/useAdminDashboardStore";
import { useAdminSettingsStore } from "@/store/useAdminSettingsStore";

interface DashboardPageProps {
  onNavigate?: (page: string) => void;
}

export function DashboardPage({ onNavigate }: DashboardPageProps) {
  const pendingValidations = useAdminDashboardStore((s) => s.pendingValidations);
  const approve = useAdminDashboardStore((s) => s.approve);
  const reject = useAdminDashboardStore((s) => s.reject);
  const settings = useAdminSettingsStore((s) => s.settings);

  return (
    <div className="flex-1 p-8">
      {/* TOP BAR */}
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="font-heading text-2xl font-extrabold text-nuit">Dashboard global</h1>
          <p className="text-sm text-gris">Vue d'ensemble de la plateforme GolfeExpress 🦎</p>
        </div>
        <div className="rounded-sm bg-gris-light px-4 py-2 text-sm font-semibold text-nuit">
          Golfe de Saint-Tropez
        </div>
      </div>

      {/* STATS */}
      <div className="mb-6 grid grid-cols-4 gap-4">
        <StatCard icon="💰" label="Revenus plateforme" value="5 200 €" trend={{ value: "18%", positive: true }} />
        <StatCard
          icon="🧾"
          label="Commandes (7j)"
          value="1 248"
          trend={{ value: "9%", positive: true }}
          accentColor="#2196F3"
        />
        <StatCard
          icon="🏪"
          label="Commerçants actifs"
          value="101"
          trend={{ value: "4", positive: true }}
          accentColor="#FF6B35"
        />
        <StatCard
          icon="🛵"
          label="Livreurs actifs"
          value="46"
          trend={{ value: "2", positive: false }}
          accentColor="#9C27B0"
        />
      </div>

      {/* CHART + LIVE MAP */}
      <div className="mb-6 grid grid-cols-2 gap-4">
        <GlobalRevenueChart data={MOCK_GLOBAL_REVENUE_WEEK} />
        <LiveMapCard riders={MOCK_LIVE_RIDERS} />
      </div>

      {/* PENDING VALIDATIONS */}
      <div className="mb-6 rounded bg-white p-5 shadow-sm" style={{ boxShadow: "0 2px 12px rgba(0,0,0,0.05)" }}>
        <div className="mb-4 flex items-center justify-between">
          <h3 className="font-heading text-base font-bold text-nuit">
            🛡️ Validations en attente {pendingValidations.length > 0 ? `(${pendingValidations.length})` : ""}
          </h3>
          <button onClick={() => onNavigate?.("validations")} className="text-sm font-semibold text-golfe-green">
            Voir tout
          </button>
        </div>

        {pendingValidations.length === 0 ? (
          <div className="flex flex-col items-center py-10">
            <span className="text-4xl">✅</span>
            <p className="mt-2 text-sm text-gris">Aucune validation en attente</p>
          </div>
        ) : (
          <div className="flex flex-col gap-3">
            {pendingValidations.slice(0, 3).map((validation) => (
              <ValidationCard
                key={validation.id}
                validation={validation}
                onApprove={() => approve(validation.id)}
                onReject={() => reject(validation.id)}
              />
            ))}
          </div>
        )}
      </div>

      {/* SETTINGS */}
      <div className="mb-6">
        <SettingsTable settings={settings} onEdit={() => onNavigate?.("settings")} />
      </div>

      {/* SUPPORTED CITIES */}
      <SupportedCitiesGrid cities={MOCK_SUPPORTED_CITIES} />
    </div>
  );
}
