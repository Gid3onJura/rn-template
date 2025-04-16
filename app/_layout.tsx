import SafeScreen from "@/components/SafeScreen"
import { Stack, useRouter, useSegments } from "expo-router"
import { SafeAreaProvider } from "react-native-safe-area-context"
import { StatusBar } from "expo-status-bar"
import { AuthStore, useAuthStore } from "@/store/authStore"
import { useEffect } from "react"

export default function RootLayout() {
  const router = useRouter()
  const segments = useSegments()

  const { checkAuth, user, token } = useAuthStore() as AuthStore

  useEffect(() => {
    checkAuth()
  }, [])

  useEffect(() => {
    const inAuthScreen = segments[0] === "(auth)"
    const isSignedIn = user && token
    if (!isSignedIn && !inAuthScreen) {
      router.replace("/(auth)")
    } else if (isSignedIn && inAuthScreen) {
      router.replace("/(tabs)/home")
    }
  })

  return (
    <SafeAreaProvider>
      <SafeScreen>
        <Stack initialRouteName="(auth)" screenOptions={{ headerShown: false }}>
          <Stack.Screen name="(tabs)" />
          <Stack.Screen name="(auth)" />
        </Stack>
      </SafeScreen>
      <StatusBar />
    </SafeAreaProvider>
  )
}
