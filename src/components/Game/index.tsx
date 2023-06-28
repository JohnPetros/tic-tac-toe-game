import { useState } from "react";
import { Board } from "../Board";
import { Scoreboard } from "../Scoreboard";
import { Container } from "./styles";

export type CurrentPlayer = "" | "x" | "o";

export function Game() {
  const [currentPlayer, setCurrentPlayer] = useState<CurrentPlayer>("x");

  function changePlayer() {
    setCurrentPlayer(currentPlayer === "x" ? "o" : "x");
  }

  return (
    <Container>
      <Scoreboard currentPlayer={currentPlayer} />
      <Board currentPlayer={currentPlayer} changePlayer={changePlayer} />
    </Container>
  );
}
