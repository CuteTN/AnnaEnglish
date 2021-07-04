import React from "react";
import { StyleSheet, View } from "react-native";
import { Avatar, Title, Caption } from "react-native-paper";

export default function AvatarCard({ user }) {
  return (
    <View style={styles.userInfoSection}>
      <View style={{ flexDirection: "row" }}>
        <Avatar.Image
          source={{
            uri: "https://salena.com.vn/upload/image/lavender.jpg",
          }}
          size={80}
        />
        <View style={{ marginLeft: 20 }}>
          <Title
            style={[
              styles.title,
              {
                marginTop: 15,
                marginBottom: 5,
              },
            ]}
          >
            {user?.name}
          </Title>
          <Caption style={styles.caption}>{"@" + user?.displayName}</Caption>
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
    fontSize: 23,
    fontFamily: "Pony",
  },
  caption: {
    fontSize: 14,
    fontFamily: "Cucho",
  },
});
