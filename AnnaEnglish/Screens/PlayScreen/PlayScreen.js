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
import { colors } from "../../config/colors";
import { useSignedIn } from "../../hooks/useSignedIn";

function PlayScreen() {
  const listTopics = Object.entries(useFiredux("topic") ?? {}).map((entry) => ({
    _id: entry[0],
    ...entry[1],
  }));
  const navigation = useNavigation();
  const { user } = useSignedIn();

  const handleSelectTopic = (topic) => {
    navigation.navigate(SCREENS.topic.name, { topicId: topic._id });
  }

  const Card = ({ topic }) => {
    const unlocked = Object.keys(user?.topics ?? {}).includes(topic._id);

    return (
      <TouchableOpacity
        style={[
          { flex: 1 },
        ]}
        onPress={() => {
          handleSelectTopic(topic);
        }}
      >
        <View
          style={[
            styles.card,
            {
              backgroundColor: unlocked ? topic.backgroundColor : "#d3d3d3",
              marginBottom: 5,
              margin: 5,
              padding: 0,
            },
          ]}
        >
          <View
            style={[
              styles.card,
              { maxHeight: 190, }
            ]}
          >
            <Image
              key={unlocked}
              style={[
                styles.topicImage,
                unlocked ? {} : { tintColor: colors.gray }
              ]}
              source={require("../../assets/topics/Animal.png")}
            />
            {(!unlocked) &&
              <Image
                source={require("../../assets/images/question-mark.png")}
                style={[
                  styles.questionImage,
                ]}
              />
            }
            <Text style={[styles.label, { color: colors.black }]}>
              {topic.name}
            </Text>
          </View>
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
            return Card({ topic: item });
          }}
        />
      </ScrollView>
    </View>
  );
}

export default PlayScreen;
