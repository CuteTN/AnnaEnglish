import React from "react";
import { StyleSheet, Text, View, Image } from "react-native";
import Octicons from "react-native-vector-icons/Octicons";
import { useNavigation } from "@react-navigation/core";
import { colors } from "../../config/colors";
import { useSignedIn } from "../../hooks/useSignedIn";
import { getUserStats } from "../../Utils/user";

export default function Header({ title, showCoin }) {
  const navigation = useNavigation();
  const { user } = useSignedIn();

  const openMenu = () => {
    // navigation.navigate(SCREENS.mainApp.name);
    navigation.goBack();
  };

  return (
    <View style={styles.header}>
      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
        <View
          style={{
            flexDirection: "row",
          }}
        >
          <Octicons
            name="chevron-left"
            size={28}
            onPress={openMenu}
            style={styles.icon}
          />
          <Text style={styles.headerText}>{title}</Text>
        </View>
        {showCoin ? (
          <View
            style={{
              flexDirection: "row",
              alignContent: "flex-end",
              justifyContent: "space-between",
            }}
          >
            <Text
              style={{
                fontSize: 22,
                justifyContent: "flex-end",
                marginRight: 3,
                fontFamily: "Cucho",
                color: colors.black,
              }}
            >
              {getUserStats("coins", user)}
            </Text>
            <Image
              source={{ uri: "https://imgur.com/B2sbpi2.png" }}
              style={{
                width: 24,
                resizeMode: "center",
                marginRight: 10,
              }}
            />
          </View>
        ) : (
          <></>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    width: "100%",
    height: 60,
    justifyContent: "center",
    backgroundColor: colors.primary,
  },
  headerText: {
    fontFamily: "Pony",
    fontSize: 20,
    color: "#333",
    letterSpacing: 1,
    marginLeft: 60,
  },
  icon: {
    position: "absolute",
    marginLeft: 20,
  },
});
