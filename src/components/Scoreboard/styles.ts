import { styled } from "styled-components";

export const Container = styled.div`
  display: flex;
  gap: 7.2rem;
`;

export const Player = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  width: 14rem;
  /* height: 16rem; */
  padding: 1.2rem;

  margin-top: 2.4rem;

  background-color: ${({ theme }) => theme.colors.darkBlue};
  border-radius: 4px;

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

  div:last-child {
    margin-bottom: 0.8rem;
  }
`;
