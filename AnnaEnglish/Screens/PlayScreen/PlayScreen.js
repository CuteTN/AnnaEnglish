import React from "react";
import { Text, View, Image, ScrollView, TouchableOpacity } from "react-native";
import { styles } from "./styles";
import { SCREENS } from "..";
import { useNavigation } from "@react-navigation/core";

function PlayScreen() {
  const navigation = useNavigation();
  const handleButtonSignUpPress = () => {
    navigation.navigate(SCREENS.signUp.name);
  };
  const topics = [
    {
      title: "Thy cute1",
      url: require("../../assets/topics/topic11cardbg.png"),
      background: "#E0FEFE",
      labelColor: "#3F414E",
    },
    {
      title: "Thy cute2",
      url: require("../../assets/topics/topic2cardbg.png"),
      background: "#C7CEEA",
      labelColor: "#FEF9F3",
    },
    {
      title: "Thy cute3",
      url: require("../../assets/topics/topic15cardbg.png"),
      background: "#FFDAC1",
      labelColor: "#3F414E",
    },
    {
      title: "Thy cute4",
      url: require("../../assets/topics/topic3cardbg.png"),
      background: "#FF9AA2",
      labelColor: "#3F414E",
    },
    {
      title: "Thy cute5",
      url: require("../../assets/topics/topic13cardbg.png"),
      background: "#FFFFD8",
      labelColor: "#FFECCC",
    },
    {
      title: "Thy cute6",
      url: require("../../assets/topics/topic10cardbg.png"),
      background: "#B5EAD7",
      labelColor: "#EBEAEC",
    },
    {
      title: "Thy cute7",
      url: require("../../assets/topics/topic12cardbg.png"),
      background: "#3F414E",
      labelColor: "#EBEAEC",
    },
    {
      title: "Thy cute8",
      url: require("../../assets/topics/topic1cardbg.png"),
      background: "#957DAD",
      labelColor: "#EBEAEC",
    },
    {
      title: "Thy cute9",
      url: require("../../assets/topics/topic4cardbg.png"),
      background: "#3F414E",
      labelColor: "#EBEAEC",
    },
    {
      title: "Thy cute10",
      url: require("../../assets/topics/topic6cardbg.png"),
      background: "#3F414E",
      labelColor: "#EBEAEC",
    },
  ];
  return (
    <View style={styles.container}>
      <Image
        style={styles.bgImage}
        source={require("../../assets/images/bg2.png")}
      />
      <View style={styles.headingWrapper}>
        <Text style={styles.heading}>Let's learn</Text>
        {/* <Text style={styles.subHeading}>to Silent Moon</Text> */}
        <Text style={styles.title}>choose a topic to focuse on:</Text>
      </View>
      <ScrollView contentContainerStyle={styles.scrollViewWrapper}>
        <View style={styles.row}>
          <View>
            {topics.map((item, index) => {
              if (index % 2 == 0) {
                return (
                  <TouchableOpacity onPress={handleButtonSignUpPress}>
                    <View
                      style={[
                        styles.card,
                        {
                          backgroundColor: item.background,
                          marginRight: 15,
                          marginBottom: 15,
                        },
                      ]}
                    >
                      <Image style={styles.topicImage} source={item.url} />
                      <Text style={[styles.label, { color: item.labelColor }]}>
                        {item.title}
                      </Text>
                    </View>
                  </TouchableOpacity>
                );
              }
            })}
          </View>
          <View style={{ flex: 1 }}>
            {topics.map((item, index) => {
              if (index % 2 != 0) {
                return (
                  <View
                    style={[
                      styles.card,
                      {
                        backgroundColor: item.background,
                        marginBottom: 15,
                      },
                    ]}
                  >
                    <Image style={styles.topicImage} source={item.url} />
                    <Text style={[styles.label, { color: item.labelColor }]}>
                      {item.title}
                    </Text>
                  </View>
                );
              }
            })}
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

export default PlayScreen;
