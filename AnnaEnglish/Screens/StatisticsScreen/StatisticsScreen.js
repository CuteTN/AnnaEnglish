import React from "react";
import { useSignedIn } from "../../hooks/useSignedIn";
import { View, SafeAreaView, Text, ScrollView } from "react-native";
import StatiticCard from "../../components/card/StatiticCard/StatiticCard";
import { getUserStats } from "../../Utils/user";
import { styles } from "./styles";
function StatisticsScreen() {
  const { user } = useSignedIn();

  const imageTopicUrl = { uri: "https://imgur.com/2zS3bVD.png" };
  const imageExpUrl = { uri: "https://imgur.com/mKlEyuC.png" };
  const imageGameUrl = { uri: "https://imgur.com/D0kVXnR.png" };
  const imageCoinUrl = { uri: "https://imgur.com/ye4ucg0.png" };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headingWrapper}>
        <Text style={styles.heading}>Thống kê</Text>
      </View>
      <ScrollView>
        <View style={styles.card}>
          <StatiticCard
            imageUrl={imageTopicUrl}
            title={"Chủ đề đã học"}
            number={getUserStats("topics", user)}
          ></StatiticCard>
        </View>
        <View style={styles.card}>
          <StatiticCard
            imageUrl={imageGameUrl}
            title={"Trò đã chơi"}
            number={getUserStats("games", user)}
          ></StatiticCard>
        </View>
        <View style={styles.card}>
          <StatiticCard
            imageUrl={imageExpUrl}
            title={"Điểm kinh nghiệm"}
            number={getUserStats("exp", user)}
          ></StatiticCard>
        </View>
        <View style={styles.card}>
          <StatiticCard
            imageUrl={imageCoinUrl}
            title={"Tiền tiết kiệm"}
            number={getUserStats("coins", user)}
          ></StatiticCard>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

export default StatisticsScreen;
