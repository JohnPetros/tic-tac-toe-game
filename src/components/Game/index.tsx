import { useEffect, useState } from "react";
import { Board } from "../Board";
import { Scoreboard } from "../Scoreboard";
import { Container, EndGameMessage } from "./styles";
import { Overlay } from "../Overlay";
import { Button } from "../Button";
import { GameActions, Player, useGame } from "../../hooks/useGame";
let timer = 0;

export type CurrentMark = "" | "x" | "o";

export function Game() {
  const { state, dispatch } = useGame();
  const [currentMark, setCurrentMark] = useState<CurrentMark>("x");
  const [winner, setWinner] = useState<Player | null>(null);

  function changeMark() {
    setCurrentMark(currentMark === "x" ? "o" : "x");
  }

  function handlePlayAgainButtonClick() {
    if (!winner) return;

    if (currentMark === "x") {
      const playerX = winner;
      playerX.score = winner.score + 1;
      dispatch({ type: GameActions.incrementScore, payload: playerX });
    } else {
      const playerO = winner;
      playerO.score = winner.score + 1;
      dispatch({ type: GameActions.incrementScore, payload: playerO });
    }
    setWinner(null);
    dispatch({ type: GameActions.setIsGameEnd, payload: false });
  }

  function handleResetGameButtonClick() {
    setWinner(null);
    setCurrentMark("x");
    dispatch({ type: GameActions.resetGame });
  }

  useEffect(() => {
    if (state.isGameEnd) {
      const winnerPlayer = `player${currentMark.toUpperCase()}`;
      setTimeout(() => setWinner(state[winnerPlayer]), 2000);
    }
  }, [state.isGameEnd]);

  return (
    <Container>
      <Scoreboard currentMark={currentMark} />
      <Board currentMark={currentMark} changeMark={changeMark} />

      {state.isGameEnd && winner && (
        <Overlay>
          <EndGameMessage>
            <p>
              <strong>{winner?.name}</strong> wins! (Player{" "}
              {currentMark.toUpperCase()})
            </p>
            <Button
              title="Play again"
              onClick={handlePlayAgainButtonClick}
              isAnimated
            />
            <Button title="Reset game" onClick={handleResetGameButtonClick} />
          </EndGameMessage>
        </Overlay>
      )}
    </Container>
  );
}
