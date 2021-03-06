import React, { useEffect, useState } from "react";
import { SafeAreaView, View } from "react-native";
import { styles } from "./styles";
import { useNavigation } from "@react-navigation/native";
import Game from "../../components/games/";
import Header from "../../components/Header/Header";
import GameProgress from "../../components/progressSteps/GameProgress/GameProgress";
import { useCompleteModal } from "../../components/games/CompleteModal/CompleteModalProvider";
import { useCheckModal } from "../../components/games/CheckModal/CheckModalProvider";
import { useSignedIn } from "../../hooks/useSignedIn";
import Fire from "../../firebase/Fire";
import { useRealtimeFire } from "../../hooks/useRealtimeFire";
import { useButtonsModal } from "../../components/Modal/ButtonsModalProvider"

export default GameScreen = ({ route }) => {
  const { game, isReviewMode } = route?.params ?? {};
  const [progress, setProgress] = useState({ currentStep: 0, countSteps: 0 });
  const navigation = useNavigation();
  const { showCompleteModal } = useCompleteModal();
  const { showCheckModal } = useCheckModal();
  const { showOkModal } = useButtonsModal();

  const { user, username } = useSignedIn();

  const topicId = React.useMemo(
    () => route?.params?.topicId,
    [route?.params?.topicId]
  );
  const [topic] = useRealtimeFire("topic", route?.params?.topicId);

  const onGameComplete = React.useMemo(
    () => route?.params?.onGameComplete,
    [route?.params?.onGameCompleted]
  );

  const userProgressOnGame = React.useMemo(() => {
    return user?.progress?.topics?.[topicId]?.completedGames?.[game?._id];
  }, [topicId, game?._id, user?.progress]);

  const userProgressOnReview = React.useMemo(() => {
    return user?.progress?.topics?.[topicId]?.review;
  }, [topicId, user?.progress]);

  useEffect(() => {
    if (!game && !isReviewMode) {
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
    if (!topic) return;

    const now = Date.now();
    const data = { lastCompleteAt: now };

    if (isReviewMode) {
      Fire.transaction(
        `user/${username}/progress/topics/${topicId}/review`,
        (prev) => {
          const result = { ...prev, ...data };
          result.firstCompleteAt = result.firstCompleteAt ?? now;
          result.completedTimes = (prev?.completedTimes ?? 0) + 1;

          return result;
        }
      );
    } else {
      // if the user haven't beat this game before
      if (!userProgressOnGame) data.firstCompleteAt = now;

      Fire.update(
        `user/${username}/progress/topics/${topicId}/completedGames/${game._id}`,
        data
      );
    }
  };

  /**
   * @returns {{ isRewarded: boolean, label: string, message: string }}
   */
  const rewardUserCompleteStats = () => {
    if (!topic) return { isRewarded: false };

    const result = { isRewarded: false };

    let rewardedCoins = 0;

    if (isReviewMode) {
      const completedTimes = (userProgressOnReview?.completedTimes ?? 0) + 1;
      if (completedTimes <= 10) {
        rewardedCoins = completedTimes * 5;

        result.isRewarded = true;
        result.label = "Ph???n th?????ng";
        result.message = `B???n nh???n ???????c ${rewardedCoins} xu v?? ho??n th??nh ph???n ??n t???p l???n th??? ${completedTimes}.`

        if (completedTimes < 10)
          result.message += " H??y l??m l???i ????? nh???n ???????c nhi???u ti???n th?????ng h??n nh??!"
      }
    } else {
      // if the user haven't beat this game before
      if (!userProgressOnGame) {
        rewardedCoins += 10; // yeah this is magic, I promise it'll be cleaner if I have time

        result.isRewarded = true;
        result.label = "Ph???n th?????ng";
        result.message = `B???n nh???n ???????c ${rewardedCoins} xu v?? ho??n th??nh tr?? ch??i "${game?.name}".`
      }
    }

    // Fire.update(`user/${username}/stats`, { coins: userStats.coins, exp: userStats.exp });
    Fire.transaction(`user/${username}/stats/`, (prev) => {
      const result = { ...prev };
      result.coins = (prev?.coins ?? 0) + rewardedCoins;

      return result;
    });

    return result;
  };

  const handleCompleteGame = () => {
    rewardUserCompleteProgress();
    const rewardResult = rewardUserCompleteStats();

    showCompleteModal({
      onClose: () => {
        const handleOnCloseReward = () => {
          onGameComplete?.(game?._id);
          navigation.goBack();
        }

        if (rewardResult?.isRewarded) {
          showOkModal({
            label: rewardResult.label,
            text: rewardResult.message,
            onOk: handleOnCloseReward,
          })
        } else {
          handleOnCloseReward();
        }
      },
    });
  };

  const handleCorrectAnswer = () => {
    showCheckModal({
      isCorrect: true,
    });
  };

  const handleIncorrectAnswer = () => {
    showCheckModal({
      isCorrect: false,
    });
  };

  return (
    <SafeAreaView
      style={{
        ...styles.container,
        justifyContent: "flex-start",
      }}
    >
      <View style={{ marginTop: 30 }}>
        <Header title={isReviewMode ? "??n t???p" : game?.name} showCoin={true} />
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
