import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import React from "react";
import { Text, View } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import ProfileScreen from "../ProfileScreen/ProfileScreen";
import styles from "./styles";
// import StatisticsScreen from "../StatisticsScreen/StatisticsScreen"
// import LeaderboardScreen from "../LeaderboardScreen/LeaderboardScreen"
// import PlayScreen from "../PlayScreen/PlayScreen"
// import DictionaryScreen from "../DictionaryScreen/DictionaryScreen"

function StatisticsScreen() {
  return (
    <View style={styles.tabbar}>
      <Text>Statistics!</Text>
    </View>
  );
}

function LeaderboardScreen() {
  return (
    <View style={styles.tabbar}>
      <Text>Leaderboard!</Text>
    </View>
  );
}

function PlayScreen() {
  return (
    <View style={styles.tabbar}>
      <Text>Play!</Text>
    </View>
  );
}
function DictionaryScreen() {
  return (
    <View style={styles.tabbar}>
      <Text>Dictionary!</Text>
    </View>
  );
}

const Tab = createBottomTabNavigator();

export default function Tabbar() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === "Profile") {
            iconName = focused ? "person-circle" : "person-circle-outline";
          } else if (route.name === "Play") {
            iconName = focused ? "game-controller" : "game-controller-outline";
          } else if (route.name === "Statistics") {
            iconName = focused ? "game-controller" : "game-controller-outline";
          } else if (route.name === "Leaderboard") {
            iconName = focused ? "game-controller" : "game-controller-outline";
          } else if (route.name === "Dictionary") {
            iconName = focused ? "book" : "book-outline";
          }

          // You can return any component that you like here!
          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
      tabBarOptions={{
        activeTintColor: "tomato",
        inactiveTintColor: "gray",
      }}
    >
      <Tab.Screen name="Statistics" component={StatisticsScreen} />
      <Tab.Screen name="Leaderboard" component={LeaderboardScreen} />
      <Tab.Screen name="Play" component={PlayScreen} />
      <Tab.Screen name="Dictionary" component={DictionaryScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
}
