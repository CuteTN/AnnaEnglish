import React from "react";
import { View, FlatList, Text, TouchableOpacity, Image } from "react-native";
import { colors, randomColor } from "../../../config/colors";
// import { styles } from "../../../shared/styles";
import { styles } from "./styles";
import { useFiredux } from "../../../hooks/useFiredux";
import { extractImageUri } from "../../../Utils/image";
import Ionicons from "react-native-vector-icons/Ionicons";
import { speakWithRandomVoice } from "../../../Utils/speech";
import { replaceBlank, toSpelling } from "../../../Utils/string";

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

const GameHangman = ({
  data,
  onComplete,
  onStepChange,
  onCorrect,
  onIncorrect,
}) => {
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
      ?.map((c) => (selectedCharacters.includes(c.toUpperCase()) ? c : ""));
  }, [currentStep, selectedCharacters]);

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

  const vocabulary = useFiredux("vocabulary") ?? {};

  const image = React.useMemo(() => {
    /** @type {string} */
    let uri = extractImageUri(questions[currentStep]?.image, vocabulary);
    return uri ? { uri } : null;
  }, [currentStep, vocabulary]);

  /** @type {GameHangmanSubtype} */
  const currentSubtype = React.useMemo(() => {
    return questions[currentStep]?.subtype;
  }, [currentStep]);

  const checkAnswerHasChar = (c) => {
    return questions[currentStep]?.answer
      ?.toUpperCase()
      .includes(c.toUpperCase());
  };

  const checkAnswer = () => {
    const answer = questions[currentStep]?.answer;
    return answer
      ?.split("")
      ?.every((c) => selectedCharacters.includes(c.toUpperCase()));
  };

  const countWrongCharacters = () => {
    return selectedCharacters.filter((c) => !checkAnswerHasChar(c)).length;
  };

  React.useEffect(() => {
    if (checkAnswer()) handleCorrect();
    else if (countWrongCharacters() > MAX_LIFE) handleIncorrect();
  }, [selectedCharacters]);

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
      setSelectedCharacter((prev) => [...prev, character]);
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
        <Text
          style={{
            textAlign: "center",
            fontSize: 20,
            fontFamily: "Cucho",
            lineHeight: 30,
          }}
          onPress={() =>
            speakWithRandomVoice(
              questions[currentStep]?.questionLang,
              replaceBlank(
                questions[currentStep].question,
                currentSubtype === "listen"
                  ? questions[currentStep].answer
                  : "blank"
              )
            )
          }
        >
          {questions[currentStep].question}
        </Text>
        {image ? (
          <Image
            source={image}
            style={{ height: 120, resizeMode: "center", margin: 5 }}
          ></Image>
        ) : (
          <></>
        )}
        {(currentSubtype === "listen" || currentSubtype === "spell") && (
          <Ionicons
            name="volume-high-outline"
            style={{ marginTop: 3, alignSelf: "center" }}
            color={colors.primary}
            size={50}
            onPress={() => {
              let textToSpeak = "";
              let langToSpeak = "";

              switch (currentSubtype) {
                case "listen": {
                  textToSpeak = replaceBlank(
                    questions[currentStep].question,
                    questions[currentStep].answer
                  );
                  langToSpeak = questions[currentStep].questionLang;
                  break;
                }
                case "spell": {
                  textToSpeak = toSpelling(questions[currentStep].answer);
                  langToSpeak = questions[currentStep].answerLang;
                  break;
                }
              }
              speakWithRandomVoice(langToSpeak, textToSpeak);
            }}
          />
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
    </View>
  );
};

export default GameHangman;

/**
 * @typedef {"read"|"listen"|"spell"} GameHangmanSubtype
 */
