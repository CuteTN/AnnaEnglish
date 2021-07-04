import React from "react";
import { StyleSheet, View, Image, ImageBackground } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/core";

import { Avatar, Title, Caption } from "react-native-paper";

export default function StatiticCard({ imageUrl, title, number }) {
  return (
    <View style={styles.userInfoSection}>
      <View style={{ flexDirection: "row" }}>
        {/* <Avatar.Image source={imageUrl} size={80} /> */}
        <ImageBackground
          source={imageUrl}
          style={{ height: 100, width: 100 }}
          imageStyle={{ borderRadius: 15 }}
        />
        <View style={{ marginLeft: 20 }}>
          <Title
            style={[
              styles.title,
              {
                marginTop: 10,
              },
            ]}
          >
            {number}
          </Title>
          <Title style={styles.caption}>{title}</Title>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  userInfoSection: {
    paddingHorizontal: 10,
    margin: 10,
  },
  title: {
    fontSize: 24,
    fontFamily: "Cucho",
  },
  caption: {
    fontSize: 20,
    marginTop: 10,
    fontWeight: "500",
    fontFamily: "Cucho",
  },
});
