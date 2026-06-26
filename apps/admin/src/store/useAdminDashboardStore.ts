import { create } from "zustand";
import { MOCK_PENDING_VALIDATIONS, type PendingValidation } from "@/services/mockAdminDashboard";

interface AdminDashboardState {
  pendingValidations: PendingValidation[];
  approve: (id: string) => void;
  reject: (id: string) => void;
}

export const useAdminDashboardStore = create<AdminDashboardState>((set) => ({
  pendingValidations: MOCK_PENDING_VALIDATIONS,
  approve: (id) =>
    set((state) => ({
      pendingValidations: state.pendingValidations.filter((v) => v.id !== id),
    })),
  reject: (id) =>
    set((state) => ({
      pendingValidations: state.pendingValidations.filter((v) => v.id !== id),
    })),
}));
