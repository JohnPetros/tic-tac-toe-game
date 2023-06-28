import { ReactNode, useEffect, useState } from "react";
import { Container, Cell, X, O } from "./styles";
import { CurrentPlayer } from "../Game";

interface BoardProps {
  currentPlayer: CurrentPlayer;
}

interface CellData {
  id: number;
  mark: string;
}

interface MarkComponent {
  [key: string]: ReactNode;
}

const markComponent: MarkComponent = {
  x: <X size={8} />,
  o: <O size={8} />,
};

export function Board({ currentPlayer }: BoardProps) {
  const [cells, setCells] = useState<CellData[]>([]);

  useEffect(() => {
    let cells = [];
    for (let i = 1; i <= 9; i++) {
      cells.push({ id: i, mark: "o" });
    }
    setCells(cells);
  }, []);

  return (
    <Container>
      {cells.map(({ id, mark }) => (
        <Cell key={id.toString()}>{markComponent[mark]}</Cell>
      ))}
    </Container>
  );
}
