import { useNavigation } from '@react-navigation/core';
import React, { useState } from 'react'
import { Button, SafeAreaView, Text, TextInput } from "react-native";
import { useDispatch } from 'react-redux';
import { SCREENS } from '..';
import Fire from '../../firebase/Fire';
import { createActionSignIn } from '../../redux/actions/CreateActionSignedIn';
import * as sharedStyle from "../../shared/styles"
import { createFakeEmail } from '../../Utils/Auth';

const styleTextInput = {
  borderColor: "hotpink",
  paddingBottom: 10,
  height: "auto",
  width: "80%",
  borderWidth: 2,
  fontSize: 20,
}

function SignUpScreen({ }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigation = useNavigation();
  const dispatch = useDispatch()

  const handleButtonSignUpPress = () => {
    Fire.signUpWithUsername(username, password).then(
      isSuccessful => {
        if (isSuccessful) {
          navigation.navigate(SCREENS.mainApp.name);
          dispatch(createActionSignIn(username))
        }
      }
    )
  }

  const handleButtonSignInPress = () => {
    navigation.navigate(SCREENS.signIn.name);
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
        onPress={handleButtonSignUpPress}
        title="Sign Up"
      />

      <Button
        onPress={handleButtonSignInPress}
        title="Back to Sign In"
      />
    </SafeAreaView >
  )
}

export default SignUpScreen