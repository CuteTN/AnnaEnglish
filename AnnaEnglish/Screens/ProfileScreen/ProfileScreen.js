import { useNavigation } from "@react-navigation/core";
import React, { useState } from "react";
import Fire from "../../firebase/Fire";
import { useSignedIn } from "../../hooks/useSignedIn";
import stylesTabbar from "../TabNavigation/styles";
import { View, SafeAreaView, StyleSheet } from "react-native";
import { Text, TouchableRipple } from "react-native-paper";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import EditProfileScreen from "../EditProfileScreen/EditProfileScreen";
import style from "./styles";
import { SCREENS } from "..";
import CompleteModal from "../../components/games/CompleteModal/CompleteModal";
import AvatarCard from "../../components/card/AvatarCard/AvatarCard";
import { colors } from "../../config/colors";

function ProfileScreen() {
  const navigation = useNavigation();
  const { user } = useSignedIn();

  const handleSignOutPress = () => {
    Fire.signOut().then((isSuccessful) => {
      if (isSuccessful) navigation.replace(SCREENS.signIn.name);
    });
  };

  const handleEditProfilePress = () => {};

  // const handlTestHookPress = () => {
  //   if (!user?.ok)
  //     updateUser({ ok: "okok" })
  //   else
  //     updateUser({ ok: "" })
  // }

  const handle = () => {};

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.card}>
        <AvatarCard user={user}></AvatarCard>
        <View style={styles.row}>
          <Icon name="map-marker-radius" color={colors.icon} size={28} />
          <Text style={styles.textItem}>{user?.country}</Text>
        </View>
        <View style={styles.row}>
          <Icon name="gender-male-female" color={colors.icon} size={28} />
          <Text style={styles.textItem}>
            {user?.gender === "Male" ? "Nam" : "Nữ"}
          </Text>
        </View>
        <View style={styles.row}>
          <Icon name="calendar-today" color={colors.icon} size={28} />
          <Text style={styles.textItem}>{user?.birthday}</Text>
        </View>
      </View>

      <View style={styles.menuWrapper}>
        <TouchableRipple onPress={handle}>
          <View style={styles.menuItem}>
            <Icon name="lock" color={colors.primary} size={30} />
            <Text style={styles.menuItemText}>Đổi mật khẩu</Text>
          </View>
        </TouchableRipple>
        <TouchableRipple
          onPress={() => {
            navigation.navigate(SCREENS.editProfile.name);
          }}
        >
          <View style={styles.menuItem}>
            <Icon name="account-edit" color="#0C2C71" size={30} />
            <Text style={styles.menuItemText}>Đổi thông tin cá nhân</Text>
          </View>
        </TouchableRipple>
        <TouchableRipple
          onPress={() => {
            navigation.navigate(SCREENS.note.name);
          }}
        >
          <View style={styles.menuItem}>
            <Icon name="note-outline" color="#0C2C71" size={30} />
            <Text style={styles.menuItemText}>Ghi chú</Text>
          </View>
        </TouchableRipple>
        <TouchableRipple onPress={handleSignOutPress}>
          <View style={styles.menuItem}>
            <Icon name="logout" color="#0C2C71" size={30} />
            <Text style={styles.menuItemText}>Đăng xuất</Text>
          </View>
        </TouchableRipple>
      </View>
    </SafeAreaView>
  );
}

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  card: {
    margin: 30,
    marginTop: 50,
    backgroundColor: colors.card,
    borderRadius: 15,
    borderWidth: 2,
    borderColor: colors.border,
    elevation: 5,
    position: "relative",
  },
  userInfoSection: {
    paddingHorizontal: 30,
    marginBottom: 10,
    marginTop: 20,
  },
  row: {
    flexDirection: "row",
    marginBottom: 10,
    marginLeft: 40,
  },
  infoBoxWrapper: {
    borderBottomColor: "#dddddd",
    borderBottomWidth: 1,
    borderTopColor: "#dddddd",
    borderTopWidth: 1,
    flexDirection: "row",
    height: 1,
  },
  infoBox: {
    width: "50%",
    alignItems: "center",
    justifyContent: "center",
  },
  menuWrapper: {
    marginTop: 10,
  },
  menuItem: {
    flexDirection: "row",
    paddingVertical: 15,
    paddingHorizontal: 30,
  },
  menuItemText: {
    color: "#777777",
    marginLeft: 20,
    fontWeight: "600",
    fontSize: 18,
    lineHeight: 26,
  },
  textItem: {
    color: colors.text,
    marginLeft: 20,
    fontSize: 18,
    fontFamily: "Cucho",
  },
});
