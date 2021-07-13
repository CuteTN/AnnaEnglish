import React, { useMemo } from "react";
import {
  View,
  SafeAreaView,
  TouchableOpacity,
  Image,
  Text,
} from "react-native";
import { useRealtimeFire } from "../../hooks/useRealtimeFire";
import Header from "../../components/Header/Header";
import { styles } from "./styles";
import { useNavigation } from "@react-navigation/native";
import { SCREENS } from "..";
import { useSignedIn } from "../../hooks/useSignedIn";

export default TopicScreen = ({ route }) => {
  const topicId = React.useMemo(
    () => route?.params?.topicId,
    [route?.params?.topicId]
  );
  const [topic] = useRealtimeFire("topic", route?.params?.topicId);
  const navigation = useNavigation();

  const { user } = useSignedIn();

  const isTopicCompleted = useMemo(() => {
    return user?.progress?.topics?.[topicId]?.firstCompleteAt;
  }, [topicId, user?.progress?.topics])

  const navigateToTopicGameScreen = () =>
    navigation.navigate(SCREENS.topicGame.name, { topicId: topicId });

  const navigateToTopicWordScreen = () =>
    navigation.navigate(SCREENS.topicWord.name, { topicId: topicId });

  const navigateToReviewGameScreen = () => {
    // have to duplicate topicId here for reasons.
    navigation.navigate(SCREENS.game.name, {
      topicId,
      isReviewMode: true,
      game: { type: "match", topicId },
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={{ marginTop: 30 }}>
        <Header title={topic?.name} showCoin />
      </View>
      <TouchableOpacity onPress={navigateToTopicWordScreen}>
        <View style={[styles.card, { marginTop: 30 }]}>
          <View style={{ flexDirection: "row" }}>
            <Image
              source={{ uri: "https://imgur.com/3qfBver.png" }}
              style={{ height: 100, width: 100, marginTop: 5 }}
            ></Image>
            <Text style={[styles.label, { color: "black" }]}>TỪ VỰNG</Text>
          </View>
        </View>
      </TouchableOpacity>
      <TouchableOpacity onPress={navigateToTopicGameScreen}>
        <View style={[styles.card]}>
          <View style={{ flexDirection: "row" }}>
            <Image
              source={{ uri: "https://imgur.com/KMyVCmn.png" }}
              style={{ height: 100, width: 100, marginLeft: 5 }}
            ></Image>
            <Text style={[styles.label, { color: "black" }]}>THỬ THÁCH</Text>
          </View>
        </View>
      </TouchableOpacity>
      {isTopicCompleted &&
        <TouchableOpacity onPress={navigateToReviewGameScreen}>
          <View style={[styles.card]}>
            <View style={{ flexDirection: "row" }}>
              <Image
                source={{ uri: "https://imgur.com/N5Vs1gw.png" }}
                style={{ height: 115, width: 100, marginLeft: 10 }}
              ></Image>
              <Text style={[styles.label, { color: "black" }]}>ÔN TẬP</Text>
            </View>
          </View>
        </TouchableOpacity>
      }
    </SafeAreaView>
  );
};
