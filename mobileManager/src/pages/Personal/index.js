import React from "react"
import {View, StatusBar, StyleSheet, Text, Button} from "react-native"
import {useAuth} from "../../hooks/useAuth/useAuth"
import {style} from "../style"

export default function PersonalScreen ({navigation}) {
  const auth = useAuth()
  const user = auth.user

  return (
    <View style={style.screen}>
      <Text>
        {user.id}
        {user.first_name}
        {user.last_name}
        {user.ip}
      </Text>
      <Text>PersonalScreen</Text>
    </View>
  )
}
