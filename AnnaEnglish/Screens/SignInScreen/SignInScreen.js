import { useNavigation } from '@react-navigation/core';
import React, { useState } from 'react'
import { Button, SafeAreaView, Text, TextInput } from "react-native";
import Fire from '../../firebase/Fire';
import { createActionSignIn } from '../../redux/actions/CreateActionSignedIn';
import * as sharedStyle from "../../shared/styles"

const styleTextInput = {
  borderColor: "hotpink",
  paddingBottom: 10,
  height: "auto",
  width: "80%",
  borderWidth: 2,
  fontSize: 20,
}

function SignInScreen({ }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigation = useNavigation();

  const handleButtonSignInPress = () => {
    Fire.signInWithUsername(username, password).then(
      isSuccessful => {
        if (isSuccessful) {
          navigation.navigate("MainApp")
        }
      }
    )
  }

  const handleButtonSignUpPress = () => {
    navigation.navigate("SignUp")
  }

  return (
    <SafeAreaView style={sharedStyle.center}>

      <Text>{"Hi kid! What's your name >w<"}</Text>
      <TextInput
        style={styleTextInput}
        placeholder="Enter your name!"
        onChangeText={setUsername}
      />

      <Text>{"Tell me your password UwU"}</Text>
      <TextInput
        style={styleTextInput}
        placeholder="Enter your password!"
        onChangeText={setPassword}
      />

      <Button
        onPress={handleButtonSignInPress}
        title="Sign In"
      />

      <Button
        onPress={handleButtonSignUpPress}
        title="Go to Sign Up"
      />
    </SafeAreaView >
  )
}

export default SignInScreen