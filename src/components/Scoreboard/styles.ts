import { styled } from "styled-components";

export const Container = styled.div`
  display: flex;
  gap: 7.2rem;

  span {
    display: block;
    margin-top: 4px;
    text-align: center;
    font-weight: 500;
    color: ${({ theme }) => theme.colors.yellow};
  }

  > div {
    position: relative;
  }
`;

export const PlayerBoard = styled.div`
  position: relative;

  > div:nth-child(2) {
    height: 2.4rem;
    display: flex;
    justify-content: center;

    #lottie {
      width: 8rem;
      height: 8rem;
      transform: translateY(-2rem);
    }
  }
`;

interface Player {
  isCurrentMark: boolean;
}

export const Player = styled.div<Player>`
  display: flex;
  flex-direction: column;
  align-items: center;

  width: 14rem;
  padding: 0.8rem 0 0;

  background-color: ${({ theme }) => theme.colors.darkBlue};

  border: 4px solid transparent;
  border-color: ${({ theme, isCurrentMark }) =>
    theme.colors[isCurrentMark ? "yellow" : "transparent"]};
  border-radius: 8px;

  div:nth-child(2) {
    display: flex;
    align-items: center;
    flex-direction: column;
    gap: 0.4rem;
    margin: 1.2rem 0.8rem;
    height: 7.2rem;
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
