import React from "react";
import GameSelectBase from "../GameSelect/GameSelectBase";
import GameSort from "../GameSort/GameSort"

const GameOne = (props) => {
  return (
    <GameSelectBase
      {...(props ?? {})}
      allowMultiSelect={false}
    />
  )
}

export default GameOne;
