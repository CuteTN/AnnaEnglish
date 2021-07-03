import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { colors } from "../../../config/colors";
export const PrimaryButton = ({ label, background, color, onPress }) => {
  const background_color = background || colors.primary;
  const label_color = color || colors.white;
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={[styles.btn, { backgroundColor: background_color }]}
        onPress={onPress}
      >
        <Text style={[styles.label, { color: label_color }]}>{label}</Text>
      </TouchableOpacity>
    </View>
  );
};

export const styles = StyleSheet.create({
  container: {
    display: "flex",
  },
  btn: {
    borderRadius: 20,
  },
  label: {
    textAlign: "center",
    fontSize: 18,
    fontWeight: "400",
    padding: 20,
  },
});
