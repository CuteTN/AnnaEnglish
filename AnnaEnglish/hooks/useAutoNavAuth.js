import { useNavigation, useFocusEffect, useRoute } from "@react-navigation/core";
import { useEffect } from "react";
import { useSignedIn } from "./useSignedIn";
import { SCREENS } from '../Screens'

export const useAutoNavAuth = () => {
  const navigation = useNavigation();
  const { user, status } = useSignedIn();

  const navAuth = () => {
    let newRoute = null;

    if (status === "SignedIn")
      newRoute = SCREENS.mainApp.name;
    if (status === "NotSignedIn")
      newRoute = SCREENS.signIn.name;
    if (status === "NoInfo")
      newRoute = SCREENS.editProfile.name;

    if (newRoute && useRoute.name !== newRoute)
      navigation.navigate(newRoute);
  }

  useEffect(() => {
    navAuth();
  }, [status, user]);

  useFocusEffect(() => {
    navAuth();
  })
}