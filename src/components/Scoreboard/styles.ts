import { css, styled } from "styled-components";

export const Container = styled.div`
  display: flex;
  gap: 7.2rem;

  span {
    display: block;
    margin-top: 4px;
    text-align: center;
    font-weight: 500;
    color: ${({ theme }) => theme.colors.green};
  }
`;

interface Player {
  isCurrentPlayer: boolean;
}

export const Player = styled.div<Player>`
  display: flex;
  flex-direction: column;
  align-items: center;

  width: 14rem;
  padding: 1.2rem 0 0.8rem;

  background-color: ${({ theme }) => theme.colors.darkBlue};

  border: 4px solid transparent;
  border-color: ${({ theme, isCurrentPlayer }) =>
    theme.colors[isCurrentPlayer ? "lightBlue" : "transparent"]};
  border-radius: 8px;

  div:first-child {
    display: flex;
    align-items: center;
    flex-direction: column;
    gap: 0.8rem;
  }

  img {
    width: 4.8rem;
    height: 4.8rem;
    border-radius: 50%;
  }

  small {
    color: ${({ theme }) => theme.colors.white};
    font-size: 1.4rem;
  }

  strong {
    flex: 1;
    color: ${({ theme }) => theme.colors.lightBlue};
    font-size: 3.2rem;
    margin: 0.4rem 1.4rem;
  }
`;
