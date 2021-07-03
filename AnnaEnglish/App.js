import Fire from "./firebase/Fire";
import { StatusBar } from "expo-status-bar";
import React from "react";
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

LogBox.ignoreLogs(["Warning: ..."]); // Ignore log notification by message
LogBox.ignoreAllLogs(); //Ignore all log notifications

Fire.init();
dbSetUp();

// Navigation
const Stack = createStackNavigator();

export default function App() {
  return (
    <Provider store={reduxStore}>
      <View style={styles.container}>
        <CompleteModalProvider>
          <NavigationContainer>
            <Stack.Navigator initialRouteName={SCREENS.startUp} headerMode="none">
              {Object.values(SCREENS).map(scr => <Stack.Screen name={scr.name} component={scr.screen} />)}
            </Stack.Navigator>
          </NavigationContainer>
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
