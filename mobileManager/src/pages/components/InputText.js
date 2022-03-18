import axios from "axios"
import api from "../../services/api/index"
import React, { useEffect, useState } from "react"
import { View, TextInput, TouchableOpacity, Text } from "react-native"
import { style } from "../style"

export default function TextInput(props) {
    return (
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
    )
}
