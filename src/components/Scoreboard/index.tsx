import { useGame } from "../../hooks/useGame";
import { Container } from "./styles";

export function Scoreboard() {
  const { state, dispatch } = useGame();

  return <Container>{state.playerX.name}</Container>;
}
