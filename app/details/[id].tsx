import { View, Text } from "react-native"
import React from "react"
import { useLocalSearchParams, Stack } from "expo-router"

export default function Details() {
  const { id, description } = useLocalSearchParams()

  return (
    <>
      <Stack.Screen
        options={{
          title: "Details",
          headerBackTitle: "Zurück",
        }}
      />
      <View>
        <Text>ID: {id}</Text>
        <Text>Details für: {description}</Text>
      </View>
    </>
  )
}
