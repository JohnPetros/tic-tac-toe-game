import { styled } from "styled-components";

export const Container = styled.main``;

interface Mark {
  size: number;
}

export const X = styled.div<Mark>`
  position: relative;
  width: ${({ size }) => size}rem;

  &::before,
  &::after {
    content: "";
    width: ${({ size }) => size * 0.9}rem;
    height: ${({ size }) => size * 0.15}rem;
    background: ${({ theme }) => theme.colors.green};
    position: absolute;
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
  border: 4px solid ${({ theme }) => theme.colors.white};
  background: transparent;
  border-radius: 50%;
`;
