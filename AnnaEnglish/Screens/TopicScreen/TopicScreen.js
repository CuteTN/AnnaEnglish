import React from "react";
import { View, SafeAreaView, Image, Text, StyleSheet, TouchableOpacity } from "react-native";
import { colors } from "../../config/colors";
import { useRealtimeFire } from "../../hooks/useRealtimeFire";

export default TopicScreen = ({ route }) => {
  const [topic,] = useRealtimeFire("topic", route?.params?.topicId)



  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: colors.white,
      }}
    >
      <TouchableOpacity style={{ marginTop: 50 }}>
        <Text
          style={{
            flex: 1,
          }}
        >
          To game
        </Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const style = StyleSheet.create({});
