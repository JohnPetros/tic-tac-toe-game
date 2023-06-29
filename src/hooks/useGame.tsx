import { ReactNode, createContext, useContext, useReducer } from "react";

export interface Player {
  name: string;
  score: number;
  avatar: string;
}

type GameStateObject = {
  [key: string]: any;
};

export interface GameState extends GameStateObject {
  mode: "single-player" | "multiplayer";
  difficulty: "easy" | "hard";
  playerX: Player;
  playerO: Player;
  isGameModaVisible: boolean;
  isGameEnd: boolean;
}

interface GameProviderProps {
  children: ReactNode;
}

export enum GameActions {
  setMode,
  setIsGameModaVisible,
  setDifficulty,
  setPlayers,
  setIsGameEnd,
  incrementScore,
  resetGame,
}

interface Action {
  type: GameActions;
  payload?: any;
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
    case GameActions.setPlayers:
      const { playerX, playerO } = action.payload;
      return { ...state, playerX, playerO };
    case GameActions.setIsGameEnd:
      return { ...state, isGameEnd: action.payload };
    case GameActions.incrementScore:
      return { ...state, ...action.payload };
    case GameActions.resetGame:
      return initialState;
    default:
      return state;
  }
}

const GameContext = createContext({} as Context);

const initialState: GameState = {
  mode: "single-player",
  difficulty: "easy",
  playerX: { name: "", score: 0, avatar: "" },
  playerO: { name: "", score: 0, avatar: "" },
  isGameModaVisible: true,
  isGameEnd: false,
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
