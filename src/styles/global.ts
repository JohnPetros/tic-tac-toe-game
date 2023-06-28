import { createGlobalStyle, css } from "styled-components";

export default createGlobalStyle`${css`
  :root {
    font-synthesis: none;
    text-rendering: optimizeLegibility;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    -webkit-text-size-adjust: 100%;

    font-size: 62.5%;
  }

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  html,
  body {
    width: 100%;
    height: 100vh;

    font-size: 1.6rem;
    font-weight: 400;
    font-family: "Roboto", sans-serif;

    background-color: ${({ theme }) => theme.colors.blue};
  }

  button {
    border: none;
    cursor: pointer;

    transition: opacity 0.2s;
  }

  button:disabled {
    opacity: 0.5;
    pointer-events: none;
  }

  a {
    font-weight: 500;
    text-decoration: inherit;
  }
`}`;
