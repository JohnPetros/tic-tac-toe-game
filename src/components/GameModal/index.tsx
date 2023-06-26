import { Button } from "../Button";
import { useGame, GameActions } from "../../hooks/useGame";
import { Container, Content } from "./styles";
import { ReactNode, useEffect, useState } from "react";

interface Form {
  type: string;
  title: string;
  content: ReactNode;
}

export function GameModal() {
  const { state, dispatch } = useGame();
  const [title, setTitle] = useState("Choose the game mode");
  const [content, setContent] = useState<ReactNode>();
  const [playerXName, setPlayerXName] = useState("");
  const [siglePlayerType, setSiglePlayerType] = useState<"x" | "circle">("x");
  const [playerCircleName, setPlayerCircleName] = useState("");

  function changeForm(type: string) {
    const form = forms.find((form) => form.type === type);

    if (form) {
      setTitle(form.title);
      setContent(form.content);
    }
  }

  function handleModeButtonClick(mode: string) {
    dispatch({ type: GameActions.setMode, payload: mode });

    changeForm(mode);
  }

  function handleDifficultyButtonClick(difficulty: string) {
    dispatch({ type: GameActions.setMode, payload: difficulty });

    dispatch({ type: GameActions.setIsGameModaVisible, payload: false });
  }

  function handleSinglePlayerFormButtonClick() {}

  function handleMultiplayerFormButtonClick() {}

  const forms: Form[] = [
    {
      type: "mode",
      title: "Choose the mode",
      content: (
        <div id="mode">
          <Button
            title="Single-Player"
            onClick={() => handleModeButtonClick("single-player")}
          />
          <Button
            title="MultiPlayer"
            onClick={() => handleModeButtonClick("multiplayer")}
          />
        </div>
      ),
    },
    {
      type: "multiplayer",
      title: "What's the name of each player?",
      content: (
        <div id="multiplayer">
          <label htmlFor="player-x-name">Player X</label>
          <input type="text" id="player-x-name" value={playerXName} autoFocus />

          <label htmlFor="player-x-name">Player Circle</label>
          <input type="text" id="player-circle-name" value={playerCircleName} />

          <Button
            title="MultiPlayer"
            onClick={handleMultiplayerFormButtonClick}
          />
        </div>
      ),
    },
    {
      type: "single-player",
      title: "What's your name?",
      content: (
        <div id="single-player">
          <label htmlFor="player-name"></label>
          <input type="text" id="player-name" value={playerXName} autoFocus />

          <Button
            title="MultiPlayer"
            onClick={handleSinglePlayerFormButtonClick}
          />
        </div>
      ),
    },
    {
      type: "difficulty",
      title: "Set the dificulty",
      content: (
        <div id="difficulty">
          <Button
            title="Easy"
            onClick={() => handleDifficultyButtonClick("easy")}
          />
          <Button
            title="Hard"
            onClick={() => handleDifficultyButtonClick("hard")}
          />
        </div>
      ),
    },
  ];

  useEffect(() => {
    setTitle(forms[0].title);
    setContent(forms[0].content);
  }, []);

  if (!state.isGameModaVisible) return;

  return (
    <Container>
      <Content>
        <h2>{title}</h2>
        {content}
      </Content>
    </Container>
  );
}
