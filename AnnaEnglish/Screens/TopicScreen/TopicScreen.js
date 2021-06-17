import React, { useEffect, useRef, useState } from "react";
import {
  View,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
  FlatList,
  Text,
} from "react-native";
import { colors } from "../../config/colors";
import { useRealtimeFire } from "../../hooks/useRealtimeFire";
import Header from "../../components/header/header";
import { styles } from "./styles";
import Fire from "../../firebase/Fire";

export default TopicScreen = ({ route }) => {
  const [topic] = useRealtimeFire("topic", route?.params?.topicId);
  const [games, setGames] = useState([]);
  const tempGames = useRef([]);
  useEffect(() => {
    if (topic?.games) {
      Object.values(topic?.games)?.forEach((gameId) => {
        Fire.get(`game/${gameId}`).then((game) => {
          tempGames.current.push(game);
          if (tempGames.current.length === Object.values(topic?.games)?.length)
            setGames(tempGames.current);
        });
      });
    }
  }, [topic]);

  const Card = ({ game }) => {
    return (
      <TouchableOpacity
        style={{ flex: 1 }}
        onPress={() => {
          //cho nay ne thyyyycute , truyen cai game vo cho no :> //
        }}
      >
        <View
          style={[
            styles.card,
            {
              backgroundColor: colors.gray,
              marginBottom: 5,
              margin: 5,
            },
          ]}
        >
          <Text style={[styles.label, { color: topic.labelColor }]}>
            {game.toJSON().name}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={{ marginTop: 30 }}>
        <Header title={topic?.name} />
      </View>

      <ScrollView contentContainerStyle={styles.scrollViewWrapper}>
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
      </ScrollView>
    </SafeAreaView>
  );
};
