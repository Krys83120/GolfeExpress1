export const MOCK_PRO_SETTINGS = {
  businessName: "Poke Paradise",
  siret: "123 456 789 00012",
  description: "Poke bowls frais, healthy, végé — fait maison tous les jours",
  phone: "04 94 00 00 01",
  emailContact: "contact@pokeparadise.fr",
  address: "4 Quai Léon Condroyer, Sainte-Maxime",
};

export interface OpeningHourRow {
  dayOfWeek: number; // 0 = dimanche
  dayLabel: string;
  openTime: string;
  closeTime: string;
  isClosed: boolean;
}

export const MOCK_OPENING_HOURS: OpeningHourRow[] = [
  { dayOfWeek: 1, dayLabel: "Lundi", openTime: "11:30", closeTime: "22:00", isClosed: false },
  { dayOfWeek: 2, dayLabel: "Mardi", openTime: "11:30", closeTime: "22:00", isClosed: false },
  { dayOfWeek: 3, dayLabel: "Mercredi", openTime: "11:30", closeTime: "22:00", isClosed: false },
  { dayOfWeek: 4, dayLabel: "Jeudi", openTime: "11:30", closeTime: "22:00", isClosed: false },
  { dayOfWeek: 5, dayLabel: "Vendredi", openTime: "11:30", closeTime: "23:00", isClosed: false },
  { dayOfWeek: 6, dayLabel: "Samedi", openTime: "11:30", closeTime: "23:00", isClosed: false },
  { dayOfWeek: 0, dayLabel: "Dimanche", openTime: "", closeTime: "", isClosed: true },
];
