import React from "react";
import { Text, View, Image, ScrollView, TouchableOpacity } from "react-native";
import { styles } from "./styles";
import { SCREENS } from "..";
import { useNavigation } from "@react-navigation/core";

function PlayScreen() {
  const navigation = useNavigation();
  const handle = () => {};

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
          {/* <View>
            {topics.map((item, index) => {
              if (index % 2 == 0) {
                return (
                  <TouchableOpacity onPress={handle}>
                    <View
                      style={[
                        styles.card,
                        {
                          backgroundColor: topicColor[index].background,
                          marginRight: 15,
                          marginBottom: 15,
                        },
                      ]}
                    >
                      <Image style={styles.topicImage} source={item.url} />
                      <Text
                        style={[
                          styles.label,
                          { color: topicColor[index].labelColor },
                        ]}
                      >
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
                        backgroundColor: topicColor[index].background,
                        marginBottom: 15,
                      },
                    ]}
                  >
                    <Image style={styles.topicImage} source={item.url} />
                    <Text
                      style={[
                        styles.label,
                        { color: topicColor[index].labelColor },
                      ]}
                    >
                      {item.title}
                    </Text>
                  </View>
                );
              }
            })}
          </View> */}
        </View>
      </ScrollView>
    </View>
  );
}

export default PlayScreen;
