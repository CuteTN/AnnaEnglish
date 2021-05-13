import { useNavigation } from '@react-navigation/core';
import React from 'react'
import { Button, Text, View } from "react-native";
import stylesTabbar from "../TabNavigation/styles"

function SignInScreen({ }) {
  const navigation = useNavigation();

  const handleConfirmPress = () => {
    navigation.navigate("MainApp", {})
  }

  return (
    <View style={stylesTabbar.tabbar}>
      <Text>SignIn</Text>
      <Button onPress={handleConfirmPress} title="Confirm" />
    </View>
  )
}

export default SignInScreen