import AsyncStorage from "@react-native-async-storage/async-storage"
import { create } from "zustand"

export const useAuthStore = create((set) => ({
  user: null,
  token: null,
  isLoading: false,

  login: async (username: string, password: string) => {
    set({ isLoading: true })

    try {
      const response = await fetch(process.env.EXPO_PUBLIC_API_BASE_URL + "/login", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          ...(process.env.EXPO_PUBLIC_API_KEY && { "api-key": process.env.EXPO_PUBLIC_API_KEY }),
        },
        body: JSON.stringify({
          nickname: username,
          password: password,
        }),
      })

      const data = await response.json()
      if (!response.ok) {
        throw new Error(data.message || "Login fehlgeschlagen")
      }

      // store access token and user data in AsyncStorage
      await AsyncStorage.setItem("user", JSON.stringify(data.user))
      await AsyncStorage.setItem("token", data.accessToken)

      // update the store with user data and token
      set({
        token: data.accessToken,
        user: data.user,
        isLoading: false,
      })

      return {
        success: true,
      }
    } catch (error: any) {
      set({ isLoading: false })
      console.error("Login error:", error)
      return {
        success: false,
        message: error.message || "Ein Fehler ist aufgetreten",
      }
    }
  },
}))
