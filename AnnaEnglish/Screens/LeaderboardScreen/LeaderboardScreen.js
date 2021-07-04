import React, { useState } from "react";
import {
  Text,
  View,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { colors } from "../../config/colors";
import { ButtonGroup } from "react-native-elements";

function LeaderboardScreen() {
  const list = ["TOPIC", "GAME", "EXP", "GIDO"];
  const [objectIndex, setObjectIndex] = React.useState(0);

  const handleChooseObject = (index) => {
    setObjectIndex(index);
  };

  const CategoryList = () => {
    return (
      <View style={styles.categoryContainer}>
        {list.map((item, index) => (
          <TouchableOpacity
            key={index}
            activeOpacity={0.8}
            onPress={() => handleChooseObject(index)}
          >
            <Text
              style={[
                styles.categoryText,
                objectIndex === index && styles.categoryTextSelected,
              ]}
            >
              {item}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <CategoryList />
    </SafeAreaView>
  );
}

export default LeaderboardScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
    paddingHorizontal: 20,
  },
  categoryContainer: {
    flexDirection: "row",
    marginTop: 30,
    marginBottom: 20,
    justifyContent: "space-between",
  },
  categoryText: { fontSize: 16, color: "grey", fontWeight: "bold" },
  categoryTextSelected: {
    color: colors.primary,
    paddingBottom: 5,
    borderBottomWidth: 2,
    borderColor: colors.primary,
  },
});
