import React, { useState } from "react";
import { MOCK_PRO_SETTINGS, MOCK_OPENING_HOURS } from "@/services/mockProSettings";

export function SettingsPage() {
  const [hours, setHours] = useState(MOCK_OPENING_HOURS);

  function updateHour(dayOfWeek: number, field: "openTime" | "closeTime" | "isClosed", value: string | boolean) {
    setHours((prev) =>
      prev.map((h) => (h.dayOfWeek === dayOfWeek ? { ...h, [field]: value } : h))
    );
  }

  return (
    <div className="flex-1 p-8">
      <div className="mb-6">
        <h1 className="font-heading text-2xl font-extrabold text-nuit">Paramètres</h1>
        <p className="text-sm text-gris">Informations de votre boutique</p>
      </div>

      <div className="mb-6 rounded bg-white p-5 shadow-sm" style={{ boxShadow: "0 2px 12px rgba(0,0,0,0.05)" }}>
        <h3 className="mb-4 font-heading text-base font-bold text-nuit">🏪 Informations générales</h3>
        <div className="grid grid-cols-2 gap-4">
          <Field label="Nom commercial" defaultValue={MOCK_PRO_SETTINGS.businessName} />
          <Field label="SIRET" defaultValue={MOCK_PRO_SETTINGS.siret} disabled />
          <Field label="Téléphone" defaultValue={MOCK_PRO_SETTINGS.phone} />
          <Field label="Email de contact" defaultValue={MOCK_PRO_SETTINGS.emailContact} />
          <div className="col-span-2">
            <Field label="Adresse" defaultValue={MOCK_PRO_SETTINGS.address} />
          </div>
          <div className="col-span-2">
            <label className="mb-1 block text-xs font-semibold text-gris">Description</label>
            <textarea
              defaultValue={MOCK_PRO_SETTINGS.description}
              rows={2}
              className="w-full rounded-sm border border-gris-light px-3 py-2 text-sm"
            />
          </div>
        </div>
      </div>

      <div className="rounded bg-white p-5 shadow-sm" style={{ boxShadow: "0 2px 12px rgba(0,0,0,0.05)" }}>
        <h3 className="mb-4 font-heading text-base font-bold text-nuit">🕐 Horaires d'ouverture</h3>
        <div className="flex flex-col gap-2">
          {hours.map((day) => (
            <div key={day.dayOfWeek} className="flex items-center gap-4 border-b border-gris-light py-2 last:border-0">
              <span className="w-24 text-sm font-medium text-nuit">{day.dayLabel}</span>
              <label className="flex items-center gap-1.5 text-xs text-gris">
                <input
                  type="checkbox"
                  checked={!day.isClosed}
                  onChange={(e) => updateHour(day.dayOfWeek, "isClosed", !e.target.checked)}
                />
                Ouvert
              </label>
              {!day.isClosed && (
                <div className="flex items-center gap-2">
                  <input
                    type="time"
                    value={day.openTime}
                    onChange={(e) => updateHour(day.dayOfWeek, "openTime", e.target.value)}
                    className="rounded-sm border border-gris-light px-2 py-1 text-sm"
                  />
                  <span className="text-sm text-gris">à</span>
                  <input
                    type="time"
                    value={day.closeTime}
                    onChange={(e) => updateHour(day.dayOfWeek, "closeTime", e.target.value)}
                    className="rounded-sm border border-gris-light px-2 py-1 text-sm"
                  />
                </div>
              )}
            </div>
          ))}
        </div>

        <button className="mt-5 rounded-sm bg-golfe-green px-5 py-2.5 text-sm font-semibold text-white">
          Enregistrer les modifications
        </button>
      </div>
    </div>
  );
}

function Field({ label, defaultValue, disabled }: { label: string; defaultValue: string; disabled?: boolean }) {
  return (
    <div>
      <label className="mb-1 block text-xs font-semibold text-gris">{label}</label>
      <input
        defaultValue={defaultValue}
        disabled={disabled}
        className="w-full rounded-sm border border-gris-light px-3 py-2 text-sm disabled:bg-gris-light disabled:text-gris"
      />
    </div>
  );
}
