import { useGame, Mark } from "../../hooks/useGame";
import { O, X } from "../Board/styles";
import { Player as Animation } from "@lottiefiles/react-lottie-player";
import { Container, PlayerBoard, Player } from "./styles";
import Loading from "../../assets/animations/loading.json";

interface BoardProps {
  currentMark: Mark;
}

export function Scoreboard({ currentMark }: BoardProps) {
  const {
    state: { playerX, playerO, isBotTurn },
  } = useGame();

  return (
    <Container>
      <PlayerBoard>
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
        <div>
          {currentMark === "x" && !playerX.isBot ? (
            <span>Your Turn</span>
          ) : currentMark === "x" && isBotTurn ? (
            <Animation autoplay loop src={Loading}></Animation>
          ) : (
            ""
          )}
        </div>
      </PlayerBoard>

      <PlayerBoard>
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
        <div>
          {currentMark === "o" && !playerO.isBot ? (
            <span>Your Turn</span>
          ) : isBotTurn && playerO.isBot ? (
            <Animation autoplay loop src={Loading}></Animation>
          ) : (
            ""
          )}
        </div>
      </PlayerBoard>
    </Container>
  );
}
