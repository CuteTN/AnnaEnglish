import React from "react";
import { View, Text, Image } from "react-native";
import { colors } from "../../../config/colors";
// import { styles } from "../../../shared/styles";
import { styles } from "./styles";
import { PrimaryButton } from "../../buttons/PrimaryButton/PrimaryButton";
import { TextInput } from "react-native-paper";
import { speakWithRandomVoice } from "../../../Utils/speech";
import { replaceBlank, toSpelling } from "../../../Utils/string";
import { useFiredux } from "../../../hooks/useFiredux";
import { extractImageUri } from "../../../Utils/image";
import Ionicons from "react-native-vector-icons/Ionicons";

export default GameFill = ({
  data,
  allowMultiSelect,
  onStepChange,
  onComplete,
  onCorrect,
  onIncorrect,
}) => {
  const countSteps = React.useRef(
    Object.values(data?.questions ?? {}).length
  ).current;
  const questions = React.useRef(Object.values(data?.questions ?? {})).current;

  // counting start from 0 here
  const [currentStep, setCurrentStep] = React.useState(0);

  const [userAnswer, setUserAnswer] = React.useState("");

  React.useEffect(() => {
    onStepChange?.(currentStep, countSteps);
  }, [currentStep, countSteps]);

  const vocabulary = useFiredux("vocabulary") ?? {};

  const image = React.useMemo(() => {
    /** @type {string} */
    let uri = extractImageUri(questions[currentStep]?.image, vocabulary);
    return uri ? { uri } : null;
  }, [currentStep, vocabulary]);

  /** @type {GameFillSubtype} */
  const currentSubtype = React.useMemo(() => {
    return questions[currentStep]?.subtype;
  }, [currentStep]);

  const checkAnswer = () => {
    /** @type {[string]} */
    const answers = Object.values(questions[currentStep].answer ?? {});
    const result = answers.some(
      (a) => a?.trim().toLowerCase() === userAnswer?.trim().toLowerCase()
    );

    return result;
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
      setUserAnswer("");
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

  return (
    <View style={styles.container}>
      <View style={styles.container}>
        <Text
          style={{
            textAlign: "center",
            fontSize: 24,
            marginTop: 30,
            fontFamily: "Cucho",
            lineHeight: 32,
          }}
          onPress={() =>
            speakWithRandomVoice(
              questions[currentStep]?.questionLang,
              replaceBlank(
                questions[currentStep].question,
                currentSubtype === "listen"
                  ? questions[currentStep].answer?.["0"]
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
                    questions[currentStep].answer?.["0"]
                  );
                  langToSpeak = questions[currentStep].questionLang;
                  break;
                }
                case "spell": {
                  textToSpeak = toSpelling(
                    questions[currentStep]?.answer?.["0"]
                  );
                  langToSpeak = questions[currentStep].answerLang;
                  break;
                }
              }
              speakWithRandomVoice(langToSpeak, textToSpeak);
            }}
          />
        )}
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
              fontSize: 20,
              fontFamily: "Cucho",
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
        <PrimaryButton label={"KIỂM TRA"} onPress={handleSubmitButtonPress} />
      </View>
    </View>
  );
};

/**
 * @typedef {"read"|"listen"|"spell"} GameFillSubtype
 */
