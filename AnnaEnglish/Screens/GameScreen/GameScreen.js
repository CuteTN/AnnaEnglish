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

export default GameScreen = ({ route }) => {
  const { game } = route?.params ?? {};
  const [progress, setProgress] = useState({ currentStep: 0, countSteps: 0 });
  const navigation = useNavigation();
  const setVisible = useRef();

  useEffect(() => {
    if (!game) {
      navigation.goBack();
    }
    setVisible.current(false);
  }, []);

  const handleQuitButtonPress = () => {
    navigation.goBack();
  };

  const handleStepChange = (currentStep, countSteps) => {
    setProgress({ currentStep, countSteps });
  };

  const handleCompleteGame = () => {
    setVisible.current(true);
    // Thyyyy: xử lý cái goback, với lại bỏ hộ cái correct modal đúng của câu cuối cùng nha.
    // navigation.goBack();
  };

  return (
    <SafeAreaView
      style={{
        ...styles.container,
        justifyContent: "flex-start",
      }}
    >
      <CompleteModal
        getVisible={(visible, setVisible_) =>
          (setVisible.current = setVisible_)
        }
      />
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
