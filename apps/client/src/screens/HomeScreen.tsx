import React, { useState } from "react";
import { View, Text, ScrollView, TextInput, Pressable } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { CATEGORY_CHIPS } from "@/services/mockCategories";
import { MOCK_PROS, MOCK_NEARBY, ProWithUi } from "@/services/mockPros";
import { ProCard } from "@/components/ProCard";
import { NearbyItem } from "@/components/NearbyItem";
import { FloatingCart } from "@/components/FloatingCart";
import { useAddressStore } from "@/store/useAddressStore";
import { ProCategory } from "@golfeexpress/types";

interface HomeScreenProps {
  onOpenPro: (pro: ProWithUi) => void;
  onOpenCart: () => void;
  onOpenAddressPicker: () => void;
  onOpenMap: () => void;
}

export function HomeScreen({ onOpenPro, onOpenCart, onOpenAddressPicker, onOpenMap }: HomeScreenProps) {
  const [activeCategory, setActiveCategory] = useState<ProCategory>(ProCategory.RESTAURANT);
  const activeAddress = useAddressStore((s) => s.activeAddress);

  return (
    <View className="flex-1 bg-white">
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 140 }}>
        {/* HEADER */}
        <SafeAreaView edges={["top"]} style={{ backgroundColor: "#2ECC71" }}>
          <View className="rounded-b px-5 pb-4 pt-2" style={{ backgroundColor: "#2ECC71" }}>
            <View className="flex-row items-center justify-between">
              <View className="flex-row items-center gap-2">
                <Text style={{ fontSize: 22 }}>🦎</Text>
                <Text className="font-heading text-[20px] font-extrabold text-white">GolfeExpress</Text>
              </View>
              <View className="flex-row gap-4">
                <Ionicons name="notifications-outline" size={20} color="white" />
                <Ionicons name="person-circle-outline" size={22} color="white" />
              </View>
            </View>

            <Pressable
              onPress={onOpenAddressPicker}
              className="mt-3 flex-row items-center gap-2 rounded-sm bg-white/20 px-3.5 py-2.5"
            >
              <Ionicons name="location" size={14} color="white" />
              <Text className="flex-1 text-[13px] font-medium text-white" numberOfLines={1}>
                {activeAddress ? `${activeAddress.street}, ${activeAddress.city}` : "Choisir une adresse"}
              </Text>
              <Ionicons name="chevron-down" size={12} color="white" style={{ opacity: 0.7 }} />
            </Pressable>
          </View>
        </SafeAreaView>

        {/* SEARCH */}
        <View className="px-5 py-4">
          <View className="flex-row items-center gap-3 rounded bg-gris-light px-4 py-3.5">
            <Ionicons name="search" size={18} color="#6B7280" />
            <TextInput
              placeholder="Poke bowl, parfum, fleurs..."
              placeholderTextColor="#6B7280"
              className="flex-1 font-body text-[15px] text-nuit"
            />
            <Ionicons name="options-outline" size={18} color="#6B7280" />
          </View>
        </View>

        {/* CATEGORIES */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ paddingHorizontal: 20, gap: 12, paddingBottom: 16 }}
        >
          {CATEGORY_CHIPS.map((chip) => {
            const isActive = chip.category === activeCategory;
            return (
              <Pressable
                key={chip.category}
                onPress={() => setActiveCategory(chip.category)}
                className="items-center gap-1.5 rounded border-2 px-4 py-3"
                style={{
                  minWidth: 80,
                  borderColor: isActive ? "#2ECC71" : "#F3F4F6",
                  backgroundColor: isActive ? "rgba(46,204,113,0.08)" : "white",
                }}
              >
                <View
                  className="h-11 w-11 items-center justify-center rounded-full"
                  style={{ backgroundColor: isActive ? "#2ECC71" : "#F3F4F6" }}
                >
                  <Text style={{ fontSize: 20 }}>{chip.emoji}</Text>
                </View>
                <Text className="text-[11px] font-semibold text-nuit">{chip.label}</Text>
              </Pressable>
            );
          })}
        </ScrollView>

        {/* MAP CARD */}
        <View className="px-5 pb-4">
          <Pressable
            onPress={onOpenMap}
            className="overflow-hidden rounded p-5"
            style={{ backgroundColor: "#E8F5E9", minHeight: 170 }}
          >
            <Text className="font-heading text-lg font-bold text-nuit">🗺️ Carte interactive</Text>
            <Text className="mb-3.5 mt-1 text-[13px] text-gris">Voir les commerçants autour de vous</Text>
            <View className="flex-row items-center gap-2 self-start rounded-sm bg-golfe-green px-5 py-2.5">
              <Ionicons name="map-outline" size={14} color="white" />
              <Text className="text-sm font-semibold text-white">Explorer la carte</Text>
            </View>

            <View className="absolute bottom-4 right-4 flex-row">
              {["🍣", "🥩", "🧴"].map((e, i) => (
                <View
                  key={i}
                  className="h-9 w-9 items-center justify-center rounded-full border-[3px] border-white bg-corail"
                  style={{ marginLeft: i === 0 ? 0 : -10 }}
                >
                  <Text style={{ fontSize: 14 }}>{e}</Text>
                </View>
              ))}
              <View className="ml-[-10px] h-9 w-9 items-center justify-center rounded-full border-[3px] border-white bg-nuit">
                <Text className="text-[10px] font-bold text-white">+12</Text>
              </View>
            </View>
          </Pressable>
        </View>

        {/* FEATURED */}
        <View className="flex-row items-center justify-between px-5 pb-3">
          <Text className="font-heading text-lg font-bold text-nuit">⭐ En vedette</Text>
          <Text className="text-[13px] font-semibold text-golfe-green">Voir tout</Text>
        </View>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: 20 }}
        >
          {MOCK_PROS.map((pro) => (
            <ProCard key={pro.id} pro={pro} onPress={() => onOpenPro(pro)} />
          ))}
        </ScrollView>

        {/* NEARBY */}
        <View className="flex-row items-center justify-between px-5 pb-3">
          <Text className="font-heading text-lg font-bold text-nuit">📍 Près de chez vous</Text>
          <Text className="text-[13px] font-semibold text-golfe-green">Voir tout</Text>
        </View>
        <View className="px-5">
          {MOCK_NEARBY.map((pro) => (
            <NearbyItem key={pro.id} pro={pro} onPress={() => onOpenPro(pro)} />
          ))}
        </View>
      </ScrollView>

      <FloatingCart onPress={onOpenCart} />
    </View>
  );
}
