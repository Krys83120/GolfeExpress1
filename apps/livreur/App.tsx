import "./global.css";
import React, { useState } from "react";
import { View, Text, Pressable } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { Ionicons } from "@expo/vector-icons";

import { HomeScreen } from "@/screens/HomeScreen";
import { EarningsScreen } from "@/screens/EarningsScreen";
import { StatsScreen } from "@/screens/StatsScreen";
import { RiderProfileScreen } from "@/screens/RiderProfileScreen";

type Tab = "home" | "earnings" | "stats" | "profile";

const TABS: { key: Tab; icon: keyof typeof Ionicons.glyphMap; label: string }[] = [
  { key: "home", icon: "bicycle", label: "Accueil" },
  { key: "earnings", icon: "wallet", label: "Gains" },
  { key: "stats", icon: "stats-chart", label: "Stats" },
  { key: "profile", icon: "person", label: "Profil" },
];

export default function App() {
  const [activeTab, setActiveTab] = useState<Tab>("home");

  function renderTabContent() {
    switch (activeTab) {
      case "home":
        return <HomeScreen />;
      case "earnings":
        return <EarningsScreen />;
      case "stats":
        return <StatsScreen />;
      case "profile":
        return (
          <RiderProfileScreen
            onLogout={() => {
              /* TODO: déconnexion réelle une fois l'auth branchée (clear token + redirection login) */
            }}
          />
        );
    }
  }

  return (
    <SafeAreaProvider>
      <StatusBar style="light" />
      <View className="flex-1 bg-white">
        {renderTabContent()}

        {/* BOTTOM NAV */}
        <SafeAreaView edges={["bottom"]} className="border-t border-gris-light bg-white">
          <View className="flex-row justify-around py-3">
            {TABS.map((tab) => {
              const isActive = activeTab === tab.key;
              return (
                <Pressable
                  key={tab.key}
                  onPress={() => setActiveTab(tab.key)}
                  className="items-center gap-1 rounded-xl px-3 py-1"
                  style={{ backgroundColor: isActive ? "rgba(46,204,113,0.08)" : "transparent" }}
                >
                  <Ionicons name={tab.icon as any} size={22} color={isActive ? "#2ECC71" : "#6B7280"} />
                  <Text className="text-[11px]" style={{ color: isActive ? "#2ECC71" : "#6B7280" }}>
                    {tab.label}
                  </Text>
                </Pressable>
              );
            })}
          </View>
        </SafeAreaView>
      </View>
    </SafeAreaProvider>
  );
}
