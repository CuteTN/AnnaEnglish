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
  const pairs = React.useRef(Object.values(data?.pairs ?? {})).current;
  const textOptions = React.useRef(shuffle(pairs.map(p => p["0"])));
  const imageOptions = React.useRef(shuffle(pairs.map(p => p["1"])));

  const countSteps = React.useRef(pairs.length).current;
  const [currentStep, setCurrentStep] = React.useState(0);

  const vocabulary = useFiredux("vocabulary") ?? {};

  React.useEffect(() => {
    onStepChange?.(currentStep, countSteps);
  }, [currentStep, countSteps]);

  const backgroundColor = React.useRef(randomColor()).current;
  const backgroundColorWords = React.useRef(randomColor()).current;

  const [selection, setSelection] = React.useState({ text: null, image: null });
  const checkAnswer = () => {
    return pairs.some(p => p["0"] === selection.text && p["1"] === selection.image);
  };

  /**
   * @param {"text"|"image"} type 
   */
  const handleToggleSelect = (type, value) => {
    if (value) {
      if (type === "text")
        speakWithRandomVoice("en", value);

      setSelection(prev => {
        return {
          ...prev,
          [type]: prev[type] === value ? null : value
        };
      })
    }
  }

  React.useEffect(() => {
    if (selection.text && selection.image)
      if (checkAnswer()) {
        handleCorrect();
      } else {
        handleIncorrect();
      }
  }, [selection]);

  const handleCorrect = () => {
    if (currentStep < countSteps - 1) {
      textOptions.current = textOptions.current.map(text => text === selection.text ? "" : text);
      imageOptions.current = imageOptions.current.map(image => image === selection.image ? "" : image);

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
          data={textOptions.current}
          renderItem={({ item }) => (
            <AnswerText
              label={item}
              backgroundColor={backgroundColor}
              onPress={() => handleToggleSelect("text", item)}
              isSelected={item === selection.text}
            />
          )}
        />

        <FlatList
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            marginBottom: 10,
          }}
          data={imageOptions.current}
          renderItem={({ item }) => (
            <AnswerImage
              backgroundColor={backgroundColorWords}
              imageUrl={extractImageUri(item, vocabulary)}
              onPress={() => handleToggleSelect("image", item)}
              isSelected={item === selection.image}
            />
          )}
        />
      </View>
    </View>
  );
};

export default GameMatch;
