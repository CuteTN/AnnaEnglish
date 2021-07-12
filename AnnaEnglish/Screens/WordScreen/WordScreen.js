import React from "react";
import { View, SafeAreaView, Image, Text } from "react-native";
import { colors } from "../../config/colors";
import Octicons from "react-native-vector-icons/Octicons";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/core";
import { useRealtimeFire } from "../../hooks/useRealtimeFire";
import { styles } from "./styles";
import { toVietnameseWordTypes } from "../../Utils/vocabulary";
import { speakWithRandomVoice } from "../../Utils/speech";
import { extractImageUri } from "../../Utils/image";

export default WordScreen = ({ route }) => {
  const [rawWord] = useRealtimeFire(`vocabulary`, route?.params.word);
  const word = React.useMemo(() => {
    return {
      eng: route?.params.word,
      meaning: Object.values(rawWord?.meaning ?? {}),
      image: extractImageUri(rawWord?.image),
    };
  }, [rawWord]);

  const isSpeaking = React.useRef(false);

  /**
   * @param {"vi"|"en"} lang
   * @returns
   */
  const handleSpeak = (lang, text) => {
    // prevent buffer call
    if (isSpeaking.current) return;

    isSpeaking.current = true;

    speakWithRandomVoice(lang, text, {
      onDone: () => (isSpeaking.current = false),
      onError: () => (isSpeaking.current = false),
    });
  };

  const meaning = word?.meaning.slice();

  const navigation = useNavigation();
  const onPress = () => {
    navigation.goBack();
  };

  const ExpCard = ({ item }) => {
    return (
      <View>
        <View style={styles.row}>
          <Text style={[styles.label, { color: "blue", marginLeft: 20 }]}>
            Example:{" "}
          </Text>
          <Text
            style={[styles.label, { color: "black" }]}
            onPress={() => handleSpeak("en", item[0]["0"])}
          >
            {item[0]["0"]}
          </Text>
        </View>
        <View style={styles.row}>
          <Text style={[styles.label, { color: "blue", marginLeft: 20 }]}>
            Ví dụ:{" "}
          </Text>
          <Text
            style={[styles.label, { color: "black" }]}
            onPress={() => handleSpeak("vi", item[0]["1"])}
          >
            {item[0]["1"]}
          </Text>
        </View>
      </View>
    );
  };

  const Card = ({ item }) => {
    return (
      <View style={{ marginBottom: 15 }}>
        <View style={styles.row}>
          <Ionicons
            name="md-create-outline"
            style={{ marginTop: 3 }}
            color={colors.primary}
            size={20}
          />
          <Text style={[styles.label, { color: "red", marginLeft: 5 }]}>
            {toVietnameseWordTypes(item.type)}
          </Text>
          <Text
            style={[styles.label, { color: "black" }]}
            onPress={() => handleSpeak("vi", item.vie)}
          >
            :{" " + item.vie}
          </Text>
        </View>
        {!item.meaning ? <ExpCard item={item.example} /> : <></>}
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={{ marginTop: 30 }}>
        <View style={styles.header}>
          <Octicons
            name="chevron-left"
            size={28}
            onPress={onPress}
            style={styles.icon}
          />
          <View>
            <Text style={styles.headerText}>{word.eng}</Text>
          </View>
        </View>
        <View>
          <Ionicons
            name="volume-high-outline"
            style={{ marginTop: 3, alignSelf: "center" }}
            color={colors.primary}
            size={50}
            onPress={() => handleSpeak("en", route?.params?.word)}
          />
        </View>
        <Image
          source={{ uri: word?.image }}
          style={{ height: 120, resizeMode: "center" }}
        ></Image>
        <View>
          {meaning.map((item) => (
            <Card item={item}></Card>
          ))}
        </View>
      </View>
    </SafeAreaView>
  );
};
