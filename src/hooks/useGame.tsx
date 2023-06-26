import { ReactNode, createContext, useContext, useReducer } from "react";

interface GameState {
  mode: "single-player" | "multiplayer";
  difficulty: "easy" | "hard";
  isGameModaVisible: boolean;
}

interface GameProviderProps {
  children: ReactNode;
}

export enum GameActions {
  setMode,
  setIsGameModaVisible,
  setDifficulty,
}

interface Action {
  type: GameActions;
  payload: any;
}

interface Context {
  state: GameState;
  dispatch: (action: Action) => void;
}

function GameReducer(state: GameState, action: Action) {
  switch (action.type) {
    case GameActions.setMode:
      return { ...state, mode: action.payload };
    case GameActions.setDifficulty:
      return { ...state, difficulty: action.payload };
    case GameActions.setIsGameModaVisible:
      return { ...state, isGameModaVisible: action.payload };
    default:
      return state;
  }
}

const GameContext = createContext({} as Context);

const initialState: GameState = {
  mode: "single-player",
  difficulty: "easy",
  isGameModaVisible: true,
};

export function GameProvider({ children }: GameProviderProps) {
  const [state, dispatch] = useReducer(GameReducer, initialState);
  const value = { state, dispatch };

  return <GameContext.Provider value={value}>{children}</GameContext.Provider>;
}

export function useGame() {
  const context = useContext(GameContext);
  return context;
}
