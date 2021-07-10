import React from "react";
import { StyleSheet, Text, View } from "react-native";
import Octicons from "react-native-vector-icons/Octicons";
import { useNavigation } from "@react-navigation/core";
import { colors } from "../../config/colors";

export default function Header({ title }) {
  const navigation = useNavigation();
  const openMenu = () => {
    // navigation.navigate(SCREENS.mainApp.name);
    navigation.goBack();
  };

  return (
    <View style={styles.header}>
      <Octicons
        name="chevron-left"
        size={28}
        onPress={openMenu}
        style={styles.icon}
      />
      <View>
        <Text style={styles.headerText}>{title}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    width: "100%",
    height: 60,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.primary,
  },
  headerText: {
    fontFamily: "Pony",
    fontSize: 20,
    color: "#333",
    letterSpacing: 1,
  },
  icon: {
    position: "absolute",
    left: 16,
  },
});
