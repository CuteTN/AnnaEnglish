import React from "react";
import {
  View,
  Text,
  Platform,
  ScrollView,
  KeyboardAvoidingView,
} from "react-native";
import { useNavigation } from "@react-navigation/core";
import Animated from "react-native-reanimated";
import { styles } from "./styles";
import { SCREENS } from "..";
import { PassWordInput } from "../../components/forms/PassWordInput/PassWordInput";
import { PrimaryButton } from "../../components/buttons/PrimaryButton/PrimaryButton";
import Header from "../../components/Header/Header";
import Fire from "../../firebase/Fire";

const EditPasswordScreen = () => {
  // const { user, updateUser } = useSignedIn();
  const navigation = useNavigation();

  const handleChangePassword = (oldPassword, newPassword) => {
    Fire.checkPassword(oldPassword).then(isSuccessful => {
      if (isSuccessful) {
        Fire.updatePassword(newPassword);
        console.info("Password changed!");
        navigation.navigate(SCREENS.mainApp.name);
      }
      else {
        console.info("Password is incorrect!");
      }
    })
  }

  const handleSaveButtonPress = () => {
    if (newPassword.current === newPasswordConfirm.current)
      handleChangePassword(oldPassword.current, newPassword.current);
    else {
      console.info("New password confirmation doesn't match");
    }
  };

  const oldPassword = React.useRef("");
  const newPassword = React.useRef("");
  const newPasswordConfirm = React.useRef("");

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : null}
      keyboardVerticalOffset={Platform.OS === "ios" ? 64 : 0}
    >
      <View style={{ marginTop: 30 }}>
        <Header title="EDIT PASSWORD" />
      </View>
      <ScrollView style={styles.container}>
        <Animated.View
          style={{
            margin: 20,
          }}
        >
          <Text
            style={[
              styles.text_footer,
              {
                marginTop: 15,
              },
            ]}
          >
            Mật khẩu cũ
          </Text>
          <View style={styles.inputItem}>
            <PassWordInput
              placeHolder={"Nhập mật khẩu hiện tại"}
              onChangeText={text => oldPassword.current = text}
            />
          </View>
          <Text style={[styles.text_footer]}>Mật khẩu mới</Text>
          <View style={styles.inputItem}>
            <PassWordInput
              placeHolder={"Nhập mật khẩu mới"}
              onChangeText={text => newPassword.current = text}
            />
          </View>
          <Text style={[styles.text_footer]}>Xác nhận mật khẩu mới</Text>
          <View style={styles.inputItem}>
            <PassWordInput
              placeHolder={"Nhập lại mật khẩu mới"}
              onChangeText={text => newPasswordConfirm.current = text}
            />
          </View>

          <View style={styles.getStartedbtnItemWrapper}>
            <PrimaryButton
              label={"SAVE CHANGES "}
              onPress={handleSaveButtonPress}
            />
          </View>
        </Animated.View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default EditPasswordScreen;
