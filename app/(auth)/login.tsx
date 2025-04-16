import {
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from "react-native"
import React, { useState } from "react"
import styles from "../../assets/styles/login.styles.js"
import COLORS from "@/constants/colors.js"
import Ionicons from "react-native-vector-icons/Ionicons"
import { AuthStore, useAuthStore } from "@/store/authStore"

export default function Login() {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)

  const { isLoading, login } = useAuthStore() as AuthStore

  const handleLogin = async () => {
    const result = await login(username, password)
    if (!result.success) {
      Alert.alert("Fehler", result.message || "Ein Fehler ist aufgetreten")
    }
  }

  return (
    <KeyboardAvoidingView
      style={{
        flex: 1,
      }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={Platform.OS === "ios" ? 150 : 0}
    >
      <View style={styles.container}>
        <View style={styles.topIllustration}>
          <Image
            source={require("../../assets/images/login.png")}
            style={[styles.illustrationImage, { marginBottom: 50 }]}
            resizeMode="contain"
          />
        </View>

        <View style={styles.card}>
          <View style={styles.formContainer}>
            {/* username */}
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Nutzername</Text>
              <View style={styles.inputContainer}>
                <Ionicons name="person-outline" size={20} color={COLORS.primary} style={styles.inputIcon} />
                <TextInput
                  placeholder="Nutzername"
                  style={styles.input}
                  placeholderTextColor={COLORS.placeholderText}
                  value={username}
                  onChangeText={setUsername}
                  keyboardType="email-address"
                  autoCapitalize="none"
                />
              </View>
            </View>

            {/* password */}
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Passwort</Text>
              <View style={styles.inputContainer}>
                <Ionicons name="lock-closed-outline" size={20} color={COLORS.primary} style={styles.inputIcon} />
                <TextInput
                  placeholder="Passwort"
                  style={styles.input}
                  placeholderTextColor={COLORS.placeholderText}
                  value={password}
                  onChangeText={setPassword}
                  keyboardType="default"
                  secureTextEntry={!showPassword}
                />
                <TouchableOpacity onPress={() => setShowPassword(!showPassword)} style={styles.eyeIcon}>
                  <Ionicons
                    name={showPassword ? "eye-outline" : "eye-off-outline"}
                    size={20}
                    color={COLORS.primary}
                    style={styles.inputIcon}
                  />
                </TouchableOpacity>
              </View>
            </View>

            {/* button */}
            <TouchableOpacity onPress={handleLogin} style={styles.button} disabled={isLoading}>
              {isLoading ? (
                <ActivityIndicator color="#fff" size="small" />
              ) : (
                <Text style={styles.buttonText}>Einloggen</Text>
              )}
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </KeyboardAvoidingView>
  )
}
