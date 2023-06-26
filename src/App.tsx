import { GameProvider, useGame } from "./hooks/useGame";
import { GameModal } from "./components/GameModal";
import { ThemeProvider } from "styled-components";
import GlobalStyles from "./styles/global";
import theme from "./styles/theme";

export function App() {
  const { state } = useGame();

  return (
    <GameProvider>
      <ThemeProvider theme={theme}>
        <GameModal />
        <GlobalStyles />
      </ThemeProvider>
    </GameProvider>
  );
}
