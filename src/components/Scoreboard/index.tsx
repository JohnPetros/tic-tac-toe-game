import { useGame } from "../../hooks/useGame";
import { O, X } from "../Board/styles";
import { Container, Player } from "./styles";
import { CurrentMark } from "../Game";

interface BoardProps {
  currentMark: CurrentMark;
}

export function Scoreboard({ currentMark }: BoardProps) {
  const {
    state: { playerX, playerO },
    dispatch,
  } = useGame();

  return (
    <Container>
      <div>
        <Player isCurrentMark={currentMark === "x"}>
          <X size={2} />
          <div>
            <img src={playerX.avatar} alt="Player X avatar" />
            <small>{playerX.name}</small>
          </div>
          <strong>{playerX.score}</strong>
        </Player>
        {currentMark === "x" && <span>Your Turn</span>}
      </div>

      <div>
        <Player isCurrentMark={currentMark === "o"}>
          <O size={2} />
          <div>
            <img src={playerO.avatar} alt="Player X avatar" />
            <small>{playerO.name}</small>
          </div>
          <strong>{playerO.score}</strong>
        </Player>
        {currentMark === "o" && <span>Your Turn</span>}
      </div>
    </Container>
  );
}
