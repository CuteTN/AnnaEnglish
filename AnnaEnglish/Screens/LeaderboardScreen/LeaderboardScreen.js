import React, { useEffect, useState } from "react";
import {
  Text,
  View,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  BackHandler,
} from "react-native";
import { FlatList } from "react-native-gesture-handler";
import { colors } from "../../config/colors";
import { useFiredux } from "../../hooks/useFiredux";

function LeaderboardScreen() {
  const listUsers = Object.entries(useFiredux("user") ?? {}).map((entry) => ({
    _id: entry[0],
    ...entry[1],
  }));

  const list = ["CHỦ ĐỀ", "GAME", "KINH NGHIỆM", "TIỀN"];
  const [objectIndex, setObjectIndex] = React.useState(0);

  function sortsByCoins(data) {
    const sortedData = data?.sort(function (a, b) {
      var _a = a.stats?.coins;
      var _b = b.stats?.coins;
      if (_a > _b) return -1;
      if (_a < _b) return 1;
      return 0;
    });
    return sortedData;
  }

  function sortsByTopic(data) {
    const sortedData = data?.sort(function (a, b) {
      var _a = a.stats?.topic?.length;
      var _b = b.stats?.topic?.length;
      if (_a > _b) return -1;
      if (_a < _b) return 1;
      return 0;
    });
    return sortedData;
  }

  function sortsByExp(data) {
    const sortedData = data?.sort(function (a, b) {
      var _a = a.stats?.exp;
      var _b = b.stats?.exp;
      if (_a > _b) return -1;
      if (_a < _b) return 1;
      return 0;
    });
    return sortedData;
  }

  // Thyyy::: sort listuser theo ....

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

  const Card = ({ user }) => {
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
        <Text style={[styles.label, { color: "black" }]}>{user?.name}</Text>
        <Text style={[styles.label, { color: "black" }]}>
          {user?.stats.coins}
        </Text>
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
          marginTop: 10,
        }}
        data={listUsers}
        renderItem={({ item }) => {
          return <Card user={item} />;
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
  text: { fontSize: 16, color: "grey", fontWeight: "bold" },
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
    flexDirection: "row",
    justifyContent: "space-between",
    borderWidth: 1,
    borderColor: "#4C6663",
  },
  label: {
    fontSize: 18,
    fontFamily: "Cucho",
  },
});
