import { styled } from "styled-components";
import { motion } from "framer-motion";

export const Container = styled(motion.button)`
  padding: 1.2rem;
  background-color: ${({ theme }) => theme.colors.green};
  width: 100%;
  border-radius: 8px;

  transition: background 0.2s;
  color: ${({ theme }) => theme.colors.darkBlue};
  font-weight: 600;
  font-size: 1.6rem;

  &:hover {
    background: ${({ theme }) => theme.colors.lightBlue};
    color: ${({ theme }) => theme.colors.white};
    border-radius: 2px;
  }

  &:focus {
    outline-offset: 2px;
    outline-color: ${({ theme }) => theme.colors.lightBlue};
  }
`;
