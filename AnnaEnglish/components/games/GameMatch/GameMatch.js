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
import { extractImageUri } from "../../../Utils/image";
import { useFiredux } from "../../../hooks/useFiredux";
import { speakWithRandomVoice } from "../../../Utils/speech";
import { useRealtimeFire } from "../../../hooks/useRealtimeFire";

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
            opacity: isSelected ? 1 : .5,
          },
        ]}
      >
        <Image
          source={{ uri: imageUrl }}
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
            opacity: isSelected ? 1 : .5,
          },
        ]}
      >
        <Text style={[styles.label]}>{label}</Text>
      </View>
    </TouchableOpacity>
  );
};

const GameMatch = ({ data, onComplete, onStepChange, onCorrect, onIncorrect, }) => {
  const MAX_PAIRS = 4;

  const vocabulary = useFiredux("vocabulary");
  const [topic] = useRealtimeFire("topic", data?.topicId);

  const pairs = React.useMemo(() => {
    if (!(vocabulary && topic?.vocabulary))
      return null;

    const topicVocabulary = Object.values(topic?.vocabulary ?? {});

    const result = shuffle(Object.entries(vocabulary)
      .filter(entry => topicVocabulary.includes(entry[0])))
      .map(entry => ({
        text: entry[0],
        image: entry[1]?.image
      }))
      .slice(0, MAX_PAIRS);

    return result;
  }, [vocabulary, topic?.vocabulary])

  const [textOptions, setTextOptions] = React.useState([]);
  const [imageOptions, setImageOptions] = React.useState([]);

  React.useEffect(() => {
    if (!pairs)
      return;

    setTextOptions(shuffle(pairs?.map(p => p.text)));
    setImageOptions(shuffle(pairs?.map(p => p.image)));
  }, [pairs]);

  const countSteps = React.useRef(MAX_PAIRS).current;
  const [currentStep, setCurrentStep] = React.useState(0);


  React.useEffect(() => {
    onStepChange?.(currentStep, countSteps);
  }, [currentStep, countSteps]);

  const backgroundColor = React.useRef(randomColor()).current;
  const backgroundColorWords = React.useRef(randomColor()).current;

  const [selection, setSelection] = React.useState({ textInd: -1, imageInd: -1 });
  const checkAnswer = () => {
    return pairs?.some(p => p.text === textOptions[selection.textInd] && p.image === imageOptions[selection.imageInd]);
  };

  /**
   * @param {"textInd"|"imageInd"} type 
   */
  const handleToggleSelect = (type, ind) => {
    const options = type === "imageInd" ? imageOptions : textOptions;

    if (options[ind]) {
      setSelection(prev => {
        return {
          ...(prev ?? {}),
          [type]: prev[type] === ind ? -1 : ind
        };
      })
    }
  }

  React.useEffect(() => {
    if (selection.textInd >= 0 && selection.imageInd >= 0)
      if (checkAnswer()) {
        handleCorrect();
      } else {
        handleIncorrect();
      }
  }, [selection]);

  const handleCorrect = () => {
    if (currentStep < countSteps - 1) {
      const removeAt = (arr, ind) => {
        const result = [...arr];
        result[ind] = "";
        return result;
      }
      setTextOptions(prev => removeAt(prev, selection.textInd));
      setImageOptions(prev => removeAt(prev, selection.imageInd));

      setSelection({ text: null, image: null });
      setCurrentStep((prev) => prev + 1);
      onCorrect?.();
    } else {
      handleComplete();
    }
  };

  const handleIncorrect = () => {
    setSelection({ text: null, image: null });
    onIncorrect?.();
  };

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
          data={textOptions ?? []}
          renderItem={({ item, index }) => (
            <AnswerText
              label={item}
              backgroundColor={backgroundColor}
              onPress={() => {
                handleToggleSelect("textInd", index)
                speakWithRandomVoice("en", item);
              }}
              isSelected={index === selection.textInd}
            />
          )}
        />

        <FlatList
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            marginBottom: 10,
          }}
          data={imageOptions ?? []}
          renderItem={({ item, index }) => (
            <AnswerImage
              backgroundColor={backgroundColorWords}
              imageUrl={extractImageUri(item, vocabulary)}
              onPress={() => handleToggleSelect("imageInd", index)}
              isSelected={index === selection.imageInd}
            />
          )}
        />
      </View>
    </View>
  );
};

export default GameMatch;
