import React from "react";
import { View, FlatList, Text, TouchableOpacity } from "react-native";
import { colors } from "../../../config/colors";
// import { styles } from "../../../shared/styles";
import { styles } from "./styles";
import { PrimaryButton } from "../../buttons/PrimaryButton/PrimaryButton";
import GameSelectBase from "../GameSelect/GameSelectBase";

const GameOne = ({ data, onComplete }) => {
  return (
    <GameSelectBase
      data={data}
      onComplete={onComplete}
    />
  )
}

export default GameOne;
