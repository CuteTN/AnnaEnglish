import { useNavigation } from '@react-navigation/core';
import React from 'react'
import { Button, Text, View } from "react-native";
import Fire from '../../firebase/Fire';
import { useSignedIn } from '../../hooks/useSignedIn';
import { createActionSignOut } from '../../redux/actions/CreateActionSignedIn';
import stylesTabbar from "../TabNavigation/styles"
import style from "./styles"

function ProfileScreen() {
  const navigation = useNavigation();
  const { user, updateUser } = useSignedIn();

  const handleBackToSignInPressed = () => {
    Fire.signOut().then(
      isSuccessful => {
        if (isSuccessful)
          navigation.navigate("SignIn");
      }
    )
  }

  const handlTestHookPressed = () => {
    if (!user?.ok)
      updateUser({ ok: "okok" })
    else
      updateUser({ ok: "" })
  }

  return (
    <View style={stylesTabbar.tabbar}>
      <Text>Profile</Text>
      <Text>{JSON.stringify(user)}</Text>
      <Button onPress={handleBackToSignInPressed} title="Back to sign in" />

      <Button onPress={handlTestHookPressed} title="Test Signed In hook" />
    </View>
  )
}

export default ProfileScreen