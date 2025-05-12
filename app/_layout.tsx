import SafeScreen from "@/components/SafeScreen"
import { SplashScreen, Stack, useRouter, useSegments } from "expo-router"
import { SafeAreaProvider } from "react-native-safe-area-context"
import { StatusBar } from "expo-status-bar"
import { AuthStore, useAuthStore } from "@/store/authStore"
import { useEffect } from "react"
import { useFonts } from "expo-font"

SplashScreen.preventAutoHideAsync()

export default function RootLayout() {
  const router = useRouter()
  const segments = useSegments()

  const { checkAuth, user, token } = useAuthStore() as AuthStore

  const [fontsLoaded] = useFonts({
    "JetBrainsMono-Medium": require("@/assets/fonts/JetBrainsMono-Medium.ttf"),
  })

  useEffect(() => {
    if (fontsLoaded) {
      SplashScreen.hideAsync()
    }
  }, [fontsLoaded])

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
          {/* <Stack.Screen name="(tabs)" />
          <Stack.Screen name="(auth)" /> */}
        </Stack>
      </SafeScreen>
      <StatusBar />
    </SafeAreaProvider>
  )
}
