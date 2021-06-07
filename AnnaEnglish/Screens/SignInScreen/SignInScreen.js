import { useNavigation } from "@react-navigation/core";
import React, { useState } from "react";
import {
  Button,
  View,
  Text,
  TextInput,
  StyleSheet,
  Image,
  TouchableOpacity,
} from "react-native";
import Fire from "../../firebase/Fire";
import { createActionSignIn } from "../../redux/actions/CreateActionSignedIn";
import { PrimaryButton } from "../../components/buttons/PrimaryButton/PrimaryButton";
import { PrimaryInput } from "../../components/forms/PrimaryInput/PrimaryInput";
import { colors } from "../../config/colors";

export default SignInScreen = ({}) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigation = useNavigation();

  const handleButtonSignInPress = () => {
    Fire.signInWithUsername(username, password).then((isSuccessful) => {
      if (isSuccessful) {
        navigation.navigate("MainApp");
      }
    });
  };

  const handleButtonSignUpPress = () => {
    navigation.navigate("SignUp");
  };

  return (
    <View style={styles.container}>
      <Image
        style={styles.bg}
        source={require("../../assets/images/bg1.png")}
      />

      <View style={styles.contentContainer}>
        <Text style={styles.heading}>Anna English</Text>
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
          <PrimaryInput placeHolder={"Enter your password!"} />
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
    </View>
  );
};

export const styles = StyleSheet.create({
  container: {
    display: "flex",
    flex: 1,
    padding: 20,
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
    marginBottom: 90,
  },
  welcomeImage: {
    marginTop: 20,
    marginBottom: 100,
    width: 280,
    alignSelf: "center",
    height: 280,
  },
  imageWelcome: {
    marginBottom: 130,
    marginTop: 20,
  },
  heading: {
    fontSize: 30,
    fontWeight: "700",
    lineHeight: 40,
    textAlign: "center",
    color: colors.heading,
  },
});
