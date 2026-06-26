import React from "react";
import { View, Text, Pressable } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRiderSessionStore } from "@/store/useRiderSessionStore";

const STEP_LABELS = ["Accepté", "Récupéré", "En route", "Livré"];
const STEP_ICONS = ["checkmark", "checkmark", "bicycle", "cube"] as const;

const ACTION_LABELS = [
  "📦 J'ai récupéré la commande",
  "📍 J'arrive chez le client",
  "📸 Preuve de livraison",
  "🎉 Commande livrée !",
];

export function CurrentDeliveryCard() {
  const activeDelivery = useRiderSessionStore((s) => s.activeDelivery);
  const advanceStep = useRiderSessionStore((s) => s.advanceStep);
  const completeDelivery = useRiderSessionStore((s) => s.completeDelivery);

  if (!activeDelivery) return null;

  const { proName, proEmoji, routeLabel, earnings, tip, step } = activeDelivery;

  function handleAction() {
    if (step === 3) {
      completeDelivery();
    } else {
      advanceStep();
    }
  }

  return (
    <View className="mx-5 mt-5 rounded p-5" style={{ backgroundColor: "#1A1A2E" }}>
      <View className="mb-4 flex-row items-center justify-between">
        <Text className="font-heading text-base font-bold text-white">🛵 Livraison en cours</Text>
        <View className="rounded-full bg-corail px-3 py-1">
          <Text className="text-[11px] font-bold text-white">EN ROUTE</Text>
        </View>
      </View>

      <View className="mb-4 flex-row items-center gap-3">
        <View className="h-[50px] w-[50px] items-center justify-center rounded-full bg-corail">
          <Text style={{ fontSize: 24 }}>{proEmoji}</Text>
        </View>
        <View>
          <Text className="font-bold text-white">{proName}</Text>
          <Text className="text-xs text-white/70">{routeLabel}</Text>
        </View>
        <View className="ml-auto items-end">
          <Text className="font-heading text-xl font-extrabold text-white">
            {earnings.toFixed(2).replace(".", ",")}€
          </Text>
          <Text className="text-[11px] text-white/70">+ {tip.toFixed(2).replace(".", ",")}€ tip</Text>
        </View>
      </View>

      <View className="mb-4 flex-row justify-between">
        {STEP_LABELS.map((label, i) => {
          const isCompleted = i < step || (i === step && step === 3);
          const isActive = i === step && step !== 3;
          return (
            <View key={label} className="flex-1 items-center">
              <View
                className="h-8 w-8 items-center justify-center rounded-full"
                style={{
                  backgroundColor: isCompleted ? "#2ECC71" : isActive ? "#FF6B35" : "rgba(255,255,255,0.1)",
                }}
              >
                {isCompleted ? (
                  <Ionicons name="checkmark" size={16} color="white" />
                ) : (
                  <Text style={{ fontSize: 14 }}>{i === 2 ? "🛵" : i === 3 ? "📦" : ""}</Text>
                )}
              </View>
              <Text
                className="mt-1 text-center text-[10px]"
                style={{ color: isCompleted || isActive ? "white" : "rgba(255,255,255,0.5)" }}
              >
                {label}
              </Text>
            </View>
          );
        })}
      </View>

      <Pressable onPress={handleAction} className="items-center rounded-sm bg-golfe-green py-3.5">
        <Text className="font-bold text-white">{ACTION_LABELS[step]}</Text>
      </Pressable>
    </View>
  );
}
