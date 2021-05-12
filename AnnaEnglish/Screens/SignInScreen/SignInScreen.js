import React from 'react'
import { Button, Text, View } from "react-native";
import styleTabbar from "../TabNavigation/styles"

function SignInScreen({ navigation }) {
  const handleConfirmPress = () => {
    navigation.navigate("MainApp", {})
  }

  return (
    <View style={styleTabbar.tabbar}>
      <Text>SignIn</Text>
      <Button onPress={handleConfirmPress} title="Confirm" />
    </View>
  )
}

export default SignInScreen