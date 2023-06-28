import { styled } from "styled-components";

export const Container = styled.div`
  background: ${({ theme }) => theme.colors.lightBlue};
  width: 36rem;
  height: 36rem;
  border-radius: 8px;
  margin-top: 4rem;

  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: repeat(3, 1fr);
  padding: 0.8rem;
  gap: 0.8rem;
  align-content: center;
  justify-content: center;
`;

export const Cell = styled.div`
  background: ${({ theme }) => theme.colors.darkBlue};
  border-radius: 8px;
  display: grid;
  place-content: center;

  &:hover {
    cursor: pointer;
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
