import React, { useEffect } from "react";
import {
  Text,
  View,
  Image,
  ScrollView,
  TouchableOpacity,
  FlatList,
} from "react-native";
import { useFiredux } from "../../hooks/useFiredux";
import { styles } from "./styles";
import { SCREENS } from "..";
import { useNavigation } from "@react-navigation/core";
import { isBrightColor } from "../../Utils/color";

function PlayScreen() {
  const listTopics = Object.entries(useFiredux("topic")).map(entry => ({ _id: entry[0], ...entry[1] }));
  const navigation = useNavigation();

  useEffect(() => {
    console.log(listTopics);
  }, [listTopics]);

  const Card = ({ topic }) => {
    return (
      <TouchableOpacity
        style={{ flex: 1 }}
        onPress={() => {
          navigation.navigate(SCREENS.topic.name, { topicId: topic._id });
        }}
      >
        <View
          style={[
            styles.card,
            {
              backgroundColor: topic.backgroundColor,
              marginBottom: 5,
              margin: 5,
            },
          ]}
        >
          <Image
            style={styles.topicImage}
            source={require("../../assets/topics/Animal.png")}
          />
          <Text style={[styles.label, { color: topic.labelColor }]}>
            {topic.name}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <Image
        style={styles.bgImage}
        source={require("../../assets/images/bg2.png")}
      />
      <View style={styles.headingWrapper}>
        <Text style={styles.heading}>Let's learn.</Text>
        {/* <Text style={styles.subHeading}>to Silent Moon</Text> */}
        <Text style={styles.title}>Choose a topic to focuse on:</Text>
      </View>
      <ScrollView contentContainerStyle={styles.scrollViewWrapper}>
        <FlatList
          columnWrapperStyle={{ justifyContent: "space-between" }}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            marginTop: 10,
            paddingBottom: 40,
          }}
          numColumns={2}
          data={listTopics}
          renderItem={({ item }) => {
            return <Card topic={item} />;
          }}
        />
      </ScrollView>
    </View>
  );
}

export default PlayScreen;
