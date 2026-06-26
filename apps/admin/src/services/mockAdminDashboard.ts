import { ProCategory, VehicleType } from "@golfeexpress/types";

export interface GlobalRevenuePoint {
  label: string;
  platform: number;
  pros: number;
  riders: number;
}

export const MOCK_GLOBAL_REVENUE_WEEK: GlobalRevenuePoint[] = [
  { label: "Lun", platform: 420, pros: 2100, riders: 980 },
  { label: "Mar", platform: 380, pros: 1850, riders: 870 },
  { label: "Mer", platform: 510, pros: 2480, riders: 1120 },
  { label: "Jeu", platform: 470, pros: 2300, riders: 1040 },
  { label: "Ven", platform: 690, pros: 3200, riders: 1480 },
  { label: "Sam", platform: 920, pros: 4350, riders: 1980 },
  { label: "Dim", platform: 810, pros: 3780, riders: 1720 },
];

export type ValidationKind = "PRO" | "RIDER";

export interface PendingValidation {
  id: string;
  kind: ValidationKind;
  name: string;
  subtitle: string;
  emoji: string;
  category?: ProCategory;
  vehicleType?: VehicleType;
  submittedAtLabel: string;
}

// Reprend la section "Validations en attente" de golfeexpress_admin.html
export const MOCK_PENDING_VALIDATIONS: PendingValidation[] = [
  {
    id: "val-pro-1",
    kind: "PRO",
    name: "Boulangerie des Issambres",
    subtitle: "SIRET vérifié · En attente de validation finale",
    emoji: "🥖",
    category: ProCategory.BOULANGERIE,
    submittedAtLabel: "Il y a 2h",
  },
  {
    id: "val-rider-1",
    kind: "RIDER",
    name: "Lucas Bertrand",
    subtitle: "Pièce d'identité + permis soumis",
    emoji: "🛵",
    vehicleType: VehicleType.SCOOTER,
    submittedAtLabel: "Il y a 4h",
  },
  {
    id: "val-pro-2",
    kind: "PRO",
    name: "Fleurs de Cogolin",
    subtitle: "SIRET vérifié · Photos boutique en attente",
    emoji: "💐",
    category: ProCategory.FLEURISTE,
    submittedAtLabel: "Il y a 6h",
  },
  {
    id: "val-rider-2",
    kind: "RIDER",
    name: "Inès Moreau",
    subtitle: "Pièce d'identité soumise",
    emoji: "🚲",
    vehicleType: VehicleType.VELO,
    submittedAtLabel: "Hier",
  },
];

export interface SupportedCity {
  name: string;
  activePros: number;
  activeRiders: number;
}

export const MOCK_SUPPORTED_CITIES: SupportedCity[] = [
  { name: "Sainte-Maxime", activePros: 42, activeRiders: 18 },
  { name: "Port Grimaud", activePros: 19, activeRiders: 9 },
  { name: "Grimaud", activePros: 15, activeRiders: 7 },
  { name: "Cogolin", activePros: 11, activeRiders: 5 },
  { name: "Les Issambres", activePros: 8, activeRiders: 4 },
  { name: "Saint-Raphaël", activePros: 6, activeRiders: 3 },
];

export interface GlobalSettingRow {
  key: string;
  value: string;
  description: string;
}

// Reprend exactement le tableau "Récap des clés GlobalSetting suggérées" fourni
export const MOCK_GLOBAL_SETTINGS: GlobalSettingRow[] = [
  { key: "commission_rate", value: "0.15", description: "15% commission GolfeExpress" },
  { key: "rider_share_delivery", value: "0.80", description: "80% des frais pour le livreur" },
  { key: "min_delivery_fee", value: "1.90", description: "Livraison minimum" },
  { key: "max_delivery_fee", value: "5.90", description: "Livraison maximum" },
  { key: "free_delivery_threshold", value: "25.00", description: "Seuil livraison gratuite" },
  { key: "pro_validation_required", value: "true", description: "KYC obligatoire pros" },
  { key: "rider_validation_required", value: "true", description: "KYC obligatoire livreurs" },
  { key: "supported_cities", value: '["Sainte-Maxime",...]', description: "Villes du Golfe" },
  { key: "rush_hour_multiplier", value: "1.5", description: "Multiplicateur heures de pointe" },
];

export interface LiveRiderPin {
  id: string;
  lat: number;
  lng: number;
  emoji: string;
  isDelivering: boolean;
}

// Positions fictives dans le Golfe de Saint-Tropez pour la carte live
export const MOCK_LIVE_RIDERS: LiveRiderPin[] = [
  { id: "r1", lat: 43.3084, lng: 6.6391, emoji: "🛵", isDelivering: true },
  { id: "r2", lat: 43.2729, lng: 6.5797, emoji: "🛵", isDelivering: true },
  { id: "r3", lat: 43.2755, lng: 6.6244, emoji: "🚲", isDelivering: false },
  { id: "r4", lat: 43.2483, lng: 6.6147, emoji: "🛵", isDelivering: true },
];
