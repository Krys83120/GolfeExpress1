import React from "react";
import { View, Text, ScrollView, Pressable } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { useCartStore } from "@/store/useCartStore";

interface CartScreenProps {
  onClose: () => void;
  onCheckout: () => void;
}

const DELIVERY_FEE = 2.9;
const SERVICE_FEE = 0.99;

export function CartScreen({ onClose, onCheckout }: CartScreenProps) {
  const items = useCartStore((s) => s.items);
  const subtotal = useCartStore((s) => s.subtotal());
  const updateQuantity = useCartStore((s) => s.updateQuantity);

  const total = subtotal + DELIVERY_FEE + SERVICE_FEE;

  return (
    <SafeAreaView className="flex-1 bg-white" edges={["top"]}>
      <View className="flex-1 px-5 pt-5">
        <View className="mb-5 flex-row items-center justify-between">
          <Text className="font-heading text-xl font-bold text-nuit">🛒 Votre panier</Text>
          <Pressable onPress={onClose} className="h-9 w-9 items-center justify-center rounded-full bg-gris-light">
            <Ionicons name="close" size={16} color="#1A1A2E" />
          </Pressable>
        </View>

        <ScrollView showsVerticalScrollIndicator={false}>
          {items.length === 0 ? (
            <View className="items-center py-16">
              <Text style={{ fontSize: 48 }}>🛒</Text>
              <Text className="mt-3 text-gris">Votre panier est vide</Text>
            </View>
          ) : (
            items.map((item) => (
              <View key={item.id} className="flex-row gap-3 border-b border-gris-light py-3.5">
                <View className="h-[60px] w-[60px] items-center justify-center rounded-sm bg-gris-light">
                  <Text style={{ fontSize: 26 }}>{item.emoji}</Text>
                </View>
                <View className="flex-1">
                  <Text className="text-sm font-semibold text-nuit">{item.name}</Text>
                  {item.optionsLabel ? (
                    <Text className="mt-0.5 text-xs text-gris">{item.optionsLabel}</Text>
                  ) : null}
                  <Text className="mt-1 font-bold text-golfe-green">
                    {item.unitPrice.toFixed(2).replace(".", ",")} €
                  </Text>
                </View>
                <View className="flex-row items-center gap-2.5">
                  <Pressable
                    onPress={() => updateQuantity(item.id, -1)}
                    className="h-7 w-7 items-center justify-center rounded-full border-2 border-gris-light"
                  >
                    <Text className="font-bold text-nuit">−</Text>
                  </Pressable>
                  <Text className="font-bold text-nuit">{item.quantity}</Text>
                  <Pressable
                    onPress={() => updateQuantity(item.id, 1)}
                    className="h-7 w-7 items-center justify-center rounded-full border-2 border-gris-light"
                  >
                    <Text className="font-bold text-nuit">+</Text>
                  </Pressable>
                </View>
              </View>
            ))
          )}
        </ScrollView>

        {items.length > 0 && (
          <View className="border-t-2 border-gris-light pb-6 pt-5">
            <SummaryRow label="Sous-total" value={subtotal} />
            <SummaryRow label="Livraison" value={DELIVERY_FEE} valueColor="#2ECC71" />
            <SummaryRow label="Service GolfeExpress" value={SERVICE_FEE} />
            <View className="mt-2 flex-row justify-between border-t border-gris-light pt-3">
              <Text className="font-heading text-lg font-bold text-nuit">Total</Text>
              <Text className="font-heading text-lg font-bold text-nuit">
                {total.toFixed(2).replace(".", ",")} €
              </Text>
            </View>

            <Pressable onPress={onCheckout} className="mt-4 items-center rounded bg-golfe-green py-4">
              <Text className="text-base font-bold text-white">
                💳 Payer {total.toFixed(2).replace(".", ",")} €
              </Text>
            </Pressable>
          </View>
        )}
      </View>
    </SafeAreaView>
  );
}

function SummaryRow({ label, value, valueColor }: { label: string; value: number; valueColor?: string }) {
  return (
    <View className="mb-2.5 flex-row justify-between">
      <Text className="text-sm text-gris">{label}</Text>
      <Text className="text-sm" style={{ color: valueColor ?? "#1A1A2E" }}>
        {value.toFixed(2).replace(".", ",")} €
      </Text>
    </View>
  );
}
