import React from "react";
import { View, SafeAreaView, Image, Text, StyleSheet } from "react-native";
import { colors } from "../../config/colors";
import { useRealtimeFire } from "../../hooks/useRealtimeFire";

export default CourseScreen = ({ route }) => {
  const [topic,] = useRealtimeFire("topic", route?.params?.topicId)

  console.log("current topic:", topic);

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: colors.white,
      }}
    >
      <Text>Thy</Text>
    </SafeAreaView>
  );
};

const style = StyleSheet.create({});
