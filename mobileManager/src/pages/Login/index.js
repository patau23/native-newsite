import axios from "axios"
import api from '../../services/api/index'
import React, { useEffect, useState } from "react"
import { View, TextInput, TouchableOpacity, Text, Button } from "react-native"
import { useAuth } from "../../hooks/useAuth/useAuth"
import { style } from "../style"

export default function LoginScreen() {
  const auth = useAuth()

  const [username, setUsername] = useState('admin')
  const [password, setPassword] = useState('adminadmin')
  const [isLoading, setIsLoading] = useState(false)
  const [data, setData] = useState(null)

  const singIn = async () => {
    try {
      setIsLoading(true)
      console.log('doing request')
      const { data: loginData } = await api.auth
        .login(
          "",
          JSON.stringify({
            username: username,
            password: password,
          }),
          {
            cache: "no-cache",
            mode: "no-cors",
            credentials: "include",
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json",
            },
          },
        )
      console.log('after request yo', loginData)

      auth.setToken(loginData.token)
      auth.setUser(loginData.data)

      console.log(loginData)
      console.log('loginpage', auth)
    }
    catch (e) {
      console.log('error')
      if (e.response.status === 422) {
        Object.keys(e.response.data.errors).forEach((key) => {
          throw Error(`${key}, {
            type: manual,
            message: ${e.response.data.errors[key]}
          }`)
        });
      }
    }
    finally {
      console.log('finally ill do it myself')
      setIsLoading(false)
      console.log(loginData)
      console.log('finally', auth)
    }
  }

  // useEffect(() => {
  //   console.log('after request yo', data)
  //   auth.setToken(data.token)
  //   console.log(auth.token)
  //   auth.setUser(data.data.id)
  //   console.log(auth.user)
  // }, [data])

  return (
    <View style={style.screen}>
      <Text>LoginScreen</Text>

      <View style={style.inputView}>
        <TextInput
          style={style.textInput}
          placeholder='login'
          placeholderTextColor='#FFCA4A'
          value="admin"
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
          value="adminadmin"
          secureTextEntry={true}
          onChangeText={password => setPassword(password)}
        />
      </View>

      <TouchableOpacity style={style.loginBtn}>
        <Text
          style={style.loginText}
          onPress={() => { singIn() }}
          disabled={isLoading}
        >
          LOGIN
        </Text>
      </TouchableOpacity>
    </View>
  )
}
