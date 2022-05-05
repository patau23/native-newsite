import React from "react";
import {Button} from "react-native";
import {useAuth} from "../../../hooks/useAuth/useAuth";
import AsyncStorage from "@react-native-async-storage/async-storage";

const CheckTokenButton = () => {
  const auth = useAuth();
  const checkToken = async () => {
    console.log("in auth hook :", auth.token);
    let value = await AsyncStorage.getItem("auth-token");
    console.log("in async storage :");
    console.log(value);
  };
  return (
    <Button onPress={() => checkToken()} title="Check Token" color="#841584" />
  );
};

export default CheckTokenButton;
