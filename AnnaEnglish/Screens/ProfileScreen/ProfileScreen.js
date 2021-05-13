import { useNavigation } from '@react-navigation/core';
import React from 'react'
import { Button, Text, View } from "react-native";
import stylesTabbar from "../TabNavigation/styles"

function ProfileScreen() {
  const navigation = useNavigation()

  const handleBackToSignInPressed = () => {
    navigation.navigate("SignIn")
  }

  return (
    <View style={stylesTabbar.tabbar}>
      <Text>Profile</Text>
      <Button onPress={handleBackToSignInPressed} title="Back to sign in" />
    </View>
  )
}

export default ProfileScreen