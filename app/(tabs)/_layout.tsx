import React from "react"
import { Tabs } from "expo-router"
import Ionicons from "react-native-vector-icons/Ionicons"
import COLORS from "@/constants/colors"
import { useSafeAreaInsets } from "react-native-safe-area-context"

export default function TabLayout() {
  const insets = useSafeAreaInsets()
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: COLORS.primary,
        headerTitleStyle: {
          color: COLORS.primary,
          fontWeight: "600",
        },
        headerShadowVisible: false,
        tabBarStyle: {
          backgroundColor: COLORS.cardBackground,
          borderTopWidth: 1,
          borderTopColor: COLORS.border,
          paddingTop: 5,
          paddingBottom: insets.bottom,
          height: 60 + insets.bottom,
        },
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          title: "Termine",
          headerShown: false,
          tabBarIcon: ({ color, size }) => <Ionicons name="calendar-outline" size={size} color={color} />,
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profil",
          headerShown: false,
          tabBarIcon: ({ color, size }) => <Ionicons name="bonfire-outline" size={size} color={color} />,
        }}
      />
    </Tabs>
  )
}
