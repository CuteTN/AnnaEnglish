import React from "react";
import { View, FlatList, Text, TouchableOpacity } from "react-native";
import { colors } from "../../../config/colors";
import { AnswerButton } from "../../buttons/AnswerButton/AnswerButton";
// import { styles } from "../../../shared/styles";
import { styles } from "./styles";
import { PrimaryButton } from "../../buttons/PrimaryButton/PrimaryButton";
const GameOne = ({ data }) => {
  const thycute = ["thy cute", "thycute", "thycute", "thycute"];
  const thydangiu = "thy dang iu nhat qua dat";

  const handleSubmitButtonPress = () => {};

  const Card = ({ label }) => {
    return (
      <TouchableOpacity
        style={{ flex: 1, borderRadius: 15 }}
        onPress={() => {}}
      >
        <View
          style={[
            styles.card,
            {
              backgroundColor: "#E0F0FF",
              marginBottom: 10,
              margin: 5,
              borderRadius: 10,
              marginTop: 10,
            },
          ]}
        >
          <Text style={[styles.label, { color: colors.black }]}>{label}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.container}>
        <Text style={{ textAlign: "center", fontSize: 40, marginTop: 30 }}>
          {thydangiu}
        </Text>
      </View>
      <View>
        <FlatList
          columnWrapperStyle={{ justifyContent: "space-between" }}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            marginBottom: 50,
          }}
          numColumns={2}
          data={thycute}
          renderItem={({ item }) => {
            return <Card label={item} />;
          }}
        />
      </View>
      <View style={styles.getStartedbtnItemWrapper}>
        <PrimaryButton label={"SUBMIT"} onPress={handleSubmitButtonPress} />
      </View>
    </View>
  );
};

export default GameOne;
