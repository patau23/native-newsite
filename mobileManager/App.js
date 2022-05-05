import React, {useEffect, useState} from "react";
import {ActivityIndicator, StyleSheet, Button, View} from "react-native";

import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import {NavigationContainer} from "@react-navigation/native";

import LoginScreen from "./src/pages/Login/index.js";
import QRScreen from "./src/pages/QR/index.js";
import HomeScreen from "./src/pages/Home/index.js";
import PersonalScreen from "./src/pages/Personal/index.js";
import Settings from "./src/pages/Settings/index";

import {useAuth} from "./src/hooks/useAuth/useAuth.js";

const Tab = createBottomTabNavigator();

export default function App() {
  const auth = useAuth();

  if (!auth.isLoaded)
    return (
      <View style={[styles.container, styles.horizontal]}>
        <ActivityIndicator size="large" />
      </View>
    );

  if (!auth.user) return <LoginScreen></LoginScreen>;

  return (
    <NavigationContainer>
      <Tab.Navigator>
        <>
          <Tab.Screen name="Home" component={HomeScreen} />
          <Tab.Screen name="QRScreen" component={QRScreen} />
          <Tab.Screen name="Personal" component={PersonalScreen} />
          <Tab.Screen name="Settings" component={Settings} />
        </>
      </Tab.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
  horizontal: {
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 10,
  },
});
