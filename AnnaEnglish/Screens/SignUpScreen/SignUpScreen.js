import { useNavigation } from "@react-navigation/core";
import React, { useState } from "react";
import {
  View,
  Text,
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
import { PassWordInput } from "../../components/forms/PassWordInput/PassWordInput";
import { useButtonsModal } from "../../components/Modal/ButtonsModalProvider";
import { styles } from "./styles";

function SignUpScreen({}) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const { showOkModal } = useButtonsModal();

  const handleButtonSignUpPress = () => {
    Fire.signUpWithUsername(username, password).then(
      ({ error, successful }) => {
        if (successful) {
          navigation.replace(SCREENS.editProfile.name);
        }
        if (error) {
          showOkModal({
            label: "Tài khoản đã tồn tại",
            onOk: () => {},
          });
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
          <Text style={styles.heading}>ĐĂNG KÝ TÀI KHOẢN</Text>
          <View style={styles.inputItem}>
            <PrimaryInput
              placeHolder={"Nhập tên đăng nhập!"}
              // isValid={true}
              // value={userName}
              onChangeText={setUsername}
            />
          </View>
          <View style={styles.inputItem}>
            <PassWordInput
              placeHolder={"Nhập mật khẩu!"}
              onChangeText={setPassword}
            />
          </View>
          <View style={styles.getStartedbtnItemWrapper}>
            <PrimaryButton
              label={"ĐĂNG KÝ"}
              onPress={handleButtonSignUpPress}
            />
          </View>
          <Text style={styles.loginLinkWrapper}>
            <TouchableOpacity onPress={handleButtonSignInPress}>
              <Text style={styles.notificationContent}>
                BẠN ĐÃ CÓ TÀI KHOẢN?
              </Text>
            </TouchableOpacity>
          </Text>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

export default SignUpScreen;
