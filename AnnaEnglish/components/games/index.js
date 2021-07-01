import React, { useRef } from "react";
import GameOne from "./GameOne/GameOne";

const games = {
  one: GameOne,
  // multiple: GameMultiple,
};

export default Game = ({ gameData, onComplete, activeStep }) => {
  const GameComponent = useRef(games[gameData?.type ?? ""]).current;
  return (
    <GameComponent
      data={gameData}
      onComplete={onComplete}
      activeStep={activeStep}
    />
  );
};
