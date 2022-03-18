import React from "react"
import { View, StatusBar, StyleSheet, Text, Button } from "react-native"
import { style } from "../style"
// import QRCodeScanner from 'react-native-qrcode-scanner';

export default function QRScreen() {
  // const onSuccess = (e) => {
  //   Linking.openURL(e.data).catch(err =>
  //     console.error('An error occured', err)
  //   );
  // }


  // return (
  //   <QRCodeScanner
  //     onRead={onSuccess()}
  //     topContent={
  //       <Text style={styles.centerText}>
  //         Go to{' '}
  //         <Text style={styles.textBold}>wikipedia.org/wiki/QR_code</Text> on
  //         your computer and scan the QR code.
  //       </Text>
  //     }
  //     bottomContent={
  //       <TouchableOpacity style={styles.buttonTouchable}>
  //         <Text style={styles.buttonText}>OK. Got it!</Text>
  //       </TouchableOpacity>
  //     }
  //   />
  // );
  return (
    <View style={style.screen}>
      <Text>QRScreen</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  centerText: {
    flex: 1,
    fontSize: 18,
    padding: 32,
    color: '#777',
  },
  textBold: {
    fontWeight: '500',
    color: '#000',
  },
  buttonText: {
    fontSize: 21,
    color: 'rgb(0,122,255)',
  },
  buttonTouchable: {
    padding: 16,
  },
});

