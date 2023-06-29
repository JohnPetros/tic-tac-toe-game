import { css, styled } from "styled-components";
import { motion } from "framer-motion";
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

export const EndGameLine = styled(motion.div)<EndGameLine>`
  position: absolute;
  border-radius: 8px;
  background-color: ${({ theme }) => theme.colors.yellow};
  height: 1.2rem;
  transition: width 2s;

  ${({ winningCombination, cellSize }) => {
    const lineHeight = 12;
    switch (winningCombination) {
      case "firstRow":
        return css`
          top: ${cellSize / 2 + GAP_SIZE}px;
          left: ${GAP_SIZE}px;
        `;
      case "secondRow":
        return css`
          top: ${cellSize * 2 - cellSize / 2 + GAP_SIZE}px;
          left: ${GAP_SIZE}px;
        `;
      case "thirdRow":
        return css`
          top: ${cellSize * 3 - cellSize / 2 + GAP_SIZE * 2 + lineHeight / 2}px;
          left: ${GAP_SIZE}px;
        `;
      case "firstColumn":
        return css`
          top: ${GAP_SIZE / 2}px;
          left: ${cellSize / 2 + GAP_SIZE}px;
          transform-origin: left center;
          transform: rotate(90deg);
        `;
      case "secondColumn":
        return css`
          top: ${GAP_SIZE / 2}px;
          left: ${cellSize + cellSize / 2 + GAP_SIZE * 2}px;
          transform-origin: left center;
          transform: rotate(90deg);
        `;
      case "thirdColumn":
        return css`
          top: ${GAP_SIZE / 2}px;
          left: ${cellSize * 2 + cellSize / 2 + GAP_SIZE * 3}px;
          transform-origin: left center;
          transform: rotate(90deg);
        `;
      case "firstDiagonal":
        return css`
          top: ${GAP_SIZE / 2}px;
          left: ${GAP_SIZE}px;
          transform-origin: left center;
          transform: rotate(45deg);
        `;
      case "secondDiagonal":
        return css`
          top: ${cellSize + cellSize / 2 + GAP_SIZE}px;
          left: -${cellSize / 2 + GAP_SIZE}px;
          transform-origin: left center;
          transform: rotate(-45deg);
        `;
    }
  }}
`;
