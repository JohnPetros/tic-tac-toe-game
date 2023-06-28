import { useGame } from "../../hooks/useGame";
import { O, X } from "../Board/styles";
import { Container, Player } from "./styles";

export function Scoreboard() {
  const {
    state: { playerX, playerO },
    dispatch,
  } = useGame();

  return (
    <Container>
      <Player>
        <div>
          <img src={playerX.avatar} alt="Player X avatar" />
          <small>{playerX.name}</small>
        </div>
        <strong>{playerX.score}</strong>
        <X size={2} />
      </Player>

      <Player>
        <div>
          <img src={playerO.avatar} alt="Player X avatar" />
          <small>{playerO.name}</small>
        </div>
        <strong>{playerO.score}</strong>
        <O size={2} />
      </Player>
    </Container>
  );
}
