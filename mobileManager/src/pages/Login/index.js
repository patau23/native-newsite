import axios from "axios"
import React, { useEffect, useState } from "react"
import { View, TextInput, TouchableOpacity, Text, Button } from "react-native"
import { style } from "../style"

export default function LoginScreen() {
  const [username, setUsername] = useState('admin')
  const [password, setPassword] = useState('adminadmin')
  const [data, setData] = useState(null)

  const singIn = () => {
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
        <Text style={style.loginText} onPress={() => { singIn() }}>LOGIN</Text>
      </TouchableOpacity>
    </View>
  )
}
