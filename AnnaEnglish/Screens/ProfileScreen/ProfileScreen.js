import { useNavigation } from "@react-navigation/core";
import React from "react";
import Fire from "../../firebase/Fire";
import { useSignedIn } from "../../hooks/useSignedIn";
import stylesTabbar from "../TabNavigation/styles";
import { View, SafeAreaView, StyleSheet } from "react-native";
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

function ProfileScreen() {
  const navigation = useNavigation();
  const { user, updateUser } = useSignedIn();

  const handleSignOutPress = () => {
    Fire.signOut().then((isSuccessful) => {
      if (isSuccessful) navigation.navigate("SignIn");
    });
  };

  const handleEditProfilePress = () => {};

  // const handlTestHookPress = () => {
  //   if (!user?.ok)
  //     updateUser({ ok: "okok" })
  //   else
  //     updateUser({ ok: "" })
  // }

  return (
    // <View style={stylesTabbar.tabbar}>
    //   <Text>Profile</Text>
    //   <Text>{JSON.stringify(user)}</Text>
    //   <Button onPress={handleSignOutPress} title="Back to sign in" />

    //   {/* <Button onPress={handlTestHookPress} title="Test Signed In hook" /> */}
    // </View>
    <SafeAreaView style={styles.container}>
      <View style={styles.userInfoSection}>
        <View style={{ flexDirection: "row", marginTop: 15 }}>
          <Avatar.Image
            source={{
              uri: "https://scontent-hkg4-2.xx.fbcdn.net/v/t1.6435-9/179048033_1139396113169332_2102843025754757575_n.jpg?_nc_cat=110&ccb=1-3&_nc_sid=09cbfe&_nc_ohc=Mv9EpCXnTbMAX9FBuWV&_nc_ht=scontent-hkg4-2.xx&oh=cec25d4ac42898a48ae88de4cbb58ede&oe=60D517BD",
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
              Thy cute đáng iu
            </Title>
            <Caption style={styles.caption}>@hellangel108</Caption>
          </View>
        </View>
      </View>

      <View style={styles.userInfoSection}>
        <View style={styles.row}>
          <Icon name="map-marker-radius" color="#777777" size={20} />
          <Text style={{ color: "#777777", marginLeft: 20 }}>Viet Nam</Text>
        </View>
        <View style={styles.row}>
          <Icon name="gender-male-female" color="#777777" size={20} />
          <Text style={{ color: "#777777", marginLeft: 20 }}>Khác</Text>
        </View>
        <View style={styles.row}>
          <Icon name="calendar-today" color="#777777" size={20} />
          <Text style={{ color: "#777777", marginLeft: 20 }}>10/08/2000</Text>
        </View>
        <View style={styles.row}>
          <Icon name="email" color="#777777" size={20} />
          <Text style={{ color: "#777777", marginLeft: 20 }}>
            Còn cái gì đó k biết
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
        <TouchableRipple onPress={() => {}}>
          <View style={styles.menuItem}>
            <Icon name="lock" color="#0C2C71" size={25} />
            <Text style={styles.menuItemText}>Đổi mật khẩu</Text>
          </View>
        </TouchableRipple>
        <TouchableRipple
          onPress={() => {
            navigation.navigate("EditProfile");
          }}
        >
          <View style={styles.menuItem}>
            <Icon name="account-edit" color="#0C2C71" size={25} />
            <Text style={styles.menuItemText}>Đổi thông tin cá nhân</Text>
          </View>
        </TouchableRipple>
        <TouchableRipple>
          <View style={styles.menuItem}>
            <Icon name="share-outline" color="#0C2C71" size={25} />
            <Text style={styles.menuItemText}>Cái gì chưa biết</Text>
          </View>
        </TouchableRipple>
        <TouchableRipple onPress={() => {}}>
          <View style={styles.menuItem}>
            <Icon name="logout" color="#0C2C71" size={25} />
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
    fontSize: 16,
    lineHeight: 26,
  },
});
