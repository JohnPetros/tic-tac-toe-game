import { Button } from "../Button";
import { useGame, GameActions } from "../../hooks/useGame";
import { Container, Content } from "./styles";
import { useState } from "react";

export function GameModal() {
  const { state, dispatch } = useGame();
  const [isDifficultyButtonsVisible, setIsDifficultyButtonsVisible] =
    useState(false);

  function handleModeButtonClick(mode: string) {
    dispatch({ type: GameActions.setMode, payload: mode });

    if (mode === "single-player") {
      dispatch({ type: GameActions.setIsGameModaVisible, payload: false });
    } else {
      setIsDifficultyButtonsVisible(true);
    }
  }

  function handleDifficultyButtonClick(difficulty: string) {
    dispatch({ type: GameActions.setMode, payload: difficulty });

    dispatch({ type: GameActions.setIsGameModaVisible, payload: false });
  }

  if (!state.isGameModaVisible) return;

  return (
    <Container>
      <Content>
        <h2>
          {!isDifficultyButtonsVisible
            ? "Choose one of the modes"
            : "Set the difficulty"}
        </h2>

        {!isDifficultyButtonsVisible ? (
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
        ) : (
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
