import { create } from "zustand";
import type { Address } from "@golfeexpress/types";

interface AddressState {
  addresses: Address[];
  activeAddress: Address | null;
  setActiveAddress: (address: Address) => void;
  addAddress: (address: Omit<Address, "id" | "userId" | "proId" | "isDefault">) => void;
  removeAddress: (id: string) => void;
}

// Carnet d'adresses de démo dans le Golfe de Saint-Tropez.
// À remplacer par un appel API (GET /addresses) une fois le backend branché.
const DEFAULT_ADDRESSES: Address[] = [
  {
    id: "addr-maison",
    userId: "demo-user",
    proId: null,
    label: "Maison",
    street: "12 Avenue de la Plage",
    complement: null,
    zipCode: "83120",
    city: "Sainte-Maxime",
    lat: 43.3084,
    lng: 6.6391,
    isDefault: true,
  },
  {
    id: "addr-travail",
    userId: "demo-user",
    proId: null,
    label: "Bureau",
    street: "8 Rue Jean Aicard",
    complement: "2ème étage",
    zipCode: "83120",
    city: "Sainte-Maxime",
    lat: 43.3061,
    lng: 6.6354,
    isDefault: false,
  },
  {
    id: "addr-port-grimaud",
    userId: "demo-user",
    proId: null,
    label: "Chez mes parents",
    street: "Quai de l'Ormeau",
    complement: null,
    zipCode: "83310",
    city: "Port Grimaud",
    lat: 43.2755,
    lng: 6.5797,
    isDefault: false,
  },
];

export const useAddressStore = create<AddressState>((set) => ({
  addresses: DEFAULT_ADDRESSES,
  activeAddress: DEFAULT_ADDRESSES[0],
  setActiveAddress: (address) => set({ activeAddress: address }),
  addAddress: (address) =>
    set((state) => {
      const newAddress: Address = {
        ...address,
        id: `addr-${Date.now()}`,
        userId: "demo-user",
        proId: null,
        isDefault: state.addresses.length === 0,
      };
      return { addresses: [...state.addresses, newAddress] };
    }),
  removeAddress: (id) =>
    set((state) => ({
      addresses: state.addresses.filter((a) => a.id !== id),
      activeAddress: state.activeAddress?.id === id ? state.addresses[0] ?? null : state.activeAddress,
    })),
}));
