import React, { useEffect } from "react";
import {
  Text,
  View,
  Image,
  ScrollView,
  TouchableOpacity,
  FlatList,
} from "react-native";
import { useFiredux } from "../../hooks/useFiredux";
import { styles } from "./styles";
import { SCREENS } from "..";
import { useNavigation } from "@react-navigation/core";
import { isBrightColor } from "../../Utils/color";
import { colors } from "../../config/colors";
import { useSignedIn } from "../../hooks/useSignedIn";
import Fire from "../../firebase/Fire";

function PlayScreen() {
  const listTopics = Object.entries(useFiredux("topic") ?? {}).map((entry) => ({
    _id: entry[0],
    ...entry[1],
  }));
  const navigation = useNavigation();
  const { user, username } = useSignedIn();

  /**
   * @returns {boolean} unlockable
   */
  const unlockTopic = (topic) => {
    if (!topic?._id)
      return false;

    const userCoins = user?.stats?.coins ?? 0;
    const userExp = user?.stats?.exp ?? 0;

    const requiredCoins = topic?.require?.coins ?? 0;
    const requiredExp = topic?.require?.exp ?? 0;

    if (userCoins >= requiredCoins && userExp >= requiredExp) {
      Fire.update(`user/${username}/progress/topics/${topic._id}`, { unlocked: true });
      Fire.transaction(`user/${username}/stats/coins`, prev => prev - requiredCoins);

      return true;
    } else {
      console.log("not enough coins or exp to unlock topic :(");

      return false;
    }
  }

  const checkIsUnlockedTopic = (topic) => {
    const isDefaultTopic = !(topic?.require?.coins || topic?.require?.exp);
    if (isDefaultTopic)
      unlockTopic(topic);

    return Object.keys(user?.progress?.topics ?? {}).includes(topic._id) || isDefaultTopic;
  }

  const handleSelectTopic = (topic) => {
    const unlocked = checkIsUnlockedTopic(topic);

    const navigateToTopicScreen = () =>
      navigation.navigate(SCREENS.topic.name, { topicId: topic._id });

    if (!unlocked) {
      if (unlockTopic(topic))
        navigateToTopicScreen();
    } else {
      navigateToTopicScreen();
    }
  }

  const Card = ({ topic }) => {
    const unlocked = checkIsUnlockedTopic(topic);

    return (
      <TouchableOpacity
        style={[
          { flex: 1 },
        ]}
        onPress={() => {
          handleSelectTopic(topic);
        }}
      >
        <View
          style={[
            styles.card,
            {
              backgroundColor: unlocked ? topic.backgroundColor : "#d3d3d3",
              marginBottom: 5,
              margin: 5,
              padding: 0,
            },
          ]}
        >
          <View
            style={[
              styles.card,
              { maxHeight: 190, }
            ]}
          >
            <Image
              key={unlocked}
              style={[
                styles.topicImage,
                unlocked ? {} : { tintColor: colors.gray }
              ]}
              source={require("../../assets/topics/Animal.png")}
            />
            {(!unlocked) &&
              <Image
                source={require("../../assets/images/question-mark.png")}
                style={[
                  styles.questionImage,
                ]}
              />
            }
            <Text style={[styles.label, { color: colors.black }]}>
              {topic.name}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <Image
        style={styles.bgImage}
        source={require("../../assets/images/bg2.png")}
      />
      <View style={styles.headingWrapper}>
        <Text style={styles.heading}>Let's learn.</Text>
        {/* <Text style={styles.subHeading}>to Silent Moon</Text> */}
        <Text style={styles.title}>Choose a topic to focuse on:</Text>
      </View>
      <ScrollView contentContainerStyle={styles.scrollViewWrapper}>
        <FlatList
          columnWrapperStyle={{ justifyContent: "space-between" }}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            marginTop: 10,
            paddingBottom: 40,
          }}
          numColumns={2}
          data={listTopics}
          renderItem={({ item }) => {
            return Card({ topic: item });
          }}
        />
      </ScrollView>
    </View>
  );
}

export default PlayScreen;
