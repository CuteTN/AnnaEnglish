import React, { useEffect, useRef, useState } from "react";
import {
  View,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
  FlatList,
  Text,
} from "react-native";
import { colors } from "../../config/colors";
import { useRealtimeFire } from "../../hooks/useRealtimeFire";
import Header from "../../components/Header/Header";
import { styles } from "./styles";
import Fire from "../../firebase/Fire";
import { useNavigation } from "@react-navigation/native";
import { SCREENS } from "..";
import { Colors } from "react-native/Libraries/NewAppScreen";
import { useSignedIn } from "../../hooks/useSignedIn";
import { isToday } from "../../Utils/datetime";

export default TopicGameScreen = ({ route }) => {
  const topicId = React.useMemo(
    () => route?.params?.topicId,
    [route?.params?.topicId]
  );
  const [topic] = useRealtimeFire("topic", route?.params?.topicId);
  const navigation = useNavigation();

  const navigateToTopicScreen = () =>
    navigation.navigate(SCREENS.topic.name, { topicId: topicId });

  const navigateToTopicWordScreen = () =>
    navigation.navigate(SCREENS.topicWord.name, { topicId: topicId });

  return (
    <SafeAreaView style={styles.container}>
      <View style={{ marginTop: 30 }}>
        <Header title={topic?.name} />
      </View>
      <TouchableOpacity onPress={navigateToTopicWordScreen}>
        <View style={[styles.card, { marginTop: 30 }]}>
          <View style={{ flexDirection: "row" }}>
            <Image
              source={{ uri: "https://imgur.com/3qfBver.png" }}
              style={{ height: 100, width: 100 }}
            ></Image>
            <Text style={[styles.label, { color: "black" }]}>TỪ VỰNG</Text>
          </View>
        </View>
      </TouchableOpacity>
      <TouchableOpacity onPress={navigateToTopicScreen}>
        <View style={[styles.card]}>
          <View style={{ flexDirection: "row" }}>
            <Image
              source={{ uri: "https://imgur.com/KMyVCmn.png" }}
              style={{ height: 100, width: 100 }}
            ></Image>
            <Text style={[styles.label, { color: "black" }]}>THỬ THÁCH</Text>
          </View>
        </View>
      </TouchableOpacity>
    </SafeAreaView>
  );
};
