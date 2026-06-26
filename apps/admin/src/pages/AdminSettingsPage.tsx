import React, { useState } from "react";
import { SettingsTable } from "@/components/SettingsTable";
import { SettingEditModal } from "@/components/SettingEditModal";
import { useAdminSettingsStore } from "@/store/useAdminSettingsStore";
import type { GlobalSettingRow } from "@/services/mockAdminDashboard";

export function AdminSettingsPage() {
  const settings = useAdminSettingsStore((s) => s.settings);
  const updateSetting = useAdminSettingsStore((s) => s.updateSetting);
  const [editingSetting, setEditingSetting] = useState<GlobalSettingRow | null>(null);

  return (
    <div className="flex-1 p-8">
      <div className="mb-6">
        <h1 className="font-heading text-2xl font-extrabold text-nuit">Paramètres globaux</h1>
        <p className="text-sm text-gris">
          Configuration de la plateforme — modèle <code className="rounded bg-gris-light px-1.5 py-0.5">GlobalSetting</code>
        </p>
      </div>

      <SettingsTable settings={settings} onEdit={setEditingSetting} />

      {editingSetting && (
        <SettingEditModal
          setting={editingSetting}
          onClose={() => setEditingSetting(null)}
          onSave={(value) => {
            updateSetting(editingSetting.key, value);
            setEditingSetting(null);
          }}
        />
      )}
    </div>
  );
}
