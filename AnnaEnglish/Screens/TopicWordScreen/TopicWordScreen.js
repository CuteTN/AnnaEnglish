import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import AntDesign from "react-native-vector-icons/AntDesign";
import { useRealtimeFire } from "../../hooks/useRealtimeFire";
import { useFiredux } from "../../hooks/useFiredux";
import { colors } from "../../config/colors";
import { useNavigation } from "@react-navigation/core";
import Header from "../../components/Header/Header";
import { SCREENS } from "..";

function TopicWordScreen({ route }) {
  const topicId = React.useMemo(
    () => route?.params?.topicId,
    [route?.params?.topicId]
  );
  const [topic] = useRealtimeFire("topic", route?.params?.topicId);

  const vocabulary = useFiredux("vocabulary") ?? {};
  const navigation = useNavigation();
  const [txtSearch, setTxtSearch] = useState("");

  const listVocabulary = React.useMemo(() => {
    const topicVocabulary = Object.values(topic?.vocabulary ?? {});

    return Object.entries(vocabulary)
      .filter(entry => topicVocabulary.includes(entry[0]))
      .map((entry) => ({
        _id: entry[0],
        ...entry[1],
      }))
  }, [vocabulary, topic?.vocabulary]);

  /**
   * @param {string} word 
   */
  const handleSelectWord = (word) => {
    navigation.navigate(SCREENS.word.name, { word });
  };

  let listWord = listVocabulary.filter((word) =>
    word?._id.toLowerCase().includes(txtSearch.toLowerCase())
  );

  return (
    <View style={styles.styleCenter}>
      <View style={{ marginTop: 30 }}>
        <Header title={topic?.name} />
      </View>
      <View style={styles.header}>
        <View style={styles.groupInputs}>
          <View style={styles.wrapperInput}>
            <AntDesign name="search1" size={18} color="gray" />
            <TextInput style={styles.inputText} onChangeText={setTxtSearch} />
          </View>
        </View>

        <ScrollView contentContainerStyle={styles.scrollViewWrapper}>
          {listWord.map((item) => (
            <TouchableOpacity onPress={() => handleSelectWord(item._id)}>
              <View
                style={[
                  styles.card,
                  {
                    backgroundColor: "#AFEEEE",
                    marginBottom: 5,
                    marginTop: 5,
                  },
                ]}
              >
                <Text style={[styles.label, { color: "black" }]}>
                  {item?._id}
                </Text>
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
    </View>
  );
}

export default TopicWordScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
    paddingHorizontal: 20,
  },
  header: {
    padding: 15,
  },
  headerText: {
    fontSize: 32,
    fontFamily: "Pony",
    color: colors.heading,
  },

  headerBody: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  wrapperInput: {
    flexDirection: "row",
    backgroundColor: "#fff",
    alignItems: "center",
    paddingHorizontal: 10,
    borderRadius: 8,
    marginTop: 10,
  },
  inputText: {
    padding: 10,
    flex: 1,
  },
  scrollViewWrapper: {
    justifyContent: "space-between",
    marginTop: 10,
  },
  card: {
    padding: 10,
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  label: {
    fontSize: 18,
    fontFamily: "Cucho",
  },
});
