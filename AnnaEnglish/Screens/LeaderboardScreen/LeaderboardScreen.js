import React, { useEffect, useMemo } from "react";
import { Text, View, SafeAreaView, TouchableOpacity } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import { useFiredux } from "../../hooks/useFiredux";
import { getUserStats } from "../../Utils/user";
import { styles } from "./styles";

function LeaderboardScreen() {
  const rawUsers = useFiredux("user");
  const listUsers = useMemo(
    () =>
      Object.entries(rawUsers ?? {}).map((entry) => ({
        _id: entry[0],
        ...entry[1],
      })),
    [rawUsers]
  );

  const [sortedUsers, setSortedUsers] = React.useState([]);

  const listCategories = ["CHỦ ĐỀ", "TRÒ CHƠI", "KINH NGHIỆM", "TIỀN"];
  const [categoryIndex, setCategoryIndex] = React.useState(0);

  const currentCategory = React.useMemo(() => {
    const categories = ["topics", "games", "exp", "coins"];
    return categories[categoryIndex];
  }, [categoryIndex]);

  useEffect(() => {
    if (!listUsers) return;

    const newSortedUser = [...listUsers];
    newSortedUser.sort(
      (u1, u2) =>
        getUserStats(currentCategory, u2) - getUserStats(currentCategory, u1)
    );

    setSortedUsers(newSortedUser);
  }, [listUsers, currentCategory]);

  // Thyyy::: sort listuser theo ....

  const List = () => {
    return (
      <View style={styles.listContainer}>
        {listCategories.map((item, index) => (
          <TouchableOpacity
            key={index}
            activeOpacity={0.8}
            onPress={() => setCategoryIndex(index)}
          >
            <Text
              style={[
                styles.text,
                categoryIndex === index && styles.textSelected,
              ]}
            >
              {item}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    );
  };

  const Card = ({ user, currentCategory }) => {
    return (
      <View
        style={[
          styles.card,
          {
            backgroundColor: "#F6DEE4",
            marginBottom: 5,
            margin: 5,
          },
        ]}
      >
        <Text style={[styles.label, { color: "black" }]}>{user?.name}</Text>
        <Text style={[styles.label, { color: "black" }]}>
          {getUserStats(currentCategory, user)}
        </Text>
      </View>
    );
  };
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headingWrapper}>
        <Text style={styles.heading}>BẢNG XẾP HẠNG</Text>
      </View>
      {/* <List /> */}
      {List()}
      <FlatList
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingBottom: 40,
          marginTop: 10,
        }}
        data={sortedUsers}
        renderItem={({ item }) => {
          return Card({ user: item, currentCategory });
        }}
      />
    </SafeAreaView>
  );
}

export default LeaderboardScreen;
