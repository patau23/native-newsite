import React, {useEffect, useState} from "react"
import {Button} from "react-native"
import Cookies from "js-cookie"

import {createBottomTabNavigator} from "@react-navigation/bottom-tabs"
import {NavigationContainer} from "@react-navigation/native"

import LoginScreen from "./src/pages/Login/index.js"
import QRScreen from "./src/pages/QR/index.js"
import HomeScreen from "./src/pages/Home/index.js"
import PersonalScreen from "./src/pages/Personal/index.js"
import SettingsScreen from "./src/pages/Settings/index.js"

import {useAuth} from "./src/hooks/useAuth/useAuth.js"

const Tab = createBottomTabNavigator()

export default function App () {
  const auth = useAuth()
  console.log(
    "APP.JS 20 - token entry => ",
    auth.token ? auth.token : "token does not exist",
  )
  console.log(
    "APP.JS 24 - user entry => ",
    auth.user ? auth.user : "user in not authorized",
  )
  console.log("APPJS 28", Cookies.get("auth-token"))
  const onLogOut = () => auth.logOut()

  if (!auth.user) return <LoginScreen></LoginScreen>

  return (
    <NavigationContainer>
      <Button
        onPress={() => {
          onLogOut()
        }}
        title='Log out'
      ></Button>

      <Tab.Navigator>
        <>
          <Tab.Screen name='Home' component={HomeScreen} />
          <Tab.Screen name='QRScreen' component={QRScreen} />
          <Tab.Screen name='Personal' component={PersonalScreen} />
          {/* <Tab.Screen name='Settings' component={SettingsScreen} /> */}
        </>
      </Tab.Navigator>
    </NavigationContainer>
  )
}
