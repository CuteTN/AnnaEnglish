import React from "react";
import { View, FlatList, Text, TouchableOpacity, Image } from "react-native";
import { colors, randomColor } from "../../../config/colors";
// import { styles } from "../../../shared/styles";
import { styles } from "./styles";
import { PrimaryButton } from "../../buttons/PrimaryButton/PrimaryButton";
import { shuffle } from "../../../Utils/shuffle";
import { randomInt } from "../../../Utils/math";
import { speakWithRandomVoice } from "../../../Utils/speech";
import { replaceBlank, toSpelling } from "../../../Utils/string";
import { useFiredux } from "../../../hooks/useFiredux";
import { extractImageUri } from "../../../Utils/image";
import Ionicons from "react-native-vector-icons/Ionicons";

const WordButton = ({ word, backgroundColor, onPress }) => {
  const handlePress = () => {
    onPress?.();
  };

  return (
    <TouchableOpacity style={{ flex: 1 }} onPress={handlePress}>
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

const GameSort = ({
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
  const numcolWordButton =
    words.length < 8 ? 7 : Math.floor((words.length + 1) / 2);
  const numcolResultWordButton =
    questions[currentStep]?.answer.length < 8
      ? 7
      : Math.floor((questions[currentStep]?.answer.length + 1) / 2);

  const NUMBER_OF_WORDS = 12;

  // nếu nó là cái string thì ?? viết thêm tách ra chứ sao giờ :D
  // Hàm tách nó tên là .split("") :D
  // const result = ["B", "E", "Y", "Y", "B", "E"];
  // const words = ["B", "E", "Y", "Y", "B", "E", "B", "E", "Y", "Y", "A", "B"];

  const vocabulary = useFiredux("vocabulary") ?? {};

  const image = React.useMemo(() => {
    /** @type {string} */
    let uri = extractImageUri(questions[currentStep]?.image, vocabulary);
    return uri ? { uri } : null;
  }, [currentStep, vocabulary]);

  /** @type {GameSortSubtype} */
  const currentSubtype = React.useMemo(() => {
    return questions[currentStep]?.subtype;
  }, [currentStep]);

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
      handleIncorrect();
    }
  };

  const handleCorrect = () => {
    if (currentStep < countSteps - 1) {
      setSelectedIndices([]);
      setCurrentStep((prev) => prev + 1);
      onCorrect?.();
    } else {
      handleComplete();
    }
  };

  const handleIncorrect = () => {
    onIncorrect?.();
  };

  const handleComplete = () => {
    onComplete?.();
  };

  // index in words
  const handleSelect = (index) => {
    if (selectedIndices.includes(index)) return;

    const newSelectedIndices = [...selectedIndices];
    for (let i = 0; i < newSelectedIndices.length; i++) {
      if (newSelectedIndices[i] < 0) {
        newSelectedIndices[i] = index;
        setSelectedIndices(newSelectedIndices);
        return;
      }
    }
  };

  // position: position in user's answer
  const handleDeselect = (position) => {
    const newSelectedIndices = [...selectedIndices];
    for (let i = position; i < newSelectedIndices.length - 1; i++) {
      newSelectedIndices[i] = newSelectedIndices[i + 1];
    }

    newSelectedIndices[newSelectedIndices.length - 1] = -1;
    setSelectedIndices(newSelectedIndices);
  };

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
                  textToSpeak = toSpelling(questions[currentStep]?.answer);
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
          data={selectedIndices}
          renderItem={({ item, index }) => (
            <ResultWordButton
              word={words[item] ?? ""}
              backgroundColor={backgroundColorResult}
              numflex={numcolResultWordButton}
              onPress={() => handleDeselect(index)}
            />
          )}
        />
        <FlatList
          style={{ flexDirection: "column-reverse" }}
          columnWrapperStyle={{ justifyContent: "center" }}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            marginBottom: 10,
          }}
          key={"words__" + numcolWordButton}
          numColumns={numcolWordButton}
          data={words}
          renderItem={({ item, index }) => (
            <WordButton
              word={selectedIndices?.includes(index) ? "" : item}
              backgroundColor={backgroundColorWords}
              onPress={() => handleSelect(index)}
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

export default GameSort;

/**
 * @typedef {"read"|"listen"|"spell"} GameSortSubtype
 */
