import React, { useEffect, useState, useRef } from "react";
import { SafeAreaView, View, Text, Alert } from "react-native";
import { styles } from "./styles";
import Icon from "react-native-vector-icons/FontAwesome";
import { useNavigation } from "@react-navigation/native";
import { SCREENS } from "..";
import Game from "../../components/games/";
import Header from "../../components/Header/Header";
import GameProgress from "../../components/progressSteps/GameProgress/GameProgress";
import CompleteModal from "../../components/games/CompleteModal/CompleteModal";
import { useCompleteModal } from "../../components/games/CompleteModal/CompleteModalProvider";
import { useCheckModal } from "../../components/games/CheckModal/CheckModalProvider"
import { useSignedIn } from "../../hooks/useSignedIn";
import Fire from "../../firebase/Fire";
import { useRealtimeFire } from "../../hooks/useRealtimeFire";

export default GameScreen = ({ route }) => {
  const { game } = route?.params ?? {};
  const [progress, setProgress] = useState({ currentStep: 0, countSteps: 0 });
  const navigation = useNavigation();
  const { showCompleteModal } = useCompleteModal();
  const { showCheckModal } = useCheckModal();

  const { user, username } = useSignedIn();

  const topicId = React.useMemo(() => route?.params?.topicId, [route?.params?.topicId]);
  const [topic] = useRealtimeFire("topic", route?.params?.topicId);

  const onGameComplete = React.useMemo(() => route?.params?.onGameComplete, [route?.params?.onGameCompleted]);

  const userProgressOnGame = React.useMemo(() => {
    return user?.progress?.topics?.[topicId]?.completedGames?.[game?._id];
  }, [topicId, game?._id, user?.progress])

  useEffect(() => {
    if (!game) {
      navigation.goBack();
    }
  }, []);

  const handleQuitButtonPress = () => {
    navigation.goBack();
  };

  const handleStepChange = (currentStep, countSteps) => {
    setProgress({ currentStep, countSteps });
  };


  const rewardUserCompleteProgress = () => {
    const now = Date.now();
    const data = { lastCompleteAt: now, }

    // if the user haven't beat this game before
    if (!userProgressOnGame)
      data.firstCompleteAt = now;

    Fire.update(`user/${username}/progress/topics/${topicId}/completedGames/${game._id}`, data);
  }

  const rewardUserCompleteStats = () => {
    if (!topic)
      return;

    let rewardedCoins = 0;

    // if the user haven't beat this game before
    if (!userProgressOnGame) {
      rewardedCoins += 10; // yeah this is magic, I promise it'll be cleaner if I have time
    }

    // Fire.update(`user/${username}/stats`, { coins: userStats.coins, exp: userStats.exp });
    Fire.transaction(`user/${username}/stats/`,
      prev => {
        const result = { ...prev };
        result.coins = (prev?.coins ?? 0) + rewardedCoins;

        return result;
      }
    )
  }

  const handleCompleteGame = () => {
    rewardUserCompleteProgress();
    rewardUserCompleteStats();

    showCompleteModal({
      onClose: () => {
        onGameComplete?.(game?._id);
        navigation.goBack();
      },
    })
  };

  const handleCorrectAnswer = () => {
    showCheckModal({
      isCorrect: true,
    })
  }

  const handleIncorrectAnswer = () => {
    showCheckModal({
      isCorrect: false,
    })
  }

  return (
    <SafeAreaView
      style={{
        ...styles.container,
        justifyContent: "flex-start",
      }}
    >
      <View style={{ marginTop: 30 }}>
        <Header title={game?.name} />
      </View>
      {/* <View style={[styles.header, { backgroundColor: "lightpink" }]}>
        <Icon
          name="close"
          size={50}
          color="hotpink"
          style={styles.quitIcon}
          onPress={handleQuitButtonPress}
        />
        <Text style={[styles.gameNameText]}>{game.name}</Text>
      </View> */}

      {/* game component goes from here */}
      <View style={[styles.container]}>
        <Game
          gameData={game}
          onComplete={handleCompleteGame}
          onCorrect={handleCorrectAnswer}
          onIncorrect={handleIncorrectAnswer}
          onStepChange={handleStepChange}
        />
      </View>

      {/* progress steps from here */}
      <View style={[styles.footer, { backgroundColor: "white" }]}>
        {progress.countSteps ? (
          <GameProgress
            countSteps={progress.countSteps}
            currentStep={progress.currentStep}
          />
        ) : (
          <View></View>
        )}
      </View>
    </SafeAreaView>
  );
};
