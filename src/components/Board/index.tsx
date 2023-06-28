import { useEffect, useRef, useState } from "react";
import { Container, Cell, X, O, EndGameLine } from "./styles";
import { CurrentMark } from "../Game";
import { Combinations, board } from "../../utils/board";
export const GAP_SIZE = 8;

interface BoardProps {
  currentMark: CurrentMark;
  changeMark: () => void;
}

export interface CellData {
  id: number;
  mark: CurrentMark;
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
  const [cells, setCells] = useState<CellData[]>([]);
  const [winningCombination, setWinnigCombination] =
    useState<Combinations>("firstColumn");
  const [isEndGameLineVisible, setIsEndGameLineVisible] = useState(true);
  const cellRef = useRef<HTMLDivElement>(null);
  const cellSize = useRef(0);
  const lineWidth = useRef(0);

  function checkCombination(index: number) {
    return cells[index - 1].mark === currentMark;
  }

  function hasWinner() {
    const combinations: Combinations[] = Object.keys(board) as Combinations[];
    return Object.values(board).some((combination, index) => {
      const isWinningCombination = combination.every(checkCombination);

      if (isWinningCombination) {
        setWinnigCombination(combinations[index]);
        return true;
      }
    });
  }

  function markCell(id: number, mark: CurrentMark, canMark: boolean = true) {
    const markedCell = cells.find((cell) => cell.id === id)!;

    markedCell.mark = mark;
    markedCell.isMarked = canMark;
    setCells((currentCells) =>
      currentCells.map((cell) =>
        cell.id === markedCell.id ? markedCell : cell
      )
    );

    if (canMark) {
      changeMark();
      setIsEndGameLineVisible(hasWinner());
    }
  }

  useEffect(() => {
    let cells = [];
    for (let i = 1; i <= 9; i++) {
      const newCell: CellData = { id: i, mark: "", isMarked: false };
      cells.push(newCell);
    }
    setCells(cells);
  }, []);

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
      {isEndGameLineVisible && (
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
