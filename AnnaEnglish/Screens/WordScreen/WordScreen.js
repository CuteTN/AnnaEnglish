import React, { useEffect, useRef, useState, useMemo } from "react";
import { View, SafeAreaView, StyleSheet, Text } from "react-native";
import { colors } from "../../config/colors";
import Octicons from "react-native-vector-icons/Octicons";
import { useNavigation } from "@react-navigation/core";
import { useRealtimeFire } from "../../hooks/useRealtimeFire";

export default WordScreen = ({ route }) => {
  const navigation = useNavigation();
  const onPress = () => {
    navigation.goBack();
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={{ marginTop: 30 }}>
        <View style={styles.header}>
          <Octicons
            name="chevron-left"
            size={28}
            onPress={onPress}
            style={styles.icon}
          />
          <View>
            <Text style={styles.headerText}>{route?.params.word}</Text>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },

  header: {
    width: "100%",
    height: 50,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    backgroundColor: colors.primary,
  },
  headerText: {
    marginLeft: 50,
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
