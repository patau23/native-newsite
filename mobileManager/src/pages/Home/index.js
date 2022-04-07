import React from "react"
import {View, Text} from "react-native"
import {style} from "../style"
import {useAuth} from "../../hooks/useAuth/useAuth"

export default function HomeScreen ({navigation, route}) {
  const auth = useAuth()
  console.log(navigation)
  try {
    console.log(route.params.code, "params")
  } catch {
    console.log("bruh")
  }

  return (
    <View style={style.screen}>
      <Text>Home!</Text>
    </View>
  )
}
