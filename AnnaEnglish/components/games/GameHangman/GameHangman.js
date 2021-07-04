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

const GameHangman = ({ data, onComplete, onStepChange, onCorrect, onIncorrect }) => {
  const countSteps = React.useRef(
    Object.values(data?.questions ?? {}).length
  ).current;
  const questions = React.useRef(Object.values(data?.questions ?? {})).current;

  const [selectedCharacters, setSelectedCharacter] = React.useState([]);

  const MAX_LIFE = React.useRef(3).current;

  // counting start from 0 here
  const [currentStep, setCurrentStep] = React.useState(0);

  const userAnswer = React.useMemo(() => {
    const answer = questions[currentStep]?.answer;

    return answer
      ?.split("")
      ?.map(c => selectedCharacters.includes(c.toUpperCase()) ? c : "");
  }, [currentStep, selectedCharacters])

  React.useEffect(() => {
    if (currentStep < countSteps) {
      setSelectedCharacter([]);
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

  const checkAnswerHasChar = (c) => {
    return questions[currentStep]?.answer?.toUpperCase()
      .includes(c.toUpperCase());
  }

  const checkAnswer = () => {
    const answer = questions[currentStep]?.answer;
    return answer
      ?.split("")
      ?.every(c => selectedCharacters.includes(c.toUpperCase()));
  };

  const countWrongCharacters = () => {
    return selectedCharacters.filter(c => !checkAnswerHasChar(c)).length;
  }

  React.useEffect(() => {
    if (checkAnswer())
      handleCorrect();
    else if (countWrongCharacters() > MAX_LIFE)
      handleIncorrect();

  }, [selectedCharacters])

  const handleCorrect = () => {
    if (currentStep < countSteps - 1) {
      setSelectedCharacter([]);
      setCurrentStep((prev) => prev + 1);
      onCorrect?.();
    } else {
      handleComplete();
    }
  };

  const handleIncorrect = () => {
    setSelectedCharacter([]);
    onIncorrect?.();
  };

  const handleComplete = () => {
    onComplete?.();
  };

  const handleSelect = (character) => {
    if (!selectedCharacters.includes(character)) {
      setSelectedCharacter(prev => [...prev, character])
    }
  };



  // position: position in user's answer
  // const handleDeselect = (position) => { };

  const [alphabet, setAlphabet] = React.useState([]);
  React.useEffect(() => {
    setAlphabet(
      [...Array(26)].map((x, i) => String.fromCharCode(65 + i)).join(``)
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
          data={userAnswer}
          renderItem={({ item, index }) => (
            <ResultWordButton
              word={item}
              backgroundColor={backgroundColorResult}
              // onPress={() => handleDeselect(index)}
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
              word={selectedCharacters?.includes(item) ? "" : item}
              backgroundColor={backgroundColorWords}
              onPress={() => handleSelect(item)}
            />
          )}
        />
      </View>
      {/* <View style={styles.getStartedbtnItemWrapper}>
        <PrimaryButton label={"SUBMIT"} onPress={handleSubmitButtonPress} />
      </View> */}
    </View>
  );
};

export default GameHangman;
