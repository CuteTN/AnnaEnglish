import React from "react";
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
import { useYesNoModal } from "../../components/Modal/YesNoModalProvider";

function PlayScreen() {
  const rawTopics = useFiredux("topic") ?? {};
  const listTopics = React.useMemo(() =>
    Object.entries(rawTopics).map((entry) => ({
      _id: entry[0],
      ...entry[1],
    }))
  );

  const navigation = useNavigation();
  const { user, username } = useSignedIn();

  const { showYesNoModal } = useYesNoModal();

  /**
   * @returns {boolean} unlockable
   */
  const unlockTopic = (topic) => {
    if (!username) return false;

    if (!topic?._id) return false;

    if (checkIsUnlockedTopic(topic)) return false;

    const userCoins = user?.stats?.coins ?? 0;
    const userExp = user?.stats?.exp ?? 0;

    const requiredCoins = topic?.require?.coins ?? 0;
    const requiredExp = topic?.require?.exp ?? 0;

    if (userCoins >= requiredCoins && userExp >= requiredExp) {
      Fire.update(`user/${username}/progress/topics/${topic._id}`, {
        unlocked: true,
      });
      Fire.transaction(`user/${username}/progress/vocabulary/`, (prev) => {
        const topicVoc = Object.values(topic.vocabulary ?? {});
        const prevVoc = Object.values(prev ?? {});
        const newVoc = [...new Set([...topicVoc, ...prevVoc])];

        return newVoc;
      });
      Fire.transaction(
        `user/${username}/stats/coins`,
        (prev) => prev - requiredCoins
      );

      return true;
    } else {
      console.log("not enough coins or exp to unlock topic :(");

      return false;
    }
  };

  const checkIsDefaultTopic = (topic) => {
    return !(topic?.require?.coins || topic?.require?.exp);
  };

  const checkIsUnlockedTopic = (topic) => {
    return Object.keys(user?.progress?.topics ?? {}).includes(topic._id);
  };

  // auto unlock default topics
  React.useEffect(() => {
    for (let topic of listTopics) {
      if (!checkIsUnlockedTopic(topic) && checkIsDefaultTopic(topic)) {
        unlockTopic(topic);
      }
    }
  }, [user?.progress?.topics, listTopics]);

  const handleSelectTopic = (topic) => {
    const unlocked = checkIsUnlockedTopic(topic);

    const navigateToTopicScreen = () =>
      navigation.navigate(SCREENS.topic.name, { topicId: topic._id });

    if (!unlocked) {
      showYesNoModal({
        label: "Mở chủ đề",
        onClose: (decision) => {
          if (decision === "no") return;
          else {
            const justUnlocked = unlockTopic(topic);
            if (justUnlocked) navigateToTopicScreen();
          }
        },
      });
    } else {
      navigateToTopicScreen();
    }
  };

  const Card = ({ topic }) => {
    const unlocked = checkIsUnlockedTopic(topic);

    return (
      <TouchableOpacity
        style={[{ flex: 1 }]}
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
              borderWidth: 1,
              padding: 0,
            },
          ]}
        >
          <View style={[styles.card, { maxHeight: 190 }]}>
            <Image
              key={unlocked}
              style={[
                styles.topicImage,
                unlocked ? {} : { tintColor: colors.gray },
              ]}
              source={{ uri: topic.image }}
            />
            {!unlocked && (
              <Image
                source={require("../../assets/images/question-mark.png")}
                style={[styles.questionImage]}
              />
            )}
            <View style={styles.row}>
              <Text style={[styles.label, { color: colors.black }]}>
                {topic.name}
              </Text>
              <View
                style={{
                  alignContent: "flex-end",
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                {!checkIsUnlockedTopic(topic) && (
                  <Text
                    style={{
                      fontSize: 22,
                      justifyContent: "flex-end",
                      marginBottom: 0,
                      marginRight: 1,
                      fontFamily: "Cucho",
                      color: colors.black,
                    }}
                  >
                    {topic?.require?.coins}
                  </Text>
                )}
                {!checkIsUnlockedTopic(topic) && (
                  <Image
                    source={{ uri: "https://imgur.com/B2sbpi2.png" }}
                    style={{
                      width: 24,
                      resizeMode: "center",
                      marginBottom: 0,
                    }}
                  />
                )}
              </View>
            </View>
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
          contentContainerStyle={{}}
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
