import Fire from "./firebase/Fire";
import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import TestFirebaseLoaded from "./_testFrame/TestFrame01";
import { dbSetUp } from "./firebase/DbSetUp";
import { reduxStore } from "./redux/store";

// ignore warnings
import { LogBox } from "react-native";
import { Provider } from "react-redux";
// navigation
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import StartUpScreen from "./Screens/StartUpScreen/StartUpScreen";
import { SCREENS } from "./Screens";
import { CompleteModalProvider } from "./components/games/CompleteModal/CompleteModalProvider";
import { CheckModalProvider } from "./components/games/CheckModal/CheckModalProvider";
import AppLoading from "expo-app-loading";
import * as Font from "expo-font";
import { ButtonsModalProvider } from "./components/Modal/ButtonsModalProvider";

LogBox.ignoreLogs(["Warning: ..."]); // Ignore log notification by message
LogBox.ignoreAllLogs(); //Ignore all log notifications

Fire.init();
dbSetUp();

// Navigation
const Stack = createStackNavigator();

const fetchFonts = () => {
  return Font.loadAsync({
    Pony: require("./assets/fonts/Pony.ttf"),
    Cucho: require("./assets/fonts/Cucho.ttf"),
  });
};

export default function App() {
  const [load, setLoaing] = useState(false);

  if (!load) {
    return (
      <AppLoading
        startAsync={fetchFonts}
        onFinish={() => {
          setLoaing(true);
        }}
        onError={console.warn}
      ></AppLoading>
    );
  }

  return (
    <Provider store={reduxStore}>
      <View style={styles.container}>
        <CompleteModalProvider>
          <CheckModalProvider>
            <ButtonsModalProvider>
              <NavigationContainer>
                <Stack.Navigator
                  initialRouteName={SCREENS.startUp}
                  headerMode="none"
                >
                  {Object.values(SCREENS).map((scr) => (
                    <Stack.Screen name={scr.name} component={scr.screen} />
                  ))}
                </Stack.Navigator>
              </NavigationContainer>
            </ButtonsModalProvider>
          </CheckModalProvider>
        </CompleteModalProvider>
      </View>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    // alignItems: 'center',
    // justifyContent: 'space-around'
  },
});
