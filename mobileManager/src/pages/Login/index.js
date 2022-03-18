import axios from "axios"
import api from "../../services/api/index"
import React, { useEffect, useState } from "react"
import { View, TextInput, TouchableOpacity, Text, Button } from "react-native"
import { useAuth } from "../../hooks/useAuth/useAuth"
import { style } from "../style"

export default function LoginScreen() {
  const auth = useAuth()

  const [username, setUsername] = useState("admin")
  const [password, setPassword] = useState("adminadmin")
  const [isLoading, setIsLoading] = useState(false)
  const [data, setData] = useState(null)

  const [error, setError] = useState()

  const singIn = async () => {
    try {
      console.log("doing request")
      setIsLoading(true)
      const { data: loginData } = await api.auth.login(
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
      setData(loginData)
      console.log(loginData)
    } catch (e) {
      console.log(e, e.response.status)
      e.response.status === 401 ? setError('Введен неправильный логин или пароль') : setError(null)

      if (e.response.status === 422) {
        Object.keys(e.response.data.errors).forEach(key => {
          throw Error(`${key}, {
            type: manual,
            message: ${e.response.data.errors[key]}
          }`)
        })
      }
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    console.log("after request yo", data)
    try {
      auth.setToken(data.token)
      console.log(auth.token)
      auth.setUser(data.data.id)
      console.log(auth.user)
    } catch {
      console.log("first item")
    }
  }, [data])

  return (
    <View style={style.screen}>
      <Text>LoginScreen</Text>
      <View style={style.inputView}>
        <TextInput
          style={style.textInput}
          placeholder='login'
          placeholderTextColor='#FFCA4A'
          // value='admin'
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
          // value='adminadmin'
          secureTextEntry={true}
          onChangeText={password => setPassword(password)}
        />
      </View>
      {error ? <Text style={style.textErr}>{error}</Text> : <></>}
      <TouchableOpacity
        style={style.loginBtn}
        onPress={() => {
          singIn()
        }}
        disabled={isLoading}
      >
        <Text
          style={style.loginText}
        >
          LOGIN
        </Text>
      </TouchableOpacity>
    </View>
  )
}
