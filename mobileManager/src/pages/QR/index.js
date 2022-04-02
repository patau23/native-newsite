"use strict"

import {wait} from "@testing-library/user-event/dist/utils"
import React, {useEffect, useState} from "react"

import {
  AppRegistry,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Linking,
} from "react-native"

import QRCodeScanner from "react-native-qrcode-scanner"

export default function QRScreen ({navigation}) {
  let thisScanner = null

  const onSuccess = e => {
    console.log(e.data)
    thisScanner.reactivate()
    wait(2000).then(() => navigation.navigate("Home"))
  }

  return (
    <QRCodeScanner
      onRead={e => onSuccess(e)}
      ref={node => (thisScanner = node)}
      reactivate={false}
      bottomContent={
        <TouchableOpacity
          style={styles.buttonTouchable}
          onPress={() => {
            reActivate()
          }}
        >
          <Text style={styles.buttonText}>Reactivate</Text>
        </TouchableOpacity>
      }
    />
  )
}

const styles = StyleSheet.create({
  centerText: {
    flex: 1,
    fontSize: 18,
    padding: 32,
    color: "#777",
  },
  textBold: {
    fontWeight: "500",
    color: "#000",
  },
  buttonText: {
    fontSize: 21,
    color: "rgb(0,122,255)",
  },
  buttonTouchable: {
    padding: 16,
  },
})

AppRegistry.registerComponent("default", () => QRScreen)
