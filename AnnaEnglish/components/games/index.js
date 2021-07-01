import React, { useRef } from "react";
import GameMultiple from "./GameMultiple/GameMultiple";
import GameOne from "./GameOne/GameOne";

const games = {
  one: GameOne,
  multiple: GameMultiple,
}

/**
 * @type {(props: GameComponentPropsType)=>any}
 */
const Game = ({ gameData, onComplete, onStepChange, onCorrect, onIncorrect }) => {
  const GameComponent = useRef(games[gameData?.type ?? ""]).current;
  return (
    <GameComponent
      data={gameData}
      onComplete={onComplete}
      onStepChange={onStepChange}
      onCorrect={onCorrect}
      onIncorrect={onIncorrect}
    />
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