import { VehicleType, RiderStatus } from "@golfeexpress/types";

export interface AdminRiderRow {
  id: string;
  firstName: string;
  lastName: string;
  vehicleType: VehicleType;
  status: RiderStatus;
  isOnline: boolean;
  rating: number;
  ratingCount: number;
  totalDeliveries: number;
  totalEarnings: number;
}

export const MOCK_ADMIN_RIDERS: AdminRiderRow[] = [
  { id: "r1", firstName: "Lucas", lastName: "Bertrand", vehicleType: VehicleType.SCOOTER, status: RiderStatus.ACTIVE, isOnline: true, rating: 4.9, ratingCount: 287, totalDeliveries: 312, totalEarnings: 4820.5 },
  { id: "r2", firstName: "Inès", lastName: "Moreau", vehicleType: VehicleType.VELO, status: RiderStatus.PENDING, isOnline: false, rating: 0, ratingCount: 0, totalDeliveries: 0, totalEarnings: 0 },
  { id: "r3", firstName: "Karim", lastName: "Saidi", vehicleType: VehicleType.VOITURE, status: RiderStatus.ACTIVE, isOnline: true, rating: 4.7, ratingCount: 198, totalDeliveries: 210, totalEarnings: 3150.0 },
  { id: "r4", firstName: "Léa", lastName: "Fontaine", vehicleType: VehicleType.SCOOTER, status: RiderStatus.ACTIVE, isOnline: false, rating: 4.8, ratingCount: 156, totalDeliveries: 178, totalEarnings: 2640.0 },
  { id: "r5", firstName: "Yanis", lastName: "Brun", vehicleType: VehicleType.ELECTRIQUE, status: RiderStatus.SUSPENDED, isOnline: false, rating: 3.9, ratingCount: 42, totalDeliveries: 48, totalEarnings: 690.0 },
];

export const RIDER_STATUS_LABELS: Record<RiderStatus, { label: string; bg: string; text: string }> = {
  [RiderStatus.PENDING]: { label: "En attente", bg: "#FFF3E0", text: "#FF6B35" },
  [RiderStatus.ACTIVE]: { label: "Actif", bg: "#E8F5E9", text: "#2ECC71" },
  [RiderStatus.SUSPENDED]: { label: "Suspendu", bg: "#FFEBEE", text: "#F44336" },
  [RiderStatus.BANNED]: { label: "Banni", bg: "#F3F4F6", text: "#6B7280" },
};

export const ADMIN_VEHICLE_LABELS: Record<VehicleType, { label: string; emoji: string }> = {
  [VehicleType.SCOOTER]: { label: "Scooter", emoji: "🛵" },
  [VehicleType.VOITURE]: { label: "Voiture", emoji: "🚗" },
  [VehicleType.VELO]: { label: "Vélo", emoji: "🚲" },
  [VehicleType.ELECTRIQUE]: { label: "Électrique", emoji: "⚡" },
};
