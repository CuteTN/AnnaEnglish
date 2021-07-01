import { useNavigation } from "@react-navigation/core";
import React, { useEffect, useState } from "react";
import { SCREENS } from "..";
import Fire from "../../firebase/Fire";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
} from "react-native";
import { PrimaryButton } from "../../components/buttons/PrimaryButton/PrimaryButton";
import { PrimaryInput } from "../../components/forms/PrimaryInput/PrimaryInput";
import { colors } from "../../config/colors";
import { useSignedIn } from "../../hooks/useSignedIn";
import { useRoute } from "@react-navigation/native";

export default SignInScreen = ({ }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigation = useNavigation();

  const { user, status } = useSignedIn();

  const navAuth = () => {
    let newRoute = null;

    if (status === "SignedIn")
      newRoute = SCREENS.mainApp.name;
    if (status === "NoInfo")
      newRoute = SCREENS.editProfile.name;

    if (newRoute && useRoute.name !== newRoute)
      navigation.replace(newRoute);
  }

  useEffect(() => {
    navAuth();
  }, [status, user]);


  const handleButtonSignInPress = () => {
    Fire.signInWithUsername(username, password).then(
      ({ error, successful }) => {
        if (successful) {
        }
      }
    );
  };

  const handleButtonSignUpPress = () => {
    navigation.navigate(SCREENS.signUp.name);
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : null}
      keyboardVerticalOffset={Platform.OS === "ios" ? 64 : 0}
    >
      <ScrollView style={styles.container}>
        <Image
          style={styles.bg}
          source={require("../../assets/images/bg1.png")}
        />

        <View style={styles.contentContainer}>
          <Text style={styles.heading}>ANNA ENGLISH</Text>

          <View style={styles.top}>
            <Image
              style={styles.welcomeImage}
              source={require("../../assets/images/book.png")}
            />
            {/* <Image
            style={styles.imageWelcome}
            source={require("../../assets/images/enjoy.png")}
          /> */}
          </View>
          <View style={styles.inputItem}>
            <PrimaryInput
              placeHolder={"Enter your name!"}
              onChangeText={setUsername}
            />
          </View>
          <View style={styles.inputItem}>
            <PrimaryInput
              placeHolder={"Enter your password!"}
              onChangeText={setPassword}
            />
          </View>
          <View style={styles.loginBtnWrapper}>
            <PrimaryButton label={"LOG IN"} onPress={handleButtonSignInPress} />
          </View>
          <Text style={styles.loginLinkWrapper}>
            <TouchableOpacity onPress={handleButtonSignUpPress}>
              <Text style={styles.notificationContent}>
                ALREADY HAVE AN ACCOUNT? SIGN UP
              </Text>
            </TouchableOpacity>
          </Text>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export const styles = StyleSheet.create({
  container: {
    backgroundColor: "#ffffff",
  },
  loginBtnWrapper: {
    marginTop: 10,
  },
  inputItem: {
    marginBottom: 20,
  },
  bg: {
    position: "absolute",
  },
  contentContainer: {
    padding: 20,
    marginTop: 30,
    flex: 1,
  },
  logo: {
    alignSelf: "center",
  },
  notificationContent: {
    color: colors.gray,
    fontSize: 14,
  },
  loginLinkWrapper: {
    textAlign: "center",
    marginTop: 20,
  },
  welcomeImage: {
    marginTop: 20,
    marginBottom: 30,
    width: 280,
    alignSelf: "center",
    height: 280,
  },
  heading: {
    fontSize: 30,
    fontWeight: "700",
    lineHeight: 40,
    textAlign: "center",
    color: "#3366CC",
  },
  top: {
    flex: 1,
    marginBottom: 10,
  },
});
