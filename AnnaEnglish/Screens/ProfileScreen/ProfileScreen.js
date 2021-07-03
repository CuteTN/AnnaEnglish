import { useNavigation } from "@react-navigation/core";
import React, { useState } from "react";
import Fire from "../../firebase/Fire";
import { useSignedIn } from "../../hooks/useSignedIn";
import stylesTabbar from "../TabNavigation/styles";
import {
  View,
  SafeAreaView,
  StyleSheet,
  Button,
  Image,
  TouchableOpacity,
} from "react-native";
import {
  Avatar,
  Title,
  Caption,
  Text,
  TouchableRipple,
} from "react-native-paper";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import EditProfileScreen from "../EditProfileScreen/EditProfileScreen";
import style from "./styles";
import { SCREENS } from "..";
import CompleteModal from "../../components/games/CompleteModal/CompleteModal";

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
      <View style={styles.userInfoSection}>
        <View style={{ flexDirection: "row", marginTop: 15 }}>
          <Avatar.Image
            source={{
              uri: "https://imgur.com/Dtm2ZfO.png",
            }}
            size={80}
          />
          <View style={{ marginLeft: 20 }}>
            <Title
              style={[
                styles.title,
                {
                  marginTop: 15,
                  marginBottom: 5,
                },
              ]}
            >
              {user?.name}
            </Title>
            <Caption style={styles.caption}>{"@" + user?.displayName}</Caption>
          </View>
        </View>
      </View>

      <View style={styles.userInfoSection}>
        <View style={styles.row}>
          <Icon name="map-marker-radius" color="#777777" size={30} />
          <Text style={{ color: "#777777", marginLeft: 20, fontSize: 18 }}>
            {user?.country}
          </Text>
        </View>
        <View style={styles.row}>
          <Icon name="gender-male-female" color="#777777" size={30} />
          <Text style={{ color: "#777777", marginLeft: 20, fontSize: 18 }}>
            {user?.gender === "Male" ? "Nam" : "Nữ"}
          </Text>
        </View>
        <View style={styles.row}>
          <Icon name="calendar-today" color="#777777" size={30} />
          <Text style={{ color: "#777777", marginLeft: 20, fontSize: 18 }}>
            {user?.birthday}
          </Text>
        </View>
      </View>

      <View style={styles.infoBoxWrapper}>
        {/* <View
          style={[
            styles.infoBox,
            {
              borderRightColor: "#dddddd",
              borderRightWidth: 1,
            },
          ]}
        >
          <Title>₹140.50</Title>
          <Caption>Wallet</Caption>
        </View>
        <View style={styles.infoBox}>
          <Title>12</Title>
          <Caption>Orders</Caption>
        </View> */}
      </View>

      <View style={styles.menuWrapper}>
        <TouchableRipple onPress={handle}>
          <View style={styles.menuItem}>
            <Icon name="lock" color="#0C2C71" size={30} />
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
  },
  userInfoSection: {
    paddingHorizontal: 30,
    marginBottom: 10,
    marginTop: 30,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
  },
  caption: {
    fontSize: 14,
    lineHeight: 14,
    fontWeight: "500",
  },
  row: {
    flexDirection: "row",
    marginBottom: 12,
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
});
