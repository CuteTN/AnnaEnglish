import React, { useEffect, useState } from "react";
import { SafeAreaView, View, Text, Alert } from "react-native";
import { styles } from "./styles";
import Icon from "react-native-vector-icons/FontAwesome";
import { useNavigation } from "@react-navigation/native";
import { SCREENS } from "..";
import Game from "../../components/games/";
import Header from "../../components/Header/Header";
import GameProgress from "../../components/progressSteps/GameProgress/GameProgress";

export default GameScreen = ({ route }) => {
  const { game } = route?.params ?? {};
  const [progress, setProgress] = useState({ currentStep: 0, countSteps: 0 });
  const navigation = useNavigation();

  useEffect(() => {
    if (!game) {
      navigation.goBack();
    }
  }, []);

  const handleQuitButtonPress = () => {
    navigation.goBack();
  };

  const handleStepChange = (currentStep, countSteps) => {
    setProgress({ currentStep, countSteps })
  }

  const handleCompleteGame = () => {
    console.info("Thy cute wins");
    navigation.goBack();
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
      <View style={[styles.container, { margin: 5 }]}>
        <Game
          gameData={game}
          onComplete={handleCompleteGame}
          onStepChange={handleStepChange}
        />
      </View>

      {/* progress steps from here */}
      <View style={[styles.footer, { backgroundColor: "white" }]}>
        {progress.countSteps ?
          <GameProgress countSteps={progress.countSteps} currentStep={progress.currentStep} />
          :
          <View></View>
        }
      </View >
    </SafeAreaView>
  );
};
