import { View, Text, TouchableOpacity } from "react-native"
import React, { useState } from "react"
import { AuthStore, useAuthStore } from "@/store/authStore"
import ProfileHeader from "@/components/ProfileHeader"
import LogoutButton from "@/components/LogoutButton"
import styles from "@/assets/styles/profile.styles"

export default function Profile() {
  const [isLoading, setIsLoading] = useState(true)
  const [refreshing, setRefreshing] = useState(false)
  return (
    <View style={styles.container}>
      <ProfileHeader />
      <LogoutButton />
    </View>
  )
}
