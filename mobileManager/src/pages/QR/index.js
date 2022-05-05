import React, {useEffect, useState} from "react";

import {
  AppRegistry,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Linking,
} from "react-native";

import api from "../../services/api/index";
import QRCodeScanner from "react-native-qrcode-scanner";
import {useAuth} from "../../hooks/useAuth/useAuth";

export default function QRScreen({navigation}) {
  const auth = useAuth();
  const CONFIG = {
    cache: "no-cache",
    mode: "no-cors",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: `Bearer ${auth.token}`,
    },
  };
  const [isLoading, setIsLoading] = useState(false);
  const [code, setCode] = useState();
  let thisScanner = null;

  const onSuccess = async e => {
    // wait(2000).then(function () {
    // navigation.navigate("Home", {code: e.data})
    // })
    console.log("QR 35 - doing request to find item");
    setIsLoading(true);
    console.log(e.data);
    await api.auth
      .checkItem(
        JSON.stringify({
          code: e.data,
        }),
        CONFIG,
      )
      .then(
        ({data}) => setCode(data),
        e => {
          console.warn("fetch failure", e.response.data);
        },
      )
      .catch(e => {
        console.log("something goes wrong");
        console.log(e);
        throw e;
      })
      .finally(() => setIsLoading(false));
    console.log(code, "yeah we get some code");
    navigation.navigate("Home", {code: code});
  };

  return (
    <View>
      <QRCodeScanner
        cameraStyle={styles.qrstyles}
        onRead={e => onSuccess(e)}
        ref={node => (thisScanner = node)}
        reactivate={false}
      />
      {isLoading ? <Text>Loading, Wait</Text> : <></>}
    </View>
  );
}

const styles = StyleSheet.create({
  qrstyles: {},
});
