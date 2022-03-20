import axios from "axios"
import api from "../../services/api/index"
import React, {useEffect, useState} from "react"
import {
  View,
  TextInput as RNTextInput,
  TouchableOpacity,
  Text,
} from "react-native"
import {style} from "../style"

export default function LoginInput (props) {
  return (
    <View style={style.inputView}>
      <RNTextInput
        style={style.textInput}
        placeholderTextColor='#FFCA4A'
        placeholder={props.placeholder}
        secureTextEntry={props.isSecure}
        onChangeText={(text) => {
          props.onChangeText(text)
        }}
      />
    </View>
  )
}
