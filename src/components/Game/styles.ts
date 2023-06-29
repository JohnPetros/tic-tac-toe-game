import { styled } from "styled-components";

export const Container = styled.main`
  width: max-content;
  margin: 0 auto;
  padding-top: 2.4rem;

  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const EndGameMessage = styled.div`
  width: 400px;
  max-width: 90%;

  p {
    text-align: center;
    color: ${({ theme }) => theme.colors.white};
    font-size: 2.4rem;
    letter-spacing: 1.2px;
    margin-bottom: 3.2rem;

    strong {
      text-transform: uppercase;
      color: ${({ theme }) => theme.colors.green};
    }
  }

  button + button {
    margin-top: 2rem;
  }
`;
