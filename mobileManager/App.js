import React, {useState} from "react"
import {View, StatusBar, StyleSheet, Text, Button} from "react-native"
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs"
import LoginScreen from "./src/pages/Login/index.js"
import QRScreen from "./src/pages/QR/index.js"
import HomeScreen from "./src/pages/Home/index.js"
import PersonalScreen from "./src/pages/Personal/index.js"
import SettingsScreen from "./src/pages/Settings/index.js"
import axios from "axios"
import Cookies from "js-cookie"

const Tab = createBottomTabNavigator()

export default function App () {
  const auth = false
  const [username, setLogin] = useState()
  const [password, setPassword] = useState()

  const singIn = (username, password) => {
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
      .then(response => console.log(response.data))
      .catch(error => {
        console.error(error)
      })
  }

  return (
    <Tab.Navigator>
      {!auth ? (
        <>
          <Tab.Screen name='Login' component={LoginScreen} />
        </>
      ) : (
        <>
          <Tab.Screen name='Home' component={HomeScreen} />
          <Tab.Screen name='QRScreen' component={QRScreen} />
          <Tab.Screen name='Personal' component={PersonalScreen} />
          <Tab.Screen name='Settings' component={SettingsScreen} />
        </>
      )}
    </Tab.Navigator>
  )
}
