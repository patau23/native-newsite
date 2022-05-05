import React from "react";
import {View, TextInput as RNTextInput} from "react-native";

export default function LoginInput(props) {
  return (
    <View style={style.inputView}>
      <RNTextInput
        style={style.textInput}
        placeholderTextColor="#FFCA4A"
        placeholder={props.placeholder}
        secureTextEntry={props.isSecure}
        onChangeText={text => {
          props.onChangeText(text);
        }}
      />
    </View>
  );
}
const style = {
  inputView: {
    backgroundColor: "#5B76F0",
    borderRadius: 30,
    width: "70%",
    height: 45,
    marginBottom: 20,
    alignItems: "center",
  },
  textInput: {
    color: "#fff",
    height: 50,
    flex: 1,
    padding: 10,
    marginLeft: 20,
    alignItems: "center",
  },
};
