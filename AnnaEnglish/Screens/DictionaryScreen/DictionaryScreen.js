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
import { useFiredux } from "../../hooks/useFiredux";
import { colors } from "../../config/colors";
import { useNavigation } from "@react-navigation/core";
import { SCREENS } from "..";
import { styles } from "./styles";
import { useSignedIn } from "../../hooks/useSignedIn";

function DictionaryScreen() {
  const vocabulary = useFiredux("vocabulary") ?? {};
  const { user } = useSignedIn();
  const navigation = useNavigation();
  const [txtSearch, setTxtSearch] = useState("");

  const listVocabulary = React.useMemo(() => {
    const userVocabulary = Object.values(user?.progress?.vocabulary ?? {});

    return Object.entries(vocabulary)
      .filter(entry => userVocabulary.includes(entry[0]))
      .map((entry) => ({
        _id: entry[0],
        ...entry[1],
      }))
  }, [vocabulary, user?.progress?.vocabulary]);

  const handleSelectWord = (word) => {
    navigation.navigate(SCREENS.word.name, { word });
  };

  let listWord = listVocabulary.filter((word) =>
    word?._id.toLowerCase().includes(txtSearch.toLowerCase())
  );

  return (
    <View style={styles.container}>
      <View style={styles.headerBody}>
        <Text style={styles.headerText}>Từ vựng</Text>
      </View>
      <View style={styles.header}>
        <View style={styles.wrapperInput}>
          <AntDesign name="search1" size={18} color="gray" />
          <TextInput style={styles.inputText} onChangeText={setTxtSearch} placeholder={"Tìm kiếm từ vựng"} />
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
  );
}

export default DictionaryScreen;
