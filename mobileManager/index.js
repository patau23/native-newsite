import "react-native-gesture-handler"
import * as React from "react"
import { AppRegistry, View } from "react-native"
import App from "./App"
import { name as appName } from "./app.json"
import { NavigationContainer } from "@react-navigation/native"
import { AuthProvider } from "./src/providers/AuthProvider/index"

const rootElement = () => {
  return (
    <AuthProvider>
      <App />
    </AuthProvider>
  )

}

AppRegistry.registerComponent(appName, () => rootElement)
