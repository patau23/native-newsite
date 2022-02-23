import "react-native-gesture-handler"
import * as React from "react"
import {AppRegistry} from "react-native"
import App from "./App"
import {name as appName} from "./app.json"
import {NavigationContainer} from "@react-navigation/native"

const rootElement = () => {
  return (
    <NavigationContainer>
      <App />
    </NavigationContainer>
  )
}

AppRegistry.registerComponent(appName, () => rootElement)
