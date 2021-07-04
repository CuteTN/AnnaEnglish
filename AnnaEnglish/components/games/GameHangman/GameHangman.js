import React, { useEffect } from "react";
import { View, FlatList, Text, TouchableOpacity, Image } from "react-native";
import { colors, randomColor } from "../../../config/colors";
// import { styles } from "../../../shared/styles";
import { styles } from "./styles";
import { PrimaryButton } from "../../buttons/PrimaryButton/PrimaryButton";
import { shuffle } from "../../../Utils/shuffle";
import { randomInt } from "../../../Utils/math";

const WordButton = ({ word, backgroundColor, onPress }) => {
  const handlePress = () => {
    onPress?.();
  };

  return (
    <TouchableOpacity style={{ flex: 1 / 7 }} onPress={handlePress}>
      <View style={[styles.card, { backgroundColor: backgroundColor }]}>
        <Text style={[styles.label]}>{word}</Text>
      </View>
    </TouchableOpacity>
  );
};

const ResultWordButton = ({ word, backgroundColor, onPress, numflex }) => {
  const handlePress = () => {
    onPress?.();
  };

  return (
    <TouchableOpacity style={{ flex: 1 / numflex }} onPress={handlePress}>
      <View style={[styles.card, { backgroundColor: backgroundColor }]}>
        <Text style={[styles.label]}>{word}</Text>
      </View>
    </TouchableOpacity>
  );
};

const GameHangman = ({ data, onComplete, onStepChange }) => {
  const countSteps = React.useRef(
    Object.values(data?.questions ?? {}).length
  ).current;
  const questions = React.useRef(Object.values(data?.questions ?? {})).current;

  const [words, setWords] = React.useState([]);
  const [selectedIndices, setSelectedIndices] = React.useState([]);

  // counting start from 0 here
  const [currentStep, setCurrentStep] = React.useState(0);

  React.useEffect(() => {
    if (currentStep < countSteps) {
      const newAnswer = questions[currentStep]?.answer;
      const newSelectedIndices = [];

      for (let i = 0; i < newAnswer.length; i++) newSelectedIndices.push(-1);

      let newWords = (newAnswer ?? "").toUpperCase?.().split?.("");
      while (newWords.length < NUMBER_OF_WORDS)
        newWords.push(String.fromCharCode(randomInt(65, 90)));

      newWords = shuffle(newWords);

      setWords(newWords);
      setSelectedIndices(newSelectedIndices);
    }

    onStepChange?.(currentStep, countSteps);
  }, [currentStep, countSteps]);

  const backgroundColorWords = React.useRef(randomColor()).current;
  const backgroundColorResult = React.useRef(randomColor()).current;
  const numcolResultWordButton =
    questions[currentStep]?.answer.length < 8
      ? 7
      : Math.floor((questions[currentStep]?.answer.length + 1) / 2);

  const NUMBER_OF_WORDS = 12;

  //data.image
  const imageUrl = {
    uri: "https://tiengtrunganhduong.com/Images/images/635766289191430000.jpg",
  };

  const checkAnswer = () => {
    const answer = questions[currentStep]?.answer;
    const userAnswer = selectedIndices
      .map((index) => words[index] ?? " ")
      .join("");

    return answer.toLowerCase() === userAnswer.toLowerCase();
  };

  const handleSubmitButtonPress = () => {
    if (checkAnswer()) {
      handleCorrect();
    } else {
      handleWrong();
    }
  };

  const handleCorrect = () => {
    if (currentStep < countSteps - 1) {
      setSelectedIndices([]);
      setCurrentStep((prev) => prev + 1);
    } else {
      handleComplete();
    }
  };

  const handleWrong = () => {};

  const handleComplete = () => {
    onComplete?.();
  };

  // index in words
  const handleSelect = (index) => {};

  // position: position in user's answer
  const handleDeselect = (position) => {};

  const [alphabet, setAlphabet] = React.useState([]);
  React.useEffect(() => {
    setAlphabet(
      [...Array(26)].map((_) => String.fromCharCode(i++), (i = 65)).join``
    );
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.container}>
        <Text style={{ textAlign: "center", fontSize: 28 }}>
          {questions[currentStep].question}
        </Text>
        {imageUrl ? (
          <Image
            source={imageUrl}
            style={{ height: 120, resizeMode: "center", margin: 5 }}
          ></Image>
        ) : (
          <></>
        )}
        <FlatList
          columnWrapperStyle={{
            justifyContent: "center",
          }}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            marginTop: 10,
          }}
          key={"selectedWords__" + numcolResultWordButton}
          numColumns={numcolResultWordButton}
          data={selectedIndices}
          renderItem={({ item, index }) => (
            <ResultWordButton
              word={words[item] ?? ""}
              backgroundColor={backgroundColorResult}
              onPress={() => handleDeselect(index)}
              numflex={numcolResultWordButton}
            />
          )}
        />
        <FlatList
          style={{ flexDirection: "column-reverse" }}
          columnWrapperStyle={{
            justifyContent: "center",
          }}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            marginBottom: 10,
          }}
          key={"words__"}
          numColumns={7}
          data={alphabet}
          renderItem={({ item, index }) => (
            <WordButton
              word={selectedIndices?.includes(index) ? "" : item}
              backgroundColor={backgroundColorWords}
              onPress={() => {}}
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

export default GameHangman;
