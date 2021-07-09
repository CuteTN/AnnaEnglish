import React from "react";
import { View, SafeAreaView, StyleSheet, Text } from "react-native";
import { colors } from "../../config/colors";
import Octicons from "react-native-vector-icons/Octicons";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/core";
import { useRealtimeFire } from "../../hooks/useRealtimeFire";
import { styles } from "./styles";

export default WordScreen = ({ route }) => {
  const [rawWord] = useRealtimeFire(`vocabulary`, route?.params.word);
  const word = React.useMemo(() => {
    return {
      eng: route?.params.word,
      meaning: Object.values(rawWord?.meaning ?? {}),
    };
  }, [rawWord]);

  // const [meaning, setMeaning] = React.useState(word?.meaning);
  const meaning = word?.meaning.slice();
  // Thyy
  React.useEffect(() => {
    console.log("word", word);
    console.log("meaning", meaning);
    console.log("meaning", meaning[0]?.type);
  }, [word]);

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
          <Text style={[styles.label, { color: "black" }]}>{item[0]["0"]}</Text>
        </View>
        <View style={styles.row}>
          <Text style={[styles.label, { color: "blue", marginLeft: 20 }]}>
            Ví dụ:{" "}
          </Text>
          <Text style={[styles.label, { color: "black" }]}>{item[0]["1"]}</Text>
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
            {item.type}
          </Text>
          <Text style={[styles.label, { color: "black" }]}>
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
          {meaning.map((item) => (
            <Card item={item}></Card>
          ))}
        </View>
      </View>
    </SafeAreaView>
  );
};
