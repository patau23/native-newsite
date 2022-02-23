import axios from "axios"
import React, {useEffect, useState} from "react"
import {View, TextInput, TouchableOpacity, Text, Button} from "react-native"
import {style} from "../style"

export default function LoginScreen () {
  const [username, setUsername] = useState()
  const [password, setPassword] = useState()

  return (
    <View style={style.screen}>
      <Text>LoginScreen</Text>

      <View style={style.inputView}>
        <TextInput
          style={style.textInput}
          placeholder='login'
          placeholderTextColor='#FFCA4A'
          onChangeText={login => {
            setUsername(login)
          }}
        />
      </View>

      <View style={style.inputView}>
        <TextInput
          style={style.textInput}
          placeholder='password.'
          placeholderTextColor='#FFCA4A'
          secureTextEntry={true}
          onChangeText={password => setPassword(password)}
        />
      </View>

      <TouchableOpacity style={style.loginBtn}>
        <Text style={style.loginText}>LOGIN</Text>
      </TouchableOpacity>
    </View>
  )
}
