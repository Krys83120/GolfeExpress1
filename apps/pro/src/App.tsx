import React, { useState } from "react";
import { Sidebar } from "@/components/Sidebar";
import { DashboardPage } from "@/pages/DashboardPage";
import { OrdersPage } from "@/pages/OrdersPage";
import { MenuPage } from "@/pages/MenuPage";
import { FinancesPage } from "@/pages/FinancesPage";
import { ReviewsPage } from "@/pages/ReviewsPage";
import { SettingsPage } from "@/pages/SettingsPage";

export default function App() {
  const [activePage, setActivePage] = useState("dashboard");

  function renderPage() {
    switch (activePage) {
      case "dashboard":
        return <DashboardPage />;
      case "orders":
        return <OrdersPage />;
      case "menu":
        return <MenuPage />;
      case "finances":
        return <FinancesPage />;
      case "reviews":
        return <ReviewsPage />;
      case "settings":
        return <SettingsPage />;
      default:
        return <DashboardPage />;
    }
  }

  return (
    <div className="flex min-h-screen bg-gris-light/30">
      <Sidebar activeItem={activePage} onSelect={setActivePage} />
      <main className="flex-1">{renderPage()}</main>
    </div>
  );
}
