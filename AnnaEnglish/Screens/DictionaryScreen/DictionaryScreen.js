import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  FlatList,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import AntDesign from "react-native-vector-icons/AntDesign";
import { useFiredux } from "../../hooks/useFiredux";
import { colors } from "../../config/colors";
import { useNavigation } from "@react-navigation/core";
import { SCREENS } from "..";

function DictionaryScreen() {
  const vocabulary = useFiredux("vocabulary") ?? {};
  const navigation = useNavigation();
  const [txtSearch, setTxtSearch] = useState("");

  const listVocabulary = React.useMemo(() =>
    Object.entries(vocabulary).map((entry) => ({
      _id: entry[0],
      ...entry[1],
    }))
  );

  const handleSelectWord = (word) => {
    navigation.navigate(SCREENS.word.name, { word });
  };

  let listWord = listVocabulary.filter((word) =>
    word?._id.toLowerCase().includes(txtSearch.toLowerCase())
  );

  const Card = ({}) => {
    console.log(vocabulary);
    return (
      <TouchableOpacity
        onPress={() => {
          handleSelectWord(vocabulary);
        }}
      >
        <View
          style={[
            styles.card,
            {
              backgroundColor: "#AFEEEE",
              marginBottom: 5,
              margin: 10,
            },
          ]}
        >
          <Text style={[styles.label, { color: "black" }]}>
            {vocabulary?._id}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.styleCenter}>
      <View style={styles.header}>
        <View style={styles.headerBody}>
          <Text style={styles.headerText}>Từ vựng</Text>
        </View>
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

export default DictionaryScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
    paddingHorizontal: 20,
  },
  header: {
    marginTop: 20,
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
