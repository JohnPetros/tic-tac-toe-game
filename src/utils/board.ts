export type Combinations =
  | "firstRow"
  | "secondRow"
  | "thirdRow"
  | "firstColumn"
  | "secondColumn"
  | "thirdColumn"
  | "firstDiagonal"
  | "secondDiagonal";

type Board = {
  [combination in Combinations]: number[];
};

export const board: Board = {
  firstRow: [0, 1, 2],
  secondRow: [3, 4, 5],
  thirdRow: [6, 7, 8],
  firstColumn: [0, 3, 6],
  secondColumn: [1, 4, 7],
  thirdColumn: [2, 5, 8],
  firstDiagonal: [0, 4, 8],
  secondDiagonal: [2, 4, 6],
};
