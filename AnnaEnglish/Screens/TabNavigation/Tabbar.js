import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import React from "react";
import Ionicons from "react-native-vector-icons/Ionicons";
import { SCREENS, TAB_SCREENS } from "..";
import { colors } from "../../config/colors";
import styles from "./styles";

const Tab = createBottomTabNavigator();

export default function Tabbar() {
  return (
    <Tab.Navigator
      initialRouteName={SCREENS.play.name}
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          Object.values(TAB_SCREENS).forEach((scr) => {
            if (route.name === scr.name) {
              iconName = focused ? scr.iconName : scr.focusIconName;
            }
          });

          // You can return any component that you like here!
          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
      tabBarOptions={{
        activeTintColor: colors.primary,
        inactiveTintColor: colors.primary,
      }}
    >
      {Object.values(TAB_SCREENS).map((scr) => (
        <Tab.Screen name={scr.name} component={scr.screen} options={{ title: scr.vieName }} />
      ))}
    </Tab.Navigator>
  );
}
