import React, { useState } from "react";
import { View, Text, ScrollView, Pressable } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { MOCK_CLIENT_ORDERS, type ClientOrderHistoryItem } from "@/services/mockOrderHistory";
import { StatusBadge } from "@/components/StatusBadge";

type Filter = "all" | "active" | "past";

interface OrdersScreenProps {
  onOpenTracking: (order: ClientOrderHistoryItem) => void;
  onReorder: (order: ClientOrderHistoryItem) => void;
}

export function OrdersScreen({ onOpenTracking, onReorder }: OrdersScreenProps) {
  const [filter, setFilter] = useState<Filter>("all");

  const filtered = MOCK_CLIENT_ORDERS.filter((o) => {
    if (filter === "active") return o.isActive;
    if (filter === "past") return !o.isActive;
    return true;
  });

  return (
    <SafeAreaView className="flex-1 bg-white" edges={["top"]}>
      <View className="px-5 pb-3 pt-4">
        <Text className="font-heading text-xl font-bold text-nuit">🧾 Mes commandes</Text>
      </View>

      <View className="flex-row gap-2 px-5 pb-4">
        <FilterChip label="Toutes" active={filter === "all"} onPress={() => setFilter("all")} />
        <FilterChip label="En cours" active={filter === "active"} onPress={() => setFilter("active")} />
        <FilterChip label="Historique" active={filter === "past"} onPress={() => setFilter("past")} />
      </View>

      <ScrollView className="px-5" showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 24 }}>
        {filtered.length === 0 ? (
          <View className="items-center py-16">
            <Text style={{ fontSize: 48 }}>🧾</Text>
            <Text className="mt-3 text-gris">Aucune commande ici</Text>
          </View>
        ) : (
          filtered.map((order) => (
            <Pressable
              key={order.id}
              onPress={() => order.isActive && onOpenTracking(order)}
              className="mb-3 rounded bg-white p-4"
              style={{
                elevation: 1,
                shadowColor: "#000",
                shadowOpacity: 0.05,
                shadowRadius: 8,
                shadowOffset: { width: 0, height: 2 },
              }}
            >
              <View className="flex-row items-center gap-3">
                <View
                  className="h-12 w-12 items-center justify-center rounded-full"
                  style={{ backgroundColor: order.proGradientTo }}
                >
                  <Text style={{ fontSize: 20 }}>{order.proEmoji}</Text>
                </View>
                <View className="flex-1">
                  <Text className="text-[15px] font-bold text-nuit">{order.proName}</Text>
                  <Text className="text-xs text-gris">{order.placedAtLabel}</Text>
                </View>
                <StatusBadge status={order.status} />
              </View>

              <Text className="mt-3 text-[13px] text-gris">{order.itemsSummary}</Text>

              <View className="mt-3 flex-row items-center justify-between border-t border-gris-light pt-3">
                <Text className="text-sm font-bold text-nuit">{order.total.toFixed(2).replace(".", ",")} €</Text>

                {order.isActive ? (
                  <Pressable
                    onPress={() => onOpenTracking(order)}
                    className="flex-row items-center gap-1.5 rounded-sm bg-golfe-green px-3.5 py-2"
                  >
                    <Ionicons name="navigate" size={13} color="white" />
                    <Text className="text-xs font-bold text-white">Suivre</Text>
                  </Pressable>
                ) : (
                  <Pressable
                    onPress={() => onReorder(order)}
                    className="flex-row items-center gap-1.5 rounded-sm border-2 border-gris-light px-3.5 py-2"
                  >
                    <Ionicons name="refresh" size={13} color="#1A1A2E" />
                    <Text className="text-xs font-semibold text-nuit">Recommander</Text>
                  </Pressable>
                )}
              </View>
            </Pressable>
          ))
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

function FilterChip({ label, active, onPress }: { label: string; active: boolean; onPress: () => void }) {
  return (
    <Pressable
      onPress={onPress}
      className="rounded-full px-4 py-2"
      style={{ backgroundColor: active ? "#2ECC71" : "#F3F4F6" }}
    >
      <Text className="text-[13px] font-semibold" style={{ color: active ? "white" : "#6B7280" }}>
        {label}
      </Text>
    </Pressable>
  );
}
