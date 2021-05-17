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
import Tabbar from "./Screens/TabNavigation/Tabbar";
import SignInScreen from "./Screens/SignInScreen/SignInScreen";
import SignUpScreen from "./Screens/SignUpScreen/SignUpScreen";

// navigation
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from '@react-navigation/stack';

LogBox.ignoreLogs(["Warning: ..."]); // Ignore log notification by message
LogBox.ignoreAllLogs(); //Ignore all log notifications

dbSetUp();

// Navigation
const Stack = createStackNavigator();

export default function App() {
  return (
    <Provider store={reduxStore}>
      <View style={styles.container}>
        <NavigationContainer>
          <Stack.Navigator initialRouteName="SignIn" headerMode="none">
            <Stack.Screen name="SignIn" component={SignInScreen} />
            <Stack.Screen name="SignUp" component={SignUpScreen} />
            <Stack.Screen name="MainApp" component={Tabbar} />
          </Stack.Navigator>
        </NavigationContainer>

        {/* <TestFirebaseLoaded/> */}
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
