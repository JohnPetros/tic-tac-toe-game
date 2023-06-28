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
  firstRow: [1, 2, 3],
  secondRow: [4, 5, 6],
  thirdRow: [7, 8, 9],
  firstColumn: [1, 4, 7],
  secondColumn: [2, 5, 8],
  thirdColumn: [3, 6, 9],
  firstDiagonal: [1, 5, 9],
  secondDiagonal: [3, 5, 7],
};
