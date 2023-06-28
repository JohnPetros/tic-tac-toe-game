import { useGame } from "../../hooks/useGame";
import { O, X } from "../Board/styles";
import { Container, Player } from "./styles";
import { CurrentPlayer } from "../Game";

interface BoardProps {
  currentPlayer: CurrentPlayer;
}

export function Scoreboard({ currentPlayer }: BoardProps) {
  const {
    state: { playerX, playerO },
    dispatch,
  } = useGame();

  return (
    <Container>
      <div>
        <Player isCurrentPlayer={currentPlayer === "x"}>
          <X size={2} />
          <div>
            <img src={playerX.avatar} alt="Player X avatar" />
            <small>{playerX.name}</small>
          </div>
          <strong>{playerX.score}</strong>
        </Player>
        {currentPlayer === "x" && <span>Your Turn</span>}
      </div>

      <div>
        <Player isCurrentPlayer={currentPlayer === "o"}>
          <O size={2} />
          <div>
            <img src={playerO.avatar} alt="Player X avatar" />
            <small>{playerO.name}</small>
          </div>
          <strong>{playerO.score}</strong>
        </Player>
        {currentPlayer === "o" && <span>Your Turn</span>}
      </div>
    </Container>
  );
}
