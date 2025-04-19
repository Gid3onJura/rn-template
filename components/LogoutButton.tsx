import { View, Text, TouchableOpacity, Alert } from "react-native"
import React from "react"
import { AuthStore, useAuthStore } from "@/store/authStore"
import styles from "@/assets/styles/profile.styles"
import Ionicons from "react-native-vector-icons/Ionicons"
import COLORS from "@/constants/colors"

export default function LogoutButton() {
  const { logout } = useAuthStore() as AuthStore

  const confirmLogout = () => {
    Alert.alert("Logout", "Möchten Sie sich wirklich abmelden?", [
      { text: "Abbrechen", style: "cancel" },
      { text: "Abmelden", onPress: () => logout(), style: "destructive" },
    ])
  }
  return (
    <TouchableOpacity onPress={confirmLogout} style={styles.logoutButton}>
      <Ionicons name="log-out-outline" size={20} color={COLORS.white} />
      <Text style={styles.logoutText}>Logout</Text>
    </TouchableOpacity>
  )
}
