import { View, Text, FlatList, RefreshControl, TouchableOpacity } from "react-native"
import React, { useEffect, useState } from "react"
import { AuthStore, useAuthStore } from "@/store/authStore"
import styles from "@/assets/styles/home.styles"
import { DateItemProps } from "@/interfaces"
import COLORS from "@/constants/colors"
import { useRouter } from "expo-router"

export default function Home() {
  const { token } = useAuthStore() as AuthStore
  const [dates, setDates] = useState([])
  const [refreshing, setRefreshing] = useState(false)

  const router = useRouter()

  const fetchDates = async (refresh = false) => {
    if (refresh) {
      setRefreshing(true)
    }

    try {
      const response = await fetch(process.env.EXPO_PUBLIC_API_BASE_URL + "/event", {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          ...(process.env.EXPO_PUBLIC_API_KEY && { "api-key": process.env.EXPO_PUBLIC_API_KEY }),
          ...(token && { Authorization: `Bearer ${token}` }),
        },
      })

      const data = await response.json()
      if (data) {
        setDates(data)
        setRefreshing(false)
      }
    } catch (error) {
      console.error("Error fetching dates:", error)
      setRefreshing(false)
    }
  }

  useEffect(() => {
    fetchDates()
  }, [])

  const renderDateItem = ({ item }: { item: DateItemProps }) => {
    return (
      <TouchableOpacity
        onPress={() =>
          router.push({
            pathname: "/details/[id]",
            params: {
              id: item.id,
              description: item.description,
            },
          })
        }
      >
        <View style={styles.bookCard}>
          <View style={styles.bookHeader}>
            <View style={styles.userInfo}>
              <Text style={styles.username}>{item.description}</Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    )
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={dates}
        renderItem={renderDateItem}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={() => fetchDates(true)}
            tintColor={COLORS.primary}
            colors={[COLORS.primary]}
          />
        }
      />
    </View>
  )
}
