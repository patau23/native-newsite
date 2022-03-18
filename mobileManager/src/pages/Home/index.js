import React from "react"
import { View, StatusBar, StyleSheet, Text, Button } from "react-native"
import { style } from "../style"
import { useAuth } from "../../hooks/useAuth/useAuth"

export default function HomeScreen() {
  const auth = useAuth()

  return (
    <View style={style.screen}>
      <Text>Home!</Text>
    </View>
  )
}
