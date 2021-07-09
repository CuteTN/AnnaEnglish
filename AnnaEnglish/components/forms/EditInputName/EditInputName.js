import React from "react";
import { View, Text, StyleSheet, TextInput, Image } from "react-native";
import { colors } from "../../../config/colors";

export const EditInputName = ({
  placeHolder,
  isValid,
  value,
  onChangeText,
}) => {
  return (
    <View style={styles.container}>
      <TextInput
        value={value}
        style={styles.input}
        placeholder={placeHolder}
        onChangeText={onChangeText}
      />
    </View>
  );
};

export const styles = StyleSheet.create({
  container: {
    display: "flex",
    // backgroundColor: "#EFEFF1",FFF464
    backgroundColor: "#FFF4C8",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  input: {
    padding: 12,
    fontSize: 16,
    fontFamily: "Cucho",
  },
  validityShowWrapper: {
    marginRight: 15,
  },
});
