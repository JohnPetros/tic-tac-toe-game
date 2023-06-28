import { GameProvider } from "./hooks/useGame";
import { GameModal } from "./components/GameModal";
import { Game } from "./components/Game";
import { ThemeProvider } from "styled-components";
import GlobalStyles from "./styles/global";
import theme from "./styles/theme";

export function App() {
  return (
    <GameProvider>
      <ThemeProvider theme={theme}>
        <GameModal />
        <Game />
        <GlobalStyles />
      </ThemeProvider>
    </GameProvider>
  );
}
