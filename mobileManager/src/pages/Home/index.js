import React, {useState, useEffect} from "react";
import {View, Text, Button} from "react-native";
import {style} from "../style";
import {useAuth} from "../../hooks/useAuth/useAuth";

export default function HomeScreen({navigation, route}) {
  const auth = useAuth();

  return (
    <View style={style.screen}>
      <Text>Home!</Text>
    </View>
  );
}
