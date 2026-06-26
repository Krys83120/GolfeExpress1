import React from "react";
import { View, Text, ScrollView, Pressable } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { MOCK_CLIENT_USER } from "@/services/mockUser";

interface MenuRow {
  icon: keyof typeof Ionicons.glyphMap;
  label: string;
  color?: string;
}

const ACCOUNT_ROWS: MenuRow[] = [
  { icon: "person-outline", label: "Informations personnelles" },
  { icon: "location-outline", label: "Mes adresses" },
  { icon: "card-outline", label: "Moyens de paiement" },
  { icon: "notifications-outline", label: "Notifications" },
];

const SUPPORT_ROWS: MenuRow[] = [
  { icon: "help-circle-outline", label: "Centre d'aide" },
  { icon: "chatbubble-ellipses-outline", label: "Contacter le support" },
  { icon: "document-text-outline", label: "Conditions générales" },
  { icon: "shield-checkmark-outline", label: "Confidentialité" },
];

interface ProfileScreenProps {
  onLogout: () => void;
}

export function ProfileScreen({ onLogout }: ProfileScreenProps) {
  return (
    <SafeAreaView className="flex-1 bg-white" edges={["top"]}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 32 }}>
        <View className="items-center px-5 pb-2 pt-6">
          <View className="h-20 w-20 items-center justify-center rounded-full bg-golfe-green">
            <Text className="font-heading text-2xl font-extrabold text-white">
              {MOCK_CLIENT_USER.firstName[0]}
              {MOCK_CLIENT_USER.lastName[0]}
            </Text>
          </View>
          <Text className="mt-3 font-heading text-lg font-bold text-nuit">
            {MOCK_CLIENT_USER.firstName} {MOCK_CLIENT_USER.lastName}
          </Text>
          <Text className="text-sm text-gris">{MOCK_CLIENT_USER.email}</Text>

          <Pressable className="mt-3 rounded-full border-2 border-gris-light px-4 py-2">
            <Text className="text-xs font-semibold text-nuit">Modifier le profil</Text>
          </Pressable>
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

          <Text className="mt-4 text-center text-xs text-gris">GolfeExpress v0.1.0 🦎</Text>
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
            <Ionicons name={row.icon} size={18} color={row.color ?? "#1A1A2E"} />
            <Text className="flex-1 text-sm text-nuit">{row.label}</Text>
            <Ionicons name="chevron-forward" size={16} color="#6B7280" />
          </Pressable>
        ))}
      </View>
    </View>
  );
}
