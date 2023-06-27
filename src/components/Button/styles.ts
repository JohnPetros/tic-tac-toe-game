import { styled } from "styled-components";

export const Container = styled.button`
  padding: 1.2rem;
  background-color: ${({ theme }) => theme.colors.green};
  width: 100%;

  transition: background 0.2s;
  color: ${({ theme }) => theme.colors.darkBlue};
  font-weight: 600;
  font-size: 1.6rem;

  &:hover {
    background: ${({ theme }) => theme.colors.lightBlue};
    color: ${({ theme }) => theme.colors.white};
    border-radius: 4px;
  }

  &:focus {
    outline-offset: 2px;
    outline-color: ${({ theme }) => theme.colors.lightBlue};
  }
`;
