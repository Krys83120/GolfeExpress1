import React from "react";
import { View, Text, ScrollView, Pressable } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { MOCK_RIDER_PROFILE, VEHICLE_LABELS } from "@/services/mockRiderProfile";

interface MenuRow {
  icon: keyof typeof Ionicons.glyphMap;
  label: string;
}

const ACCOUNT_ROWS: MenuRow[] = [
  { icon: "person-outline", label: "Informations personnelles" },
  { icon: "bicycle-outline", label: "Mon véhicule" },
  { icon: "card-outline", label: "Coordonnées bancaires" },
  { icon: "document-outline", label: "Mes documents (KYC)" },
];

const SUPPORT_ROWS: MenuRow[] = [
  { icon: "help-circle-outline", label: "Centre d'aide" },
  { icon: "chatbubble-ellipses-outline", label: "Contacter le support" },
  { icon: "document-text-outline", label: "Conditions générales" },
];

interface RiderProfileScreenProps {
  onLogout: () => void;
}

export function RiderProfileScreen({ onLogout }: RiderProfileScreenProps) {
  const vehicleMeta = VEHICLE_LABELS[MOCK_RIDER_PROFILE.vehicleType];

  return (
    <SafeAreaView className="flex-1 bg-white" edges={["top"]}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 32 }}>
        <View className="items-center px-5 pb-2 pt-6">
          <View className="h-20 w-20 items-center justify-center rounded-full bg-corail">
            <Text className="font-heading text-2xl font-extrabold text-white">
              {MOCK_RIDER_PROFILE.firstName[0]}
              {MOCK_RIDER_PROFILE.lastName[0]}
            </Text>
          </View>
          <Text className="mt-3 font-heading text-lg font-bold text-nuit">
            {MOCK_RIDER_PROFILE.firstName} {MOCK_RIDER_PROFILE.lastName}
          </Text>
          <Text className="text-sm text-gris">{MOCK_RIDER_PROFILE.email}</Text>

          <View className="mt-2 flex-row items-center gap-1.5 rounded-full bg-green-50 px-3 py-1">
            <Ionicons name="checkmark-circle" size={13} color="#2ECC71" />
            <Text className="text-xs font-semibold text-golfe-green">Compte vérifié</Text>
          </View>
        </View>

        {/* Vehicle card */}
        <View className="mx-5 mt-4 flex-row items-center gap-3 rounded-sm bg-gris-light p-4">
          <Text style={{ fontSize: 28 }}>{vehicleMeta.emoji}</Text>
          <View className="flex-1">
            <Text className="text-sm font-bold text-nuit">{vehicleMeta.label}</Text>
            <Text className="text-xs text-gris">Plaque {MOCK_RIDER_PROFILE.vehiclePlate}</Text>
          </View>
        </View>

        {/* IBAN */}
        <View className="mx-5 mt-3 flex-row items-center gap-3 rounded-sm bg-gris-light p-4">
          <Ionicons name="card" size={22} color="#1A1A2E" />
          <View className="flex-1">
            <Text className="text-sm font-bold text-nuit">{MOCK_RIDER_PROFILE.ibanMasked}</Text>
            <Text className="text-xs text-gris">Compte de versement des gains</Text>
          </View>
        </View>

        <MenuSection title="Mon compte" rows={ACCOUNT_ROWS} />
        <MenuSection title="Aide & support" rows={SUPPORT_ROWS} />

        <View className="mt-6 px-5">
          <Pressable
            onPress={onLogout}
            className="flex-row items-center justify-center gap-2 rounded-sm border-2 border-red-100 bg-red-50 py-3.5"
          >
            <Ionicons name="log-out-outline" size={18} color="#F44336" />
            <Text className="text-sm font-bold text-red-500">Se déconnecter</Text>
          </Pressable>

          <Text className="mt-4 text-center text-xs text-gris">GolfeExpress Livreur v0.1.0 🦎</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

function MenuSection({ title, rows }: { title: string; rows: MenuRow[] }) {
  return (
    <View className="mt-6 px-5">
      <Text className="mb-3 text-xs font-semibold uppercase tracking-wide text-gris">{title}</Text>
      <View className="rounded-sm bg-gris-light">
        {rows.map((row, index) => (
          <Pressable
            key={row.label}
            className="flex-row items-center gap-3 px-4 py-3.5"
            style={{ borderTopWidth: index === 0 ? 0 : 1, borderTopColor: "#E5E7EB" }}
          >
            <Ionicons name={row.icon} size={18} color="#1A1A2E" />
            <Text className="flex-1 text-sm text-nuit">{row.label}</Text>
            <Ionicons name="chevron-forward" size={16} color="#6B7280" />
          </Pressable>
        ))}
      </View>
    </View>
  );
}
