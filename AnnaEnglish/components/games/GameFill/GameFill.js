import React from "react";
import { View, FlatList, Text, TouchableOpacity } from "react-native";
import { colors } from "../../../config/colors";
// import { styles } from "../../../shared/styles";
import { styles } from "./styles";
import { PrimaryButton } from "../../buttons/PrimaryButton/PrimaryButton";
import { shuffle } from "../../../Utils/shuffle";
import { TextInput } from "react-native-paper";

const Card = ({ label, onPress, isSelected }) => {
  return (
    <TouchableOpacity
      style={{ flex: 1, borderRadius: 15 }}
      onPress={onPress}
    >
      <View
        style={[
          styles.card,
          {
            backgroundColor: isSelected ? "#C9D8E5" : "#E0F0FF",
            marginBottom: 10,
            margin: 5,
            borderRadius: 10,
            marginTop: 10,
          },
        ]}
      >
        <Text style={[styles.label, { color: colors.black }]}>{label}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default GameFill = ({ data, allowMultiSelect, onStepChange, onComplete, onCorrect, onIncorrect }) => {
  const countSteps = React.useRef(Object.values(data?.questions ?? {}).length).current;
  const questions = React.useRef(Object.values(data?.questions ?? {})).current;

  // counting start from 0 here
  const [currentStep, setCurrentStep] = React.useState(0);

  const [userAnswer, setUserAnswer] = React.useState("");

  React.useEffect(() => {
    onStepChange?.(currentStep, countSteps);
  }, [currentStep, countSteps])


  const checkAnswer = () => {
    /** @type {[string]} */
    const answers = Object.values(questions[currentStep].answer ?? {});
    const result = answers.some(a => a?.trim().toLowerCase() === userAnswer?.trim().toLowerCase());

    return result;
  };

  const handleSubmitButtonPress = () => {
    if (checkAnswer()) {
      handleCorrect();
    }
    else {
      handleIncorrect();
    }
  };

  const handleCorrect = () => {
    if (currentStep < countSteps - 1) {
      setUserAnswer("");
      setCurrentStep(prev => prev + 1);
      onCorrect?.();
    }
    else {
      handleComplete();
    }
  }

  const handleIncorrect = () => {
    onIncorrect?.();
  }

  const handleComplete = () => {
    onComplete?.();
  }

  return (
    <View style={styles.container}>
      <View style={styles.container}>
        <Text style={{ textAlign: "center", fontSize: 40, marginTop: 30 }}>
          {questions[currentStep].question}
        </Text>
      </View>
      <View>
        <TextInput
          style={[
            {
              backgroundColor: "#C9D8E5",
              marginBottom: 10,
              margin: 5,
              borderRadius: 10,
              marginTop: 10,
              height: 80,
              fontSize: 30,
              flexDirection: "row",
              justifyContent: "center",
            },
          ]}
          textAlign={"center"} // doesn't work
          value={userAnswer}
          onChangeText={setUserAnswer}
        />
      </View>
      <View style={styles.getStartedbtnItemWrapper}>
        <PrimaryButton label={"SUBMIT"} onPress={handleSubmitButtonPress} />
      </View>
    </View>
  );
};


