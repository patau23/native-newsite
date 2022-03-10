import axios from "axios"
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

  const singIn = () => {
    try {
      console.log('doing request')
      axios
        .post(
          "http://34.88.192.252/api/user/login",
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
        .then(response => {
          setData(response.data)
          console.log(response.data)
        })
        .catch(error => {
          console.error(error)
        })
    }
    catch (e) {
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
      setIsLoading(false)
    }
  }

  useEffect(() => {
    console.log('after request yo', data)
  }, [data])

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
