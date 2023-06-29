import { useEffect, useState } from "react";
import { GameActions, Mark, Player, useGame } from "../../hooks/useGame";
import { Scoreboard } from "../Scoreboard";
import { Board } from "../Board";
import { Overlay } from "../Overlay";
import { Button } from "../Button";
import { Container, EndGameMessage } from "./styles";
let timer = 0;

export function Game() {
  const {
    state: { isGameEnd, hasDraw },
    dispatch,
    getCurrentPlayer,
  } = useGame();
  const [currentMark, setCurrentMark] = useState<Mark>("x");
  const [winner, setWinner] = useState<Player | null>(null);

  function changeMark() {
    setCurrentMark(currentMark === "x" ? "o" : "x");
  }

  function handlePlayAgainButtonClick() {
    if (!winner) return;

    if (!hasDraw && currentMark === "x") {
      const playerX = winner;
      playerX.score = winner.score + 1;
      dispatch({ type: GameActions.incrementScore, payload: playerX });
    } else if (!hasDraw && currentMark === "o") {
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
    if (isGameEnd) {
      const winnerPlayer = getCurrentPlayer(currentMark);
      timer = setTimeout(() => setWinner(winnerPlayer), 2000);
    }
    return () => clearTimeout(timer);
  }, [isGameEnd]);

  return (
    <Container>
      <Scoreboard currentMark={currentMark} />
      <Board currentMark={currentMark} changeMark={changeMark} />

      {isGameEnd && winner && (
        <Overlay>
          <EndGameMessage>
            <p>
              {hasDraw ? (
                <strong>Draw!</strong>
              ) : (
                <>
                  <strong>{winner?.name}</strong> wins! (Player{" "}
                  {currentMark.toUpperCase()})
                </>
              )}
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
