import { useState } from "react";
import { useGame, GameActions, Player, Mark } from "../../hooks/useGame";
import { Button } from "../Button";
import { getAvatar } from "../../utils/getAvatar";
import { Container, Content, BackButton } from "./styles";
import { ArrowLeft } from "@phosphor-icons/react";

type FormStep = "mode" | "single-player" | "multiplayer" | "difficulty";
const formSteps: FormStep[] = [
  "mode",
  "single-player",
  "multiplayer",
  "difficulty",
];

export function GameModal() {
  const { state, dispatch } = useGame();
  const [title, setTitle] = useState("Choose the game mode");
  const [currentFormStep, setCurrentFormStep] = useState<FormStep>("mode");
  const [playerXName, setPlayerXName] = useState("");
  const [playerOName, setPlayerOName] = useState("");
  const [singlePlayerName, setSinglePlayerName] = useState("");
  const [singlePlayerType, setSinglePlayerType] = useState<Mark>("x");

  function setPlayers(players: { playerX: Player; playerO: Player }) {
    dispatch({ type: GameActions.setPlayers, payload: players });
  }

  function closeModal() {
    dispatch({ type: GameActions.setIsGameModaVisible, payload: false });
    setTitle("Choose the game mode");
    setCurrentFormStep("mode");
    setPlayerXName("");
    setPlayerOName("");
    setSinglePlayerName("");
    setSinglePlayerType("x");
  }

  function changeFormStep(step: FormStep) {
    switch (step) {
      case "mode":
        setTitle("Choose the mode");
        break;
      case "multiplayer":
        setTitle("What's the name of each player?");
        break;
      case "single-player":
        setTitle("What's your name?");
        break;
      case "difficulty":
        setTitle("Set the difficulty");
        break;
      default:
        setTitle("Set the form type");
    }

    setCurrentFormStep(step);
  }

  function handleBackFormStepClick() {
    const previousFormStep = formSteps[formSteps.indexOf(currentFormStep) - 1];
    changeFormStep(previousFormStep);
  }

  function handleModeButtonClick(mode: FormStep) {
    dispatch({ type: GameActions.setMode, payload: mode });

    changeFormStep(mode);
  }

  function handleDifficultyButtonClick(difficulty: string) {
    dispatch({ type: GameActions.setDifficulty, payload: difficulty });

    let playerX, playerO;

    if (singlePlayerType === "x") {
      playerX = {
        name: singlePlayerName.trim(),
        score: 0,
        avatar: getAvatar(),
        isBot: false,
      };
      playerO = {
        name: `Bot ${difficulty}`,
        score: 0,
        avatar: getAvatar(true),
        isBot: true,
      };
    } else {
      playerX = {
        name: `Bot ${difficulty}`,
        score: 0,
        avatar: getAvatar(true),
        isBot: true,
      };
      playerO = {
        name: singlePlayerName.trim(),
        score: 0,
        avatar: getAvatar(),
        isBot: false,
      };
    }

    setPlayers({ playerX, playerO });
    closeModal();
  }

  function handleMultiplayerFormButtonClick() {
    const playerX = {
      name: playerXName.trim(),
      score: 0,
      avatar: getAvatar(),
      isBot: false,
    };
    const playerO = {
      name: playerOName.trim(),
      score: 0,
      avatar: getAvatar(),
      isBot: false,
    };

    setPlayers({ playerX, playerO });
    closeModal();
  }

  function handleSinglePlayerFormButtonClick() {
    changeFormStep("difficulty");
  }

  if (!state.isGameModaVisible) return;

  return (
    <Container>
      <h1>
        T<span>i</span>c <span>T</span>a<span>c</span> T<span>o</span>e
      </h1>
      <Content>
        {formSteps.indexOf(currentFormStep) !== 0 && (
          <BackButton onClick={handleBackFormStepClick}>
            <ArrowLeft size={24} />
          </BackButton>
        )}
        <h2>{title}</h2>

        {currentFormStep === "mode" && (
          <>
            <Button
              title="Single-Player"
              onClick={() => handleModeButtonClick("single-player")}
            />
            <Button
              title="MultiPlayer"
              onClick={() => handleModeButtonClick("multiplayer")}
            />
          </>
        )}

        {currentFormStep === "multiplayer" && (
          <>
            <label htmlFor="player-x-name">Player X:</label>
            <input
              type="text"
              id="player-x-name"
              value={playerXName}
              onChange={({ target }) => setPlayerXName(target.value)}
              autoFocus
            />

            <label htmlFor="player-x-name">Player O:</label>
            <input
              type="text"
              id="player-circle-name"
              value={playerOName}
              onChange={({ target }) => setPlayerOName(target.value)}
            />

            <Button
              title="Play"
              isDisabled={!playerXName || !playerOName}
              onClick={handleMultiplayerFormButtonClick}
            />
          </>
        )}

        {currentFormStep === "single-player" && (
          <>
            <label htmlFor="player-x-name">Your name:</label>
            <input
              type="text"
              id="player-x-name"
              value={singlePlayerName}
              onChange={({ target }) => setSinglePlayerName(target.value)}
              autoFocus
            />

            <div className="input-radio">
              <label htmlFor="x">Play as X</label>
              <input
                type="radio"
                name="single-player-type"
                id="x"
                value={singlePlayerType}
                onChange={() => setSinglePlayerType("x")}
                checked={singlePlayerType === "x"}
              />
            </div>

            <div className="input-radio">
              <label htmlFor="o">Play as O</label>
              <input
                type="radio"
                name="single-player-type"
                id="o"
                value={singlePlayerType}
                onChange={() => setSinglePlayerType("o")}
                checked={singlePlayerType === "o"}
              />
            </div>

            <Button
              title="Set difficulty"
              isDisabled={!singlePlayerName || !singlePlayerType}
              onClick={handleSinglePlayerFormButtonClick}
            />
          </>
        )}

        {currentFormStep === "difficulty" && (
          <>
            <Button
              title="Easy"
              onClick={() => handleDifficultyButtonClick("easy")}
            />
            <Button
              title="Hard"
              onClick={() => handleDifficultyButtonClick("hard")}
            />
          </>
        )}
      </Content>
    </Container>
  );
}
