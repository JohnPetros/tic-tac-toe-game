import { useEffect, useState } from "react";
import { Container, Cell, X, O } from "./styles";
import { CurrentPlayer } from "../Game";

interface BoardProps {
  currentPlayer: CurrentPlayer;
  changePlayer: () => void;
}

export interface CellData {
  id: number;
  mark: CurrentPlayer;
  isMarked: boolean;
}

interface MarkComponent {
  [key: string]: JSX.Element;
}

const markComponent: MarkComponent = {
  x: <X size={8} />,
  o: <O size={8} />,
};

export function Board({ currentPlayer, changePlayer }: BoardProps) {
  const [cells, setCells] = useState<CellData[]>([]);

  function markCell(id: number, mark: CurrentPlayer, canMark: boolean = true) {
    const markedCell = cells.find((cell) => cell.id === id) ?? cells[0];

    markedCell.mark = mark;
    markedCell.isMarked = canMark;
    setCells((currentCells) =>
      currentCells.map((cell) =>
        cell.id === markedCell.id ? markedCell : cell
      )
    );

    if (canMark) changePlayer();
  }

  useEffect(() => {
    let cells = [];
    for (let i = 1; i <= 9; i++) {
      const newCell: CellData = { id: i, mark: "", isMarked: false };
      cells.push(newCell);
    }
    setCells(cells);
  }, []);

  return (
    <Container>
      {cells.map(({ id, mark, isMarked }) => {
        return (
          <Cell
            key={id.toString()}
            isMarked={isMarked}
            onClick={() => markCell(id, currentPlayer)}
            onMouseOver={() =>
              isMarked ? null : markCell(id, currentPlayer, false)
            }
            onMouseOut={() => (isMarked ? null : markCell(id, "", false))}
          >
            <div>{markComponent[mark]}</div>
          </Cell>
        );
      })}
    </Container>
  );
}
