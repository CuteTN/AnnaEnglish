import { useNavigation } from "@react-navigation/core";
import React, { useState } from "react";
import {
  Button,
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
} from "react-native";
import { useDispatch } from "react-redux";
import { SCREENS } from "..";
import Fire from "../../firebase/Fire";
import { PrimaryButton } from "../../components/buttons/PrimaryButton/PrimaryButton";
import { PrimaryInput } from "../../components/forms/PrimaryInput/PrimaryInput";
import { SecondaryInput } from "../../components/forms/SecondaryInput/SecondaryInput";
import { colors } from "../../config/colors";

function SignUpScreen({}) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const handleButtonSignUpPress = () => {
    Fire.signUpWithUsername(username, password).then(
      ({ error, successful }) => {
        if (successful) {
          navigation.navigate(SCREENS.mainApp.name);
        }
      }
    );
  };

  const handleButtonSignInPress = () => {
    navigation.navigate(SCREENS.signIn.name);
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : null}
      keyboardVerticalOffset={Platform.OS === "ios" ? 64 : 0}
    >
      <ScrollView style={styles.container}>
        <Image
          style={styles.vector1}
          source={require("../../assets/images/vector1.png")}
        />
        <Image
          style={styles.vector2}
          source={require("../../assets/images/vector2.png")}
        />
        <Image
          style={styles.vector3}
          source={require("../../assets/images/vector3.png")}
        />
        <Image
          style={styles.vector4}
          source={require("../../assets/images/vector4.png")}
        />
        <View style={styles.logo}>
          <Image
            style={styles.welcomeImage}
            source={require("../../assets/images/book.png")}
          />
          {/* <Image
            style={styles.imageWelcome}
            source={require("../../assets/images/enjoy.png")}
          /> */}
        </View>
        <View styles={styles.contentContainer}>
          {/* <Image
          style={styles.back}
          source={require("../../assets/images/back.png")}
        /> */}
          <Text style={styles.heading}>CREATE YOUR ACCOUNT</Text>
          <View style={styles.inputItem}>
            <PrimaryInput
              placeHolder={"Enter your name!"}
              // isValid={true}
              // value={userName}
              onChangeText={setUsername}
            />
          </View>
          <View style={styles.inputItem}>
            <SecondaryInput
              placeHolder={"Enter your password!"}
              onChangeText={setPassword}
            />
          </View>
          <View style={styles.getStartedbtnItemWrapper}>
            <PrimaryButton
              label={"SIGN UP"}
              onPress={handleButtonSignUpPress}
            />
          </View>
          <Text style={styles.loginLinkWrapper}>
            <TouchableOpacity onPress={handleButtonSignInPress}>
              <Text style={styles.notificationContent}>BACK TO SIGN IN</Text>
            </TouchableOpacity>
          </Text>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

export default SignUpScreen;

export const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: colors.white,
  },
  vector1: {
    position: "absolute",
    left: -10,
    top: -5,
  },
  vector2: {
    position: "absolute",
    right: -6,
  },
  vector3: {
    position: "absolute",
    top: 90,
  },
  vector4: {
    position: "absolute",
    right: 0,
    top: 90,
  },
  contentContainer: {
    flex: 1,
  },
  logo: {
    flex: 1,
  },
  back: {
    marginTop: 50,
  },
  heading: {
    fontSize: 26,
    fontWeight: "700",
    lineHeight: 40,
    textAlign: "center",
    color: colors.heading,
    marginTop: 40,
    marginBottom: 30,
  },
  inputItem: {
    marginBottom: 10,
  },
  getStartedbtnItemWrapper: {
    marginTop: 30,
  },
  loginLinkWrapper: {
    textAlign: "center",
    marginTop: 20,
  },
  notificationContent: {
    color: colors.gray,
    fontSize: 14,
  },
  welcomeImage: {
    marginTop: 40,
    width: 280,
    alignSelf: "center",
    height: 280,
    margin: -20,
  },
});
