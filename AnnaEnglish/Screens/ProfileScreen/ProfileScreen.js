import { useNavigation } from '@react-navigation/core';
import React from 'react'
import { Button, Text, View } from "react-native";
import Fire from '../../firebase/Fire';
import { useSignedIn } from '../../hooks/useSignedIn';
import stylesTabbar from "../TabNavigation/styles"
import style from "./styles"

function ProfileScreen() {
  const navigation = useNavigation();
  const { user, updateUser } = useSignedIn();

  const handleSignOutPress = () => {
    Fire.signOut().then(
      isSuccessful => {
        if (isSuccessful)
          navigation.navigate("SignIn");
      }
    )
  }

  // const handlTestHookPress = () => {
  //   if (!user?.ok)
  //     updateUser({ ok: "okok" })
  //   else
  //     updateUser({ ok: "" })
  // }

  return (
    <View style={stylesTabbar.tabbar}>
      <Text>Profile</Text>
      <Text>{JSON.stringify(user)}</Text>
      <Button onPress={handleSignOutPress} title="Back to sign in" />

      {/* <Button onPress={handlTestHookPress} title="Test Signed In hook" /> */}
    </View>
  )
}

export default ProfileScreen