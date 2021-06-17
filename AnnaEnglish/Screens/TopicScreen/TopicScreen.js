import React from "react";
import { useNavigation } from "@react-navigation/native";
import { View, SafeAreaView, Image, Text, StyleSheet, TouchableOpacity } from "react-native";
import { colors } from "../../config/colors";
import { useRealtimeFire } from "../../hooks/useRealtimeFire";
import { SCREENS } from '../'

export default TopicScreen = ({ route }) => {
  const [topic,] = useRealtimeFire("topic", route?.params?.topicId)
  const navigation = useNavigation();

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: colors.white,
      }}
    >
      <TouchableOpacity
        style={{ marginTop: 50, height: 50, backgroundColor: "hotpink" }}
        onPress={() => navigation.navigate(SCREENS.game.name, { game: { type: "one", name: "test game" } })} // for testing only
      >
        <Text
          style={{
            flex: 1,
          }}
        >
          To game
        </Text>
      </TouchableOpacity>
    </SafeAreaView >
  );
};

const style = StyleSheet.create({});
