import React from "react";
import { View, SafeAreaView, Image, Text, StyleSheet } from "react-native";
import { Button } from "react-native-paper";
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
      <Text>Thy cute dang iu</Text>
      <Button>yo</Button>
    </SafeAreaView>
  );
};

const style = StyleSheet.create({});
