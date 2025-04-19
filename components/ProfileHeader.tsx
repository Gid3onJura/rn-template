import { View, Text, Image } from "react-native"
import React from "react"
import styles from "@/assets/styles/profile.styles"
import { AuthStore, useAuthStore } from "@/store/authStore"

export default function ProfilHeader() {
  const { user } = useAuthStore() as AuthStore

  if (!user) {
    return null
  }

  return (
    <View style={styles.profileHeader}>
      <Image source={{ uri: "https://picsum.photos/200" }} style={styles.profileImage} />
      <View style={styles.profileInfo}>
        <Text style={styles.username}>{user.name}</Text>
        <Text style={styles.email}>{user.email}</Text>
      </View>
    </View>
  )
}
