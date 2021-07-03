import React, { useEffect } from "react";
import { View, Text, SafeAreaView } from "react-native";
import Fire from "../../firebase/Fire";
import { styles } from "../../shared/styles.js";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useSignedIn } from "../../hooks/useSignedIn";
import { SCREENS } from "..";

export default function StartUpScreen() {
  const navigation = useNavigation();
  const { user, status } = useSignedIn();

  const navAuth = () => {
    let newRoute = null;

    if (status === "SignedIn")
      newRoute = SCREENS.mainApp.name;
    if (status === "NotSignedIn")
      newRoute = SCREENS.signIn.name;
    if (status === "NoInfo") {
      Fire.signOut();
      // newRoute = SCREENS.editProfile.name;
    }

    if (newRoute && useRoute.name !== newRoute)
      navigation.replace(newRoute);
  }

  useEffect(() => {
    navAuth();
  }, [status, user]);

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
