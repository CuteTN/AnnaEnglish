import React, { useRef } from "react";
import { View } from "react-native";
import GameFill from "./GameFill/GameFill";
import GameMultiple from "./GameMultiple/GameMultiple";
import GameOne from "./GameOne/GameOne";
import GameSort from "./GameSort/GameSort";

const games = {
  one: GameOne,
  multiple: GameMultiple,
  fill: GameFill,
  sort: GameSort,
}

/**
 * @type {(props: GameComponentPropsType)=>any}
 */
const Game = ({ gameData, onComplete, onStepChange, onCorrect, onIncorrect }) => {
  const GameComponent = useRef(games[gameData?.type ?? ""]).current;
  return GameComponent ?
    (
      <GameComponent
        data={gameData}
        onComplete={onComplete}
        onStepChange={onStepChange}
        onCorrect={onCorrect}
        onIncorrect={onIncorrect}
      />
    )
    :
    (
      <View />
    )
}

export default Game;

/**
 * @typedef {object} GameComponentPropsType
 * @property {object} gameData raw game data object fetched directly from firebase
 * @property {() => void} onComplete
 * @property {() => void} onCorrect
 * @property {() => void} onIncorrect
 * @property {(currentStep: number, countSteps: number) => void} onStepChange remember counting starts from 0 :)
 */
