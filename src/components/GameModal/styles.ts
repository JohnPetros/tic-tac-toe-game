import { styled } from "styled-components";
import { motion } from "framer-motion";

export const Container = styled.div`
  background-color: rgba(0, 0, 0, 0.9);
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
  z-index: 42;

  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 1.2rem;

  h1 {
    text-transform: uppercase;
    color: ${({ theme }) => theme.colors.green};
  }

  span {
    color: ${({ theme }) => theme.colors.white};
  }
`;

export const BackButton = styled.button`
  background-color: transparent;
  transform: translateY(-8px);
  svg {
    color: ${({ theme }) => theme.colors.green};
  }
`;

export const Content = styled(motion.div)`
  background-color: ${({ theme }) => theme.colors.darkBlue};
  box-shadow: 0 0 2px rgba(0, 0, 0, 0.2);
  color: ${({ theme }) => theme.colors.white};

  width: 375px;
  max-width: 95%;
  padding: 3.2rem;
  border-radius: 8px;

  font-weight: 500;

  h2 {
    text-align: center;
    margin-bottom: 1.2rem;
  }

  button + button {
    margin-top: 1.6rem;
  }

  label {
    display: inline-block;
    margin: 1.2rem 0;
    color: ${({ theme }) => theme.colors.green};
  }

  input[type="text"] {
    display: block;
    width: 100%;
    height: 3.6rem;
    border: 2px solid ${({ theme }) => theme.colors.lightBlue};
    padding: 1.2rem;
  }

  .input-radio {
    margin: 1.2rem 0 2.4rem;

    display: inline-flex;
    justify-content: center;
    align-items: center;
    gap: 0.8rem;
  }

  .input-radio + .input-radio {
    margin-left: 2.4rem;
  }

  input[type="radio"] {
    width: 1.8rem;
    height: 1.8rem;
  }

  input:focus {
    outline-offset: 2px;
    outline-color: ${({ theme }) => theme.colors.green};
  }

  input + button {
    margin-top: 2.4rem;
  }
`;
