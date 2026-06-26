export interface ReviewEntry {
  id: string;
  clientName: string;
  rating: number;
  comment: string;
  dateLabel: string;
  orderNumber: string;
  proReply?: string;
}

export const MOCK_REVIEWS: ReviewEntry[] = [
  {
    id: "rev-1",
    clientName: "Sophie M.",
    rating: 5,
    comment: "Délicieux poke bowl, livré rapidement et bien emballé. Je recommande !",
    dateLabel: "Aujourd'hui",
    orderNumber: "#GE-10198",
  },
  {
    id: "rev-2",
    clientName: "Thomas R.",
    rating: 4,
    comment: "Très bon, juste un peu de retard sur la livraison.",
    dateLabel: "Hier",
    orderNumber: "#GE-10180",
    proReply: "Merci pour votre retour, on travaille sur les délais avec nos livreurs 🙏",
  },
  {
    id: "rev-3",
    clientName: "Anna V.",
    rating: 5,
    comment: "Le meilleur poke bowl de Sainte-Maxime, vraiment !",
    dateLabel: "3 jours",
    orderNumber: "#GE-10145",
  },
  {
    id: "rev-4",
    clientName: "Marc T.",
    rating: 3,
    comment: "Correct mais un peu cher pour la quantité.",
    dateLabel: "5 jours",
    orderNumber: "#GE-10089",
  },
];

export const REVIEWS_SUMMARY = {
  average: 4.8,
  total: 312,
  distribution: { 5: 240, 4: 52, 3: 14, 2: 4, 1: 2 } as Record<number, number>,
};
