import { create } from "zustand";
import { MOCK_GLOBAL_SETTINGS, type GlobalSettingRow } from "@/services/mockAdminDashboard";

interface AdminSettingsState {
  settings: GlobalSettingRow[];
  updateSetting: (key: string, value: string) => void;
}

export const useAdminSettingsStore = create<AdminSettingsState>((set) => ({
  settings: MOCK_GLOBAL_SETTINGS,
  updateSetting: (key, value) =>
    set((state) => ({
      settings: state.settings.map((s) => (s.key === key ? { ...s, value } : s)),
    })),
}));
