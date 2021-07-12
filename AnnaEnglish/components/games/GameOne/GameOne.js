import React from "react";
import GameSelectBase from "../GameSelect/GameSelectBase";

const GameOne = (props) => {
  return <GameSelectBase {...(props ?? {})} allowMultiSelect={false} />;
};

export default GameOne;
