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

export default TopicScreen = ({ route }) => {
  const topicId = React.useMemo(
    () => route?.params?.topicId,
    [route?.params?.topicId]
  );
  const [topic] = useRealtimeFire("topic", route?.params?.topicId);
  const [games, setGames] = useState([]);

  const navigation = useNavigation();

  const { user, username } = useSignedIn();

  useEffect(() => {
    if (topic?.games) {
      const tempGames = [];

      Object.values(topic?.games)?.forEach((gameId) => {
        Fire.get(`game/${gameId}`).then((game) => {
          tempGames.push({ ...game, _id: gameId });
          if (tempGames.length === Object.values(topic?.games)?.length)
            setGames(tempGames);
        });
      });
    }
  }, [topic]);

  /** @type {React.MutableRefObject<[string]>} */
  const completedGamesInTopic = useRef(null);
  /** @type {React.MutableRefObject<[string]>} */
  const completedGamesInTopicToday = useRef(null);

  useEffect(() => {
    // the data is loaded already
    if (completedGamesInTopic.current || completedGamesInTopicToday.current)
      return;

    const userProgressOnTopic = user?.progress?.topics?.[topicId];

    // user progress is not yet loaded
    if (!userProgressOnTopic) return;

    const completedGames = Object.entries(
      userProgressOnTopic.completedGames ?? {}
    );
    completedGamesInTopic.current = completedGames.map((g) => g[0]);
    completedGamesInTopicToday.current = completedGames
      .filter((g) => isToday(new Date(g[1]?.lastCompleteAt)))
      .map((g) => g[0]);
  }, [user?.progress?.topics?.[topicId]]);

  const checkCompletedGame = (topicId, gameId) => {
    return user?.progress?.topics?.[topicId]?.completedGames?.[gameId];
  };

  /** @param {"first"|"today"} rewardType*/
  const rewardUserCompleteProgress = (rewardType) => {
    const now = Date.now();
    const data = { lastCompleteAt: now };

    // if the user haven't beat this game before
    if (rewardType === "first") data.firstCompleteAt = now;

    Fire.update(`user/${username}/progress/topics/${topicId}/`, data);
  };

  /** @param {"first"|"today"} rewardType*/
  const rewardUserCompleteStats = (rewardType) => {
    if (!topic) return;

    let rewardedCoins = 0;
    let rewardedExp = 0;

    // if the user haven't beat this game before
    if (rewardType === "first") {
      rewardedCoins += topic?.reward?.coins ?? 0;
      rewardedExp += topic?.reward?.exp ?? 0;
    } else if (rewardType === "today") {
      rewardedCoins += 50;
      rewardedExp += 10;
    }

    // Fire.update(`user/${username}/stats`, { coins: userStats.coins, exp: userStats.exp });
    Fire.transaction(`user/${username}/stats/`, (prev) => {
      const result = { ...prev };
      result.coins = (prev?.coins ?? 0) + rewardedCoins;
      result.exp = (prev?.exp ?? 0) + rewardedExp;

      return result;
    });
  };

  /** @param {"first"|"today"} rewardType*/
  const handleTopicComplete = (rewardType) => {
    rewardUserCompleteProgress(rewardType);
    rewardUserCompleteStats(rewardType);
  };

  const handleGameComplete = (gameId) => {
    let flagFirstCompleted = false;

    if (!completedGamesInTopic.current.includes(gameId)) {
      completedGamesInTopic.current.push(gameId);

      // just completed
      if (games.length === completedGamesInTopic.current.length) {
        handleTopicComplete("first");
        flagFirstCompleted = true;
      }
    }

    if (!completedGamesInTopicToday.current.includes(gameId)) {
      completedGamesInTopicToday.current.push(gameId);

      // just completed today, and not the first time ever
      if (
        games.length === completedGamesInTopicToday.current.length &&
        !flagFirstCompleted
      ) {
        handleTopicComplete("today");
      }
    }
  };

  const handleEnterGame = (game) => {
    navigation.navigate(SCREENS.game.name, {
      game,
      topicId,
      onGameComplete: handleGameComplete,
    });
  };

  const Card = ({ game }) => {
    return (
      <TouchableOpacity
        style={{ flex: 1 }}
        onPress={() => handleEnterGame(game)}
      >
        <View
          style={[
            styles.card,
            {
              backgroundColor: checkCompletedGame(topicId, game._id)
                ? colors.pastelGreen
                : colors.game,
              marginBottom: 5,
              margin: 5,
            },
          ]}
        >
          <View style={{ flexDirection: "row" }}>
            <Image
              source={{ uri: "https://imgur.com/AmvJzIu.png" }}
              style={{ width: 70, height: 60 }}
            ></Image>
            <Text style={[styles.label, { color: "black" }]}>{game?.name}</Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={{ marginTop: 30 }}>
        <Header title={topic?.name} />
      </View>

      <ScrollView contentContainerStyle={styles.scrollViewWrapper}>
        <FlatList
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            paddingBottom: 40,
          }}
          data={games}
          renderItem={({ item }) => {
            return Card({ game: item });
          }}
        />
      </ScrollView>
    </SafeAreaView>
  );
};
