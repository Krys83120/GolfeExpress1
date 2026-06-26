import React from "react";
import { View, Text, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { OnlineToggleHeader } from "@/components/OnlineToggleHeader";
import { EarningsCard } from "@/components/EarningsCard";
import { OrderCard } from "@/components/OrderCard";
import { CurrentDeliveryCard } from "@/components/CurrentDeliveryCard";
import { MOCK_AVAILABLE_ORDERS } from "@/services/mockOrders";
import { useRiderSessionStore } from "@/store/useRiderSessionStore";

export function HomeScreen() {
  const isOnline = useRiderSessionStore((s) => s.isOnline);
  const activeDelivery = useRiderSessionStore((s) => s.activeDelivery);
  const acceptOrder = useRiderSessionStore((s) => s.acceptOrder);

  function handleAccept(orderId: string) {
    const order = MOCK_AVAILABLE_ORDERS.find((o) => o.id === orderId);
    if (!order) return;
    acceptOrder({
      orderId: order.id,
      proName: order.proName,
      proEmoji: order.proEmoji,
      routeLabel: `${order.pickupLabel} → ${order.dropoffLabel}`,
      earnings: order.earnings,
      tip: 2.0,
      step: 0,
    });
  }

  return (
    <View className="flex-1 bg-white">
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 32 }}>
        <SafeAreaView edges={["top"]} style={{ backgroundColor: "#1A1A2E" }}>
          <OnlineToggleHeader />
        </SafeAreaView>

        <EarningsCard />

        {activeDelivery ? (
          <CurrentDeliveryCard />
        ) : (
          <>
            {/* MAP — placeholder, à remplacer par react-native-maps + position GPS temps réel */}
            <View className="mx-5 mt-5 h-40 items-center justify-center rounded" style={{ backgroundColor: "#E8F5E9" }}>
              <Text style={{ fontSize: 32 }}>🗺️</Text>
              <Text className="mt-1 text-[13px] text-gris">
                {isOnline ? "Recherche de commandes à proximité..." : "Passez en ligne pour recevoir des commandes"}
              </Text>
            </View>

            <View className="mt-6 px-5">
              <Text className="mb-3 font-heading text-lg font-bold text-nuit">
                📋 Commandes disponibles {isOnline ? `(${MOCK_AVAILABLE_ORDERS.length})` : ""}
              </Text>

              {!isOnline ? (
                <View className="items-center py-12">
                  <Text style={{ fontSize: 40 }}>😴</Text>
                  <Text className="mt-2 text-gris">Vous êtes hors ligne</Text>
                </View>
              ) : (
                MOCK_AVAILABLE_ORDERS.map((order) => (
                  <OrderCard
                    key={order.id}
                    order={order}
                    onAccept={() => handleAccept(order.id)}
                    onDecline={() => {
                      /* TODO: retirer la commande de la liste / la proposer à un autre rider */
                    }}
                  />
                ))
              )}
            </View>
          </>
        )}
      </ScrollView>
    </View>
  );
}
