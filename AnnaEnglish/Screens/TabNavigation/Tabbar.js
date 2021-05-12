import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import React from "react";
import { Text, View } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import styles from "./styles";

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
      <Text>Home!</Text>
    </View>
  );
}

function PlayScreen() {
  return (
    <View style={styles.tabbar}>
      <Text>Hodsdsdsfgg!</Text>
    </View>
  );
}
function DictionaryScreen() {
  return (
    <View style={styles.tabbar}>
      <Text>Hdsdsdsds</Text>
    </View>
  );
}
function ProfileScreen() {
  return (
    <View style={styles.tabbar}>
      <Text>Home!</Text>
    </View>
  );
}

const Tab = createBottomTabNavigator();

export default function Tabbar() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === "Profile") {
              iconName = focused
                ? "person-circle"
       :"person-circle-outline"
            } else if (route.name === "Play") {
              iconName = focused ? "game-controller" : "game-controller-outline";
            } 
            else if (route.name === "Statistics") {
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
    </NavigationContainer>
  );
}
