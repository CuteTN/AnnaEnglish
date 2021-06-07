import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import React from "react";
import Ionicons from "react-native-vector-icons/Ionicons";
import { TAB_SCREENS } from "..";
import { useAutoNavAuth } from "../../hooks/useAutoNavAuth";
import styles from "./styles";

const Tab = createBottomTabNavigator();

export default function Tabbar() {
  useAutoNavAuth();

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          Object.values(TAB_SCREENS).forEach(scr => {
            if (route.name === scr.name) {
              iconName = focused ? scr.iconName : scr.focusIconName;
            }
          })

          // You can return any component that you like here!
          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
      tabBarOptions={{
        activeTintColor: "tomato",
        inactiveTintColor: "gray",
      }}
    >
      {Object.values(TAB_SCREENS).map(scr => <Tab.Screen name={scr.name} component={scr.screen} />)}
    </Tab.Navigator>
  );
}
