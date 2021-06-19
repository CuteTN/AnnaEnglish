import React, { useEffect } from "react";
import { View, Text, SafeAreaView } from "react-native";
import Fire from "../../firebase/Fire";
import { styles } from "../../shared/styles.js";
import { useAutoNavAuth } from "../../hooks/useAutoNavAuth";

function StartUpScreen() {
  useAutoNavAuth();

  return (
    <SafeAreaView
      style={{
        ...styles.fullContainer,
        ...styles.center,
      }}
    >
      <Text>Loading...</Text>
    </SafeAreaView>
  );
}

export default StartUpScreen;
