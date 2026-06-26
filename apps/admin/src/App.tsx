import React, { useState } from "react";
import { Sidebar } from "@/components/Sidebar";
import { DashboardPage } from "@/pages/DashboardPage";
import { ValidationsPage } from "@/pages/ValidationsPage";
import { UsersPage } from "@/pages/UsersPage";
import { ProsPage } from "@/pages/ProsPage";
import { RidersPage } from "@/pages/RidersPage";
import { AdminFinancesPage } from "@/pages/AdminFinancesPage";
import { AdminSettingsPage } from "@/pages/AdminSettingsPage";
import { useAdminDashboardStore } from "@/store/useAdminDashboardStore";

export default function App() {
  const [activePage, setActivePage] = useState("dashboard");
  const pendingCount = useAdminDashboardStore((s) => s.pendingValidations.length);

  function renderPage() {
    switch (activePage) {
      case "dashboard":
        return <DashboardPage onNavigate={setActivePage} />;
      case "validations":
        return <ValidationsPage />;
      case "users":
        return <UsersPage />;
      case "pros":
        return <ProsPage />;
      case "riders":
        return <RidersPage />;
      case "finances":
        return <AdminFinancesPage />;
      case "settings":
        return <AdminSettingsPage />;
      default:
        return <DashboardPage onNavigate={setActivePage} />;
    }
  }

  return (
    <div className="flex min-h-screen bg-gris-light/30">
      <Sidebar activeItem={activePage} onSelect={setActivePage} pendingCount={pendingCount} />
      <main className="flex-1">{renderPage()}</main>
    </div>
  );
}
