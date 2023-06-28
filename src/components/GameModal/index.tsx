import { useState } from "react";
import { Button } from "../Button";
import { useGame, GameActions, Player } from "../../hooks/useGame";
import { Container, Content } from "./styles";
import { getAvatar } from "../../utils/getAvatar";

type FormStep = "mode" | "single-player" | "multiplayer" | "difficulty";

export function GameModal() {
  const { state, dispatch } = useGame();
  const [title, setTitle] = useState("Choose the game mode");
  const [formStep, setFormStep] = useState<FormStep>("mode");
  const [playerXName, setPlayerXName] = useState("");
  const [playerOName, setPlayerOName] = useState("");
  const [singlePlayerName, setSinglePlayerName] = useState("");
  const [singlePlayerType, setSinglePlayerType] = useState<"" | "x" | "o">("x");

  function setPlayers(players: { playerX: Player; playerO: Player }) {
    dispatch({ type: GameActions.setPlayers, payload: players });
  }

  function closeModal() {
    dispatch({ type: GameActions.setIsGameModaVisible, payload: false });
  }

  function changeForm(step: FormStep) {
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

    setFormStep(step);
  }

  function handleModeButtonClick(mode: FormStep) {
    dispatch({ type: GameActions.setMode, payload: mode });

    changeForm(mode);
  }

  function handleDifficultyButtonClick(difficulty: string) {
    dispatch({ type: GameActions.setMode, payload: difficulty });

    let playerX, playerO;

    if (singlePlayerType === "x") {
      playerX = { name: singlePlayerName, score: 0, avatar: getAvatar() };
      playerO = {
        name: `Bot ${difficulty}`,
        score: 0,
        avatar: getAvatar(true),
      };
    } else {
      playerX = { name: `Bot ${difficulty}`, score: 0, avatar: getAvatar() };
      playerO = { name: singlePlayerName, score: 0, avatar: getAvatar() };
    }

    setPlayers({ playerX, playerO });
    closeModal();
  }

  function handleMultiplayerFormButtonClick() {
    const playerX = { name: playerXName, score: 0, avatar: getAvatar() };
    const playerO = { name: playerOName, score: 0, avatar: getAvatar() };

    setPlayers({ playerX, playerO });
    closeModal();
  }

  function handleSinglePlayerFormButtonClick() {
    changeForm("difficulty");
  }

  if (!state.isGameModaVisible) return;

  return (
    <Container>
      <h1>
        T<span>i</span>c <span>T</span>a<span>c</span> T<span>o</span>e
      </h1>
      <Content>
        <h2>{title}</h2>

        {formStep === "mode" && (
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

        {formStep === "multiplayer" && (
          <>
            <label htmlFor="player-x-name">Player X:</label>
            <input
              type="text"
              id="player-x-name"
              value={playerXName}
              onChange={({ target }) => setPlayerXName(target.value)}
              autoFocus
            />

            <label htmlFor="player-x-name">Player Circle:</label>
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

        {formStep === "single-player" && (
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

        {formStep === "difficulty" && (
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
