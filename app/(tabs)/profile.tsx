import { View, Text, TouchableOpacity } from "react-native"
import React from "react"
import { AuthStore, useAuthStore } from "@/store/authStore"

export default function Profile() {
  const { logout } = useAuthStore() as AuthStore
  return (
    <View>
      <Text>Profile</Text>
      <TouchableOpacity onPress={logout}>
        <Text>Logout</Text>
      </TouchableOpacity>
    </View>
  )
}
