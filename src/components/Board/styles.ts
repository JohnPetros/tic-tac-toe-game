import { css, styled } from "styled-components";
import { Combinations } from "../../utils/board";
const GAP_SIZE = 8;

export const Container = styled.div`
  background: ${({ theme }) => theme.colors.lightBlue};
  width: 36rem;
  height: 36rem;
  border-radius: 8px;
  margin-top: 4rem;

  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: repeat(3, 1fr);
  padding: ${GAP_SIZE}px;
  gap: ${GAP_SIZE}px;
  align-content: center;
  justify-content: center;

  position: relative;
`;

interface Cell {
  isMarked: boolean;
}

export const Cell = styled.div<Cell>`
  background: ${({ theme }) => theme.colors.darkBlue};
  border-radius: 8px;
  display: grid;
  place-content: center;

  &:hover {
    cursor: pointer;
  }

  > div {
    opacity: ${({ isMarked }) => (isMarked ? 1 : 0.4)};
  }
`;

interface Mark {
  size: number;
}

export const X = styled.div<Mark>`
  position: relative;
  width: ${({ size }) => size}rem;
  height: ${({ size }) => size}rem;

  &::before,
  &::after {
    content: "";
    width: ${({ size }) => size * 0.9}rem;
    height: ${({ size }) => size * 0.15}rem;
    background: ${({ theme }) => theme.colors.green};
    display: block;
    position: absolute;
    top: 44%;
    left: 5%;
  }

  &::before {
    transform: rotate(45deg);
  }

  &::after {
    transform: rotate(-45deg);
  }
`;

export const O = styled.div<Mark>`
  position: relative;

  width: ${({ size }) => size}rem;
  height: ${({ size }) => size}rem;
  border: ${({ size }) => size * 2}px solid ${({ theme }) => theme.colors.white};
  background: transparent;
  border-radius: 50%;
`;

interface EndGameLine {
  winningCombination: Combinations;
  cellSize: number;
}

export const EndGameLine = styled.div<EndGameLine>`
  position: absolute;
  border-radius: 8px;
  background-color: ${({ theme }) => theme.colors.yellow};
  height: 1.2rem;

  ${({ winningCombination, cellSize }) => {
    const lineWidth = cellSize * 3 + GAP_SIZE * 2;
    const lineHeight = 12;
    switch (winningCombination) {
      case "firstRow":
        return css`
          width: ${lineWidth}px;
          top: ${cellSize / 2 + GAP_SIZE}px;
          left: ${GAP_SIZE}px;
        `;
      case "secondRow":
        return css`
          width: ${lineWidth}px;
          top: ${cellSize * 2 - cellSize / 2 + GAP_SIZE * 2}px;
          left: ${GAP_SIZE}px;
        `;
      case "thirdRow":
        return css`
          width: ${lineWidth}px;
          top: ${cellSize * 3 - cellSize / 2 + GAP_SIZE * 2 + lineHeight / 2}px;
          left: ${GAP_SIZE}px;
        `;
      case "firstColumn":
        return css`
          width: ${lineWidth}px;
          top: ${lineWidth / 2 + GAP_SIZE / 2}px;
          left: -${cellSize - GAP_SIZE + lineHeight / 2}px;
          transform: rotate(90deg);
        `;
      case "secondColumn":
        return css`
          width: ${lineWidth}px;
          top: ${lineWidth / 2 + GAP_SIZE / 2}px;
          left: ${GAP_SIZE}px;
          transform: rotate(90deg);
        `;
      case "thirdColumn":
        return css`
          width: ${lineWidth}px;
          top: ${lineWidth / 2 + GAP_SIZE / 2}px;
          left: ${cellSize + GAP_SIZE * 2}px;
          transform: rotate(90deg);
        `;
      case "firstDiagonal":
        return css`
          width: ${lineWidth + cellSize + GAP_SIZE * 4}px;
          top: ${cellSize + cellSize / 2 + GAP_SIZE}px;
          left: -${cellSize / 2 + GAP_SIZE}px;
          transform: rotate(45deg);
        `;
      case "secondDiagonal":
        return css`
          width: ${lineWidth + cellSize + GAP_SIZE * 4}px;
          top: ${cellSize + cellSize / 2 + GAP_SIZE}px;
          left: -${cellSize / 2 + GAP_SIZE}px;
          transform: rotate(-45deg);
        `;
    }
  }}
`;
