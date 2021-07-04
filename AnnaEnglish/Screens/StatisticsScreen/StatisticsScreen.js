import { useNavigation } from "@react-navigation/core";
import React, { useState } from "react";
import { useSignedIn } from "../../hooks/useSignedIn";
import { View, SafeAreaView, StyleSheet, Text } from "react-native";
import AvatarCard from "../../components/card/AvatarCard/AvatarCard";
import StatiticCard from "../../components/card/StatiticCard/StatiticCard";
import { colors } from "../../config/colors";

function StatisticsScreen() {
  const navigation = useNavigation();
  const { user } = useSignedIn();

  const imageTopicUrl = { uri: "https://imgur.com/2zS3bVD.png" };
  const imageExpUrl = { uri: "https://imgur.com/mKlEyuC.png" };
  const imageGameUrl = { uri: "https://imgur.com/D0kVXnR.png" };
  const titleTopic = "Chủ đề đã học";
  const numbertopic = "40";

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headingWrapper}>
        <Text style={styles.heading}>Thống kê</Text>
      </View>
      <View style={styles.card}>
        <StatiticCard
          imageUrl={imageTopicUrl}
          title={titleTopic}
          number={numbertopic}
        ></StatiticCard>
      </View>
      <View style={styles.card}>
        <StatiticCard
          imageUrl={imageExpUrl}
          title={titleTopic}
          number={numbertopic}
        ></StatiticCard>
      </View>
      <View style={styles.card}>
        <StatiticCard
          imageUrl={imageGameUrl}
          title={titleTopic}
          number={numbertopic}
        ></StatiticCard>
      </View>
    </SafeAreaView>
  );
}

export default StatisticsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  card: {
    margin: 20,
    marginBottom: 10,
    backgroundColor: colors.statiticcard,
    borderRadius: 15,
    borderWidth: 2,
    borderColor: colors.cardborder,
    elevation: 5,
    position: "relative",
  },
  headingWrapper: {
    marginTop: 45,
    alignItems: "center",
  },
  heading: {
    fontSize: 28,
    color: colors.heading,
    fontFamily: "Pony",
  },
});
