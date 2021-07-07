import React, { useEffect } from "react";
import {
  View,
  FlatList,
  Text,
  TouchableOpacity,
  Image,
  ImageBackground,
} from "react-native";
import { colors, randomColor } from "../../../config/colors";
// import { styles } from "../../../shared/styles";
import { styles } from "./styles";
import { PrimaryButton } from "../../buttons/PrimaryButton/PrimaryButton";
import { shuffle } from "../../../Utils/shuffle";
import { randomInt } from "../../../Utils/math";

const AnswerImage = ({ backgroundColor, onPress, imageUrl, isSelected }) => {
  const handlePress = () => {
    onPress?.();
  };

  return (
    <TouchableOpacity onPress={handlePress}>
      <View
        style={[
          styles.card,
          {
            backgroundColor: backgroundColor,
            justifyContent: "center",
            borderColor: "black",
          },
        ]}
      >
        <Image
          source={imageUrl}
          style={{
            height: 76,
            resizeMode: "center",
          }}
        ></Image>
      </View>
    </TouchableOpacity>
  );
};

const AnswerText = ({ label, backgroundColor, onPress, isSelected }) => {
  const handlePress = () => {
    onPress?.();
  };

  return (
    <TouchableOpacity onPress={handlePress}>
      <View
        style={[
          styles.card,
          {
            backgroundColor: backgroundColor,
            borderColor: "black",
          },
        ]}
      >
        <Text style={[styles.label]}>{label}</Text>
      </View>
    </TouchableOpacity>
  );
};

const GameMatch = ({ data, onComplete, onStepChange }) => {
  const tmp = ["Goodbye", " ", " ", " "];
  const imageUrl = {
    uri: "https://tiengtrunganhduong.com/Images/images/635766289191430000.jpg",
  };

  const questions = React.useRef(Object.values(data?.questions ?? {})).current;
  const countSteps = React.useRef(
    Object.values(data?.questions ?? {}).length
  ).current;
  const [currentStep, setCurrentStep] = React.useState(0);

  const [options, setOptions] = React.useState([]);
  React.useEffect(() => {
    if (currentStep < countSteps) {
      setOptions(shuffle(Object.values(questions[currentStep].options ?? {})));
    }

    onStepChange?.(currentStep, countSteps);
  }, [currentStep, countSteps]);

  const backgroundColor = React.useRef(randomColor()).current;
  const backgroundColorWords = React.useRef(randomColor()).current;
  const checkAnswer = () => { };

  const handleSubmitButtonPress = () => { };

  const handleCorrect = () => { };

  const handleWrong = () => { };

  const handleComplete = () => {
    onComplete?.();
  };

  return (
    <View style={styles.container}>
      <View style={styles.game}>
        <FlatList
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            marginBottom: 10,
            paddingRight: 20,
          }}
          data={options}
          renderItem={({ item }) => (
            <AnswerText
              label={item}
              backgroundColor={backgroundColor}
              onPress={() => { }}
            />
          )}
        />

        <FlatList
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            marginBottom: 10,
          }}
          data={tmp}
          renderItem={({ item }) => (
            <AnswerImage
              backgroundColor={backgroundColorWords}
              onPress={() => { }}
              imageUrl={imageUrl}
            />
          )}
        />
      </View>
      <View style={styles.getStartedbtnItemWrapper}>
        <PrimaryButton label={"KIỂM TRA"} onPress={handleSubmitButtonPress} />
      </View>
    </View>
  );
};

export default GameMatch;
