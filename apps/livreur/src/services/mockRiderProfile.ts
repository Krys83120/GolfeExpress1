import { VehicleType, RiderStatus } from "@golfeexpress/types";

export const MOCK_RIDER_PROFILE = {
  firstName: "Lucas",
  lastName: "Bertrand",
  email: "lucas.bertrand@example.fr",
  phone: "+33 6 98 76 54 32",
  vehicleType: VehicleType.SCOOTER,
  vehiclePlate: "AB-123-CD",
  status: RiderStatus.ACTIVE,
  ibanMasked: "FR76 •••• •••• •••• 4821",
};

export const VEHICLE_LABELS: Record<VehicleType, { label: string; emoji: string }> = {
  [VehicleType.SCOOTER]: { label: "Scooter", emoji: "🛵" },
  [VehicleType.VOITURE]: { label: "Voiture", emoji: "🚗" },
  [VehicleType.VELO]: { label: "Vélo", emoji: "🚲" },
  [VehicleType.ELECTRIQUE]: { label: "Véhicule électrique", emoji: "⚡" },
};
