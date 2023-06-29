import { useGame, Mark } from "../../hooks/useGame";
import { O, X } from "../Board/styles";
import { Container, Player } from "./styles";

interface BoardProps {
  currentMark: Mark;
}

export function Scoreboard({ currentMark }: BoardProps) {
  const {
    state: { playerX, playerO, isBotTurn },
  } = useGame();

  return (
    <Container>
      <div>
        <Player isCurrentMark={currentMark === "x"}>
          <X size={2} />
          <div>
            {playerX.avatar && (
              <img
                src={playerX.avatar}
                alt="Player X avatar"
                width={48}
                height={48}
              />
            )}
            <small>{playerX.name}</small>
          </div>
          <strong>{playerX.score}</strong>
        </Player>
        {currentMark === "x" && !playerX.isBot ? (
          <span>Your Turn</span>
        ) : currentMark === "x" && isBotTurn ? (
          "bot turn"
        ) : (
          ""
        )}
      </div>

      <div>
        <Player isCurrentMark={currentMark === "o"}>
          <O size={2} />
          <div>
            {playerX.avatar && (
              <img
                src={playerO.avatar}
                alt="Player X avatar"
                width={48}
                height={48}
              />
            )}
            <small>{playerO.name}</small>
          </div>
          <strong>{playerO.score}</strong>
        </Player>
        {currentMark === "x" && !playerO.isBot ? (
          <span>Your Turn</span>
        ) : isBotTurn && playerO.isBot ? (
          "bot turn"
        ) : (
          ""
        )}
      </div>
    </Container>
  );
}
