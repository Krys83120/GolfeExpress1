import "./global.css";
import React, { useState } from "react";
import { View, Text, Pressable, Modal } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { Ionicons } from "@expo/vector-icons";

import { HomeScreen } from "@/screens/HomeScreen";
import { ProDetailScreen } from "@/screens/ProDetailScreen";
import { CartScreen } from "@/screens/CartScreen";
import { TrackingScreen } from "@/screens/TrackingScreen";
import { AddressPickerScreen } from "@/screens/AddressPickerScreen";
import { MapScreen } from "@/screens/MapScreen";
import { OrdersScreen } from "@/screens/OrdersScreen";
import { FidelityScreen } from "@/screens/FidelityScreen";
import { ProfileScreen } from "@/screens/ProfileScreen";
import type { ProWithUi } from "@/services/mockPros";
import type { ClientOrderHistoryItem } from "@/services/mockOrderHistory";

type Tab = "home" | "orders" | "fidelity" | "profile";

const TABS: { key: Tab; icon: keyof typeof Ionicons.glyphMap; label: string }[] = [
  { key: "home", icon: "home", label: "Accueil" },
  { key: "orders", icon: "receipt", label: "Commandes" },
  { key: "fidelity", icon: "gift", label: "Fidélité" },
  { key: "profile", icon: "person", label: "Profil" },
];

export default function App() {
  const [activeTab, setActiveTab] = useState<Tab>("home");

  // Modals plein écran (empilés au-dessus des tabs)
  const [selectedPro, setSelectedPro] = useState<ProWithUi | null>(null);
  const [cartOpen, setCartOpen] = useState(false);
  const [trackingOpen, setTrackingOpen] = useState(false);
  const [addressPickerOpen, setAddressPickerOpen] = useState(false);
  const [mapOpen, setMapOpen] = useState(false);

  function handleReorder(order: ClientOrderHistoryItem) {
    // TODO: une fois l'API branchée, recharger les items de `order` dans le panier
    // (nécessite de connaître le Pro + les Product associés à cette commande passée).
    setActiveTab("home");
  }

  function renderTabContent() {
    switch (activeTab) {
      case "home":
        return (
          <HomeScreen
            onOpenPro={setSelectedPro}
            onOpenCart={() => setCartOpen(true)}
            onOpenAddressPicker={() => setAddressPickerOpen(true)}
            onOpenMap={() => setMapOpen(true)}
          />
        );
      case "orders":
        return (
          <OrdersScreen
            onOpenTracking={() => setTrackingOpen(true)}
            onReorder={handleReorder}
          />
        );
      case "fidelity":
        return <FidelityScreen />;
      case "profile":
        return (
          <ProfileScreen
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

        {/* MODAL: Détail Pro */}
        <Modal visible={!!selectedPro} animationType="slide" onRequestClose={() => setSelectedPro(null)}>
          {selectedPro && <ProDetailScreen pro={selectedPro} onClose={() => setSelectedPro(null)} />}
        </Modal>

        {/* MODAL: Panier */}
        <Modal visible={cartOpen} animationType="slide" onRequestClose={() => setCartOpen(false)}>
          <CartScreen
            onClose={() => setCartOpen(false)}
            onCheckout={() => {
              setCartOpen(false);
              setTrackingOpen(true);
            }}
          />
        </Modal>

        {/* MODAL: Suivi de commande */}
        <Modal visible={trackingOpen} animationType="slide" onRequestClose={() => setTrackingOpen(false)}>
          <TrackingScreen onClose={() => setTrackingOpen(false)} />
        </Modal>

        {/* MODAL: Sélection d'adresse */}
        <Modal visible={addressPickerOpen} animationType="slide" onRequestClose={() => setAddressPickerOpen(false)}>
          <AddressPickerScreen
            onClose={() => setAddressPickerOpen(false)}
            onSelected={() => setAddressPickerOpen(false)}
          />
        </Modal>

        {/* MODAL: Carte interactive */}
        <Modal visible={mapOpen} animationType="slide" onRequestClose={() => setMapOpen(false)}>
          <MapScreen
            onClose={() => setMapOpen(false)}
            onOpenPro={(pro) => {
              setMapOpen(false);
              setSelectedPro(pro);
            }}
          />
        </Modal>
      </View>
    </SafeAreaProvider>
  );
}
