import React from "react";
import { View, FlatList, Text, TouchableOpacity, Image } from "react-native";
import { colors } from "../../../config/colors";
// import { styles } from "../../../shared/styles";
import { styles } from "./styles";
import { PrimaryButton } from "../../buttons/PrimaryButton/PrimaryButton";
import { shuffle } from "../../../Utils/shuffle";
import CheckModal from "../CheckModal/CheckModal";

const Card = ({ label, onPress, isSelected }) => {
  return (
    <TouchableOpacity style={{ flex: 1, borderRadius: 15 }} onPress={onPress}>
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
        <Text
          style={[styles.label, { color: colors.black, textAlign: "center" }]}
        >
          {label}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const GameSelectBase = ({
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

  const [options, setOptions] = React.useState([]);
  const [selections, setSelections] = React.useState([]);

  const image = {
    uri: "https://tiengtrunganhduong.com/Images/images/635766289191430000.jpg",
  };

  React.useEffect(() => {
    if (currentStep < countSteps) {
      setOptions(shuffle(Object.values(questions[currentStep].options ?? {})));
    }

    onStepChange?.(currentStep, countSteps);
  }, [currentStep, countSteps]);

  const handleToggleSelectAnswer = (answer) => {
    if (allowMultiSelect) {
      setSelections((prev) => {
        if (prev.includes(answer)) return prev.filter((a) => a !== answer);
        else return [...prev, answer];
      });
    } else {
      setSelections([answer]);
    }
  };

  const checkAnswer = () => {
    let result = true;

    if (allowMultiSelect) {
      const answer = Object.values(questions[currentStep].answer ?? {}).sort();
      const sortedSelection = [...selections].sort();

      answer.forEach((a, i) => (result &= a === sortedSelection[i]));
    } else {
      result &=
        selections.length !== 0 &&
        selections[0] === questions[currentStep].answer;
    }

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
      setSelections([]);
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
          style={{ textAlign: "center", fontSize: 26, fontFamily: "Cucho" }}
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
      </View>
      <View>
        <FlatList
          columnWrapperStyle={{ justifyContent: "space-between" }}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            marginBottom: 10,
          }}
          numColumns={2}
          data={options}
          renderItem={({ item }) => (
            <Card
              label={item}
              onPress={() => handleToggleSelectAnswer(item)}
              isSelected={selections.includes(item)}
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

export default GameSelectBase;
