import { useState } from "react";
import { Board } from "../Board";
import { Scoreboard } from "../Scoreboard";
import { Container } from "./styles";

export type CurrentMark = "" | "x" | "o";

export function Game() {
  const [currentMark, setCurrentMark] = useState<CurrentMark>("x");

  function changeMark() {
    setCurrentMark(currentMark === "x" ? "o" : "x");
  }

  return (
    <Container>
      <Scoreboard currentMark={currentMark} />
      <Board currentMark={currentMark} changeMark={changeMark} />
    </Container>
  );
}
