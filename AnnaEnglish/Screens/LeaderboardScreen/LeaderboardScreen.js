import React, { useState } from "react";
import {
  Text,
  View,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { FlatList } from "react-native-gesture-handler";
import { colors } from "../../config/colors";

function LeaderboardScreen() {
  const list = ["CHỦ ĐỀ", "GAME", "KINH NGHIỆM", "TIỀN"];
  const [objectIndex, setObjectIndex] = React.useState(0);
  const games = [
    "Hoang bao ngoc",
    "Hoang bao ngoc",
    "Hoang bao ngoc",
    "Hoang bao ngoc",
  ];
  const List = () => {
    return (
      <View style={styles.listContainer}>
        {list.map((item, index) => (
          <TouchableOpacity
            key={index}
            activeOpacity={0.8}
            onPress={() => setObjectIndex(index)}
          >
            <Text
              style={[
                styles.text,
                objectIndex === index && styles.textSelected,
              ]}
            >
              {item}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    );
  };

  const Card = ({ game }) => {
    return (
      <View
        style={[
          styles.card,
          {
            backgroundColor: "#D4C5E2",
            marginBottom: 5,
            margin: 5,
          },
        ]}
      >
        <Text style={[styles.label, { color: "black" }]}>{game}</Text>
      </View>
    );
  };
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headingWrapper}>
        <Text style={styles.heading}>BẢNG XẾP HẠNG</Text>
      </View>
      <List />
      <FlatList
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingBottom: 40,
        }}
        data={games}
        renderItem={({ item }) => {
          return <Card game={item} />;
        }}
      />
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
  listContainer: {
    flexDirection: "row",
    marginTop: 0,
    justifyContent: "space-between",
  },
  text: { fontSize: 16, color: "grey" },
  textSelected: {
    color: colors.primary,
    paddingBottom: 5,
    borderBottomWidth: 2,
    borderColor: colors.primary,
  },
  headingWrapper: {
    marginTop: 45,
    alignItems: "center",
  },
  heading: {
    fontSize: 28,
    color: colors.heading,
    fontFamily: "Pony",
  },
  card: {
    padding: 20,
    flex: 1,
    borderRadius: 10,
    flexDirection: "column",
    justifyContent: "space-between",
    borderWidth: 1,
    borderColor: "#4C6663",
  },
  label: {
    fontSize: 18,
    fontWeight: "bold",
    alignItems: "flex-end",
  },
});
