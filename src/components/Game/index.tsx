import { useEffect, useState } from "react";
import { Board } from "../Board";
import { Scoreboard } from "../Scoreboard";
import { Container, EndGameMessage } from "./styles";
import { Overlay } from "../Overlay";
import { Button } from "../Button";
import { GameState, Player, useGame } from "../../hooks/useGame";

export type CurrentMark = "" | "x" | "o";

export function Game() {
  const { state } = useGame();
  const [currentMark, setCurrentMark] = useState<CurrentMark>("x");
  const [winner, setWinner] = useState<Player | null>(null);

  function changeMark() {
    setCurrentMark(currentMark === "x" ? "o" : "x");
  }

  function handlePlayAgainButtonClick() {}

  function handleResetGameButtonClick() {
    setCurrentMark("x");
  }

  useEffect(() => {
    if (state.isGameEnd) {
      const winnerPlayer = `player${currentMark.toUpperCase()}`;
      setWinner(state[winnerPlayer]);
    }
  }, [state.isGameEnd]);

  return (
    <Container>
      <Scoreboard currentMark={currentMark} />
      <Board currentMark={currentMark} changeMark={changeMark} />

      {state.isGameEnd && (
        <Overlay>
          <EndGameMessage>
            <p>
              <strong>{winner?.name}</strong> wins! (Player{" "}
              {currentMark.toUpperCase()})
            </p>
            <Button title="Play again" onClick={handlePlayAgainButtonClick} />
            <Button title="Reset game" onClick={handleResetGameButtonClick} />
          </EndGameMessage>
        </Overlay>
      )}
    </Container>
  );
}
