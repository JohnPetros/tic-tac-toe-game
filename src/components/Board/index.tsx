import { useEffect, useRef, useState } from "react";
import { Container, Cell, X, O, EndGameLine } from "./styles";
import { Combinations, board } from "../../utils/board";
import { GameActions, Mark, useGame } from "../../hooks/useGame";
import { CellSignalMedium } from "@phosphor-icons/react";
export const GAP_SIZE = 8;

interface BoardProps {
  currentMark: Mark;
  changeMark: () => void;
}

export interface CellData {
  id: number;
  mark: Mark;
  isMarked: boolean;
}

interface MarkComponent {
  [key: string]: JSX.Element;
}

const markComponent: MarkComponent = {
  x: <X size={8} />,
  o: <O size={8} />,
};

export function Board({ currentMark, changeMark }: BoardProps) {
  const {
    state: { mode, difficulty, isGameEnd, isBotTurn, hasDraw },
    dispatch,
    getCurrentPlayer,
  } = useGame();
  const [cells, setCells] = useState<CellData[]>([]);
  const [winningCombination, setWinnigCombination] =
    useState<Combinations>("firstColumn");
  const cellRef = useRef<HTMLDivElement>(null);
  const cellSize = useRef(0);
  const lineWidth = useRef(0);

  function checkCombination(index: number) {
    return cells[index].mark === currentMark;
  }

  function verifyWinner() {
    const combinations: Combinations[] = Object.keys(board) as Combinations[];
    return Object.values(board).some((combination, index) => {
      const isWinningCombination = combination.every(checkCombination);

      if (isWinningCombination) {
        setWinnigCombination(combinations[index]);
        return true;
      }
    });
  }

  function verifyDraw() {
    return cells.every((cell) => cell.mark !== "");
  }

  function markCell(id: number, mark: Mark, canMark: boolean = true) {
    const markedCell = cells.find((cell) => cell.id === id)!;

    markedCell.mark = mark;
    markedCell.isMarked = canMark;
    setCells((currentCells) =>
      currentCells.map((cell) =>
        cell.id === markedCell.id ? markedCell : cell
      )
    );

    if (canMark) {
      const hasWinner = verifyWinner();
      if (hasWinner) {
        dispatch({ type: GameActions.setIsGameEnd, payload: hasWinner });
        return;
      }

      const hasDraw = verifyDraw();
      if (hasDraw) {
        dispatch({ type: GameActions.setIsGameEnd, payload: hasDraw });
        dispatch({ type: GameActions.setHasDraw, payload: hasDraw });
        return;
      }

      changeMark();
    }
  }

  function createCells() {
    let cells = [];
    for (let i = 1; i <= 9; i++) {
      const newCell: CellData = { id: i, mark: "", isMarked: false };
      cells.push(newCell);
    }
    setCells(cells);
  }

  function setIsBotTurn(isBotTurn: boolean) {
    dispatch({ type: GameActions.setIsBotTurn, payload: isBotTurn });
  }

  function getRandomCell() {
    const randomIndex = Math.floor(Math.random() * cells.length);
    return cells[randomIndex];
  }

  function markRandomCell() {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        let randomCell = getRandomCell();
        while (randomCell.mark !== "") {
          randomCell = getRandomCell();
          if (!randomCell?.id) reject("Fail to get a random cell");
        }
        console.log("random", randomCell.id);
        markCell(randomCell.id, currentMark);
        resolve(true);
      }, 1000);
    });
  }

  function getBestCell() {
    let bestIndex = null;

    for (const combination of Object.values(board)) {
      if (
        cells[combination[0]].mark === cells[combination[1]].mark &&
        cells[combination[0]].mark !== cells[combination[2]].mark &&
        cells[combination[2]].mark === ""
      ) {
        bestIndex = combination[2];
        console.log(cells[bestIndex]);
      } else if (
        cells[combination[0]].mark === cells[combination[2]].mark &&
        cells[combination[0]].mark !== cells[combination[1]].mark &&
        cells[combination[1]].mark === ""
      ) {
        bestIndex = combination[1];
        console.log(cells[bestIndex]);
      } else if (
        cells[combination[1]].mark === cells[combination[2]].mark &&
        cells[combination[1]].mark !== cells[combination[0]].mark &&
        cells[combination[0]].mark === ""
      ) {
        bestIndex = combination[0];
        console.log(cells[bestIndex]);
      }
    }
    return bestIndex ? cells[bestIndex] : getRandomCell();
  }

  function markBestCell() {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const bestCell = getBestCell();
        // console.log(bestCell);

        if (bestCell?.id) {
          markCell(bestCell.id, currentMark);
          resolve(true);
        } else {
          reject("Fail to get the best cell");
        }
      }, 1000);
    });
  }

  async function playAsBot() {
    setIsBotTurn(true);
    try {
      if (difficulty === "easy") {
        await markRandomCell();
        setIsBotTurn(false);
      } else {
        await markBestCell();
        setIsBotTurn(false);
      }
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    if (!isGameEnd) {
      dispatch({ type: GameActions.setHasDraw, payload: false });
      createCells();
    }
  }, [isGameEnd]);

  useEffect(() => {
    if (mode === "single-player" && !isGameEnd && !isBotTurn) {
      const currentPlayer = getCurrentPlayer(currentMark);
      if (currentPlayer.isBot && cells.length) playAsBot();
    }
  }, [currentMark, cells]);

  useEffect(() => {
    if (cellRef.current) {
      cellSize.current = cellRef.current.clientWidth;
      lineWidth.current = cellSize.current * 3 + GAP_SIZE * 2;
    }
  }, [cellRef.current]);

  return (
    <Container>
      {cells.map(({ id, mark, isMarked }) => {
        return (
          <Cell
            ref={id === 1 ? cellRef : null}
            key={id.toString()}
            isMarked={isMarked}
            isMarkable={!isMarked && !isGameEnd && !isBotTurn}
            onClick={() => markCell(id, currentMark)}
            onMouseOver={() =>
              isMarked ? null : markCell(id, currentMark, false)
            }
            onMouseOut={() => (isMarked ? null : markCell(id, "", false))}
          >
            <div>{markComponent[mark]}</div>
          </Cell>
        );
      })}
      {isGameEnd && !hasDraw && (
        <EndGameLine
          winningCombination={winningCombination}
          cellSize={cellSize.current}
          animate={{
            width: [
              0,
              winningCombination === "firstDiagonal" ||
              winningCombination === "secondDiagonal"
                ? lineWidth.current + cellSize.current + GAP_SIZE * 4
                : lineWidth.current,
            ],
          }}
          transition={{ width: { duration: 0.1 } }}
        />
      )}
    </Container>
  );
}
