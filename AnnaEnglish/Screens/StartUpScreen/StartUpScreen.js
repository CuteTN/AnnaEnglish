import React, { useEffect } from "react";
import { View, Text, SafeAreaView } from "react-native";
import Fire from "../../firebase/Fire";
import { styleCenter, styleFullContainer } from "../../shared/styles.js";
import { useAutoNavAuth } from "../../hooks/useAutoNavAuth";

function StartUpScreen() {
  useAutoNavAuth();

  return (
    <SafeAreaView
      style={{
        ...styleFullContainer,
        ...styleCenter,
      }}
    >
      <Text>Loading...</Text>
    </SafeAreaView>
  );
}

export default StartUpScreen;
