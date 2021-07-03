import React from "react";
import GameSelectBase from "../GameSelect/GameSelectBase";

const GameMultiple = (props) => {
  return (
    <GameSelectBase
      {...props}
      allowMultiSelect
    />
  )
}

export default GameMultiple;
