import React from "react";
import type { LiveRiderPin } from "@/services/mockAdminDashboard";

interface LiveMapCardProps {
  riders: LiveRiderPin[];
}

/**
 * Placeholder de carte live — à remplacer par une vraie carte (Mapbox GL / Leaflet)
 * recevant les positions via l'event Socket.io `rider:location_update`
 * (voir packages/types/src/realtime.ts).
 *
 * Les positions des pins sont projetées de façon purement illustrative dans
 * ce placeholder (pas de vraie projection géographique).
 */
export function LiveMapCard({ riders }: LiveMapCardProps) {
  const activeCount = riders.filter((r) => r.isDelivering).length;

  return (
    <div className="rounded bg-white p-5 shadow-sm" style={{ boxShadow: "0 2px 12px rgba(0,0,0,0.05)" }}>
      <div className="mb-4 flex items-center justify-between">
        <h3 className="font-heading text-base font-bold text-nuit">🗺️ Carte live — Golfe de Saint-Tropez</h3>
        <span className="flex items-center gap-1.5 text-sm font-semibold text-golfe-green">
          <span className="h-2 w-2 rounded-full bg-golfe-green" /> {activeCount} en livraison
        </span>
      </div>

      <div className="relative h-64 overflow-hidden rounded-sm" style={{ backgroundColor: "#E8F5E9" }}>
        {riders.map((rider, index) => {
          // Distribution illustrative des pins sur la zone (placeholder visuel)
          const left = 15 + ((index * 23) % 70);
          const top = 20 + ((index * 31) % 55);
          return (
            <div
              key={rider.id}
              className="absolute flex h-9 w-9 items-center justify-center rounded-full border-2 border-white text-base shadow"
              style={{
                left: `${left}%`,
                top: `${top}%`,
                backgroundColor: rider.isDelivering ? "#FF6B35" : "#6B7280",
              }}
              title={rider.isDelivering ? "En livraison" : "Disponible"}
            >
              {rider.emoji}
            </div>
          );
        })}
        <div className="absolute bottom-3 right-3 rounded-sm bg-white/90 px-3 py-1.5 text-xs text-gris">
          📍 {riders.length} livreurs actifs
        </div>
      </div>
    </div>
  );
}
