import { AuthStore, useAuthStore } from "@/store/authStore"
import { Link } from "expo-router"
import { useEffect } from "react"
import { Text, View } from "react-native"

export default function Index() {
  const { user, token, checkAuth, logout } = useAuthStore() as AuthStore

  useEffect(() => {
    checkAuth()
  }, [])

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Link href="/(auth)/login">Zum Login</Link>
    </View>
  )
}
