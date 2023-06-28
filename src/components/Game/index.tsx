import { Board } from "../Board";
import { Scoreboard } from "../Scoreboard";
import { Container } from "./styles";

export function Game() {
  return (
    <Container>
      <Scoreboard />
      <Board />
    </Container>
  );
}
