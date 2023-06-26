import { styled } from "styled-components";

export const Container = styled.div`
  background-color: rgba(0, 0, 0, 0.9);
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;

  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Content = styled.div`
  background-color: ${({ theme }) => theme.colors.darkBlue};
  box-shadow: 0 0 2px rgba(0, 0, 0, 0.2);
  color: ${({ theme }) => theme.colors.white};

  width: 375px;
  max-width: 95%;
  padding: 3.2rem;

  h2 {
    text-align: center;
    margin-bottom: 2.4rem;
  }

  button + button {
    margin-top: 1.2rem;
  }

  #single-player,
  #multiplayerplayer {
    label {
      display: block;
    }
  }
`;
