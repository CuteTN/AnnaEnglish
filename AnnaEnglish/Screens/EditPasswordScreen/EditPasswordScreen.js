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
import { useSignedIn } from "../../hooks/useSignedIn";
import { SCREENS } from "..";
import { PassWordInput } from "../../components/forms/PassWordInput/PassWordInput";
import { PrimaryButton } from "../../components/buttons/PrimaryButton/PrimaryButton";
import Header from "../../components/Header/Header";

const EditPasswordScreen = () => {
  const { user, updateUser } = useSignedIn();
  const handleSaveButtonPress = () => {};
  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : null}
      keyboardVerticalOffset={Platform.OS === "ios" ? 64 : 0}
    >
      <View style={{ marginTop: 30 }}>
        <Header title="CHỈNH SỬA MẬT KHẨU" />
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
              placeHolder={"Nhập mật khẩu cũ"}
              onChangeText={() => {}}
            />
          </View>
          <Text style={[styles.text_footer]}>Mật khẩu mới</Text>
          <View style={styles.inputItem}>
            <PassWordInput
              placeHolder={"Nhập mật khẩu mới"}
              onChangeText={() => {}}
            />
          </View>
          <Text style={[styles.text_footer]}>Mật khẩu mới</Text>
          <View style={styles.inputItem}>
            <PassWordInput
              placeHolder={"Nhập mật khẩu mới"}
              onChangeText={() => {}}
            />
          </View>

          <View style={styles.getStartedbtnItemWrapper}>
            <PrimaryButton
              label={"LƯU THAY ĐỔI"}
              onPress={handleSaveButtonPress}
            />
          </View>
        </Animated.View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default EditPasswordScreen;
