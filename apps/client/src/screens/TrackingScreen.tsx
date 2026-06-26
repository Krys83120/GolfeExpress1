import React from "react";
import { View, Text, Pressable } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";

interface TimelineStep {
  title: string;
  subtitle: string;
  status: "completed" | "active" | "upcoming";
}

const STEPS: TimelineStep[] = [
  { title: "Commande confirmée", subtitle: "18:05 - Poke Paradise a accepté", status: "completed" },
  { title: "En préparation", subtitle: "18:10 - Votre poke bowl est en cours", status: "completed" },
  { title: "Prêt, en livraison", subtitle: "18:25 - Rocco a récupéré votre commande", status: "active" },
  { title: "Livré", subtitle: "À venir...", status: "upcoming" },
];

interface TrackingScreenProps {
  onClose: () => void;
}

export function TrackingScreen({ onClose }: TrackingScreenProps) {
  return (
    <SafeAreaView className="flex-1 bg-white" edges={["top"]}>
      <View className="flex-1 px-5 pt-5">
        <View className="mb-5 flex-row items-center justify-between">
          <Text className="font-heading text-xl font-bold text-nuit">📦 Suivi de commande</Text>
          <Pressable onPress={onClose} className="h-9 w-9 items-center justify-center rounded-full bg-gris-light">
            <Ionicons name="close" size={16} color="#1A1A2E" />
          </Pressable>
        </View>

        {/* Mini carte placeholder — à remplacer par react-native-maps + position rider temps réel (socket.io) */}
        <View className="mb-5 h-44 items-center justify-center rounded bg-[#E8F5E9]">
          <View className="h-10 w-10 items-center justify-center rounded-full bg-corail">
            <Text style={{ fontSize: 18 }}>🛵</Text>
          </View>
        </View>

        <View className="mb-5 flex-row items-center gap-3">
          <View className="h-[50px] w-[50px] items-center justify-center rounded-full bg-corail">
            <Text style={{ fontSize: 24 }}>🦎</Text>
          </View>
          <View>
            <Text className="font-bold text-nuit">Rocco est en route !</Text>
            <Text className="text-[13px] text-gris">Arrivée estimée : 18:42</Text>
          </View>
        </View>

        <View>
          {STEPS.map((step, index) => (
            <View key={step.title} className="flex-row gap-3 pb-6">
              <View className="items-center">
                <View
                  className="h-6 w-6 items-center justify-center rounded-full"
                  style={{
                    backgroundColor:
                      step.status === "completed" ? "#2ECC71" : step.status === "active" ? "#FF6B35" : "#F3F4F6",
                  }}
                >
                  {step.status === "completed" && <Ionicons name="checkmark" size={14} color="white" />}
                </View>
                {index < STEPS.length - 1 && (
                  <View
                    className="mt-1 w-0.5 flex-1"
                    style={{ backgroundColor: step.status === "completed" ? "#2ECC71" : "#F3F4F6", minHeight: 24 }}
                  />
                )}
              </View>
              <View className="flex-1">
                <Text
                  className="font-semibold"
                  style={{ color: step.status === "upcoming" ? "#6B7280" : "#1A1A2E" }}
                >
                  {step.title}
                </Text>
                <Text className="mt-0.5 text-[13px] text-gris">{step.subtitle}</Text>
              </View>
            </View>
          ))}
        </View>
      </View>
    </SafeAreaView>
  );
}
