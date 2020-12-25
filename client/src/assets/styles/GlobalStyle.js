import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  @font-face {
    font-family: 'NanumSquare';
    src: url('../fonts/NanumSquareL.ttf') format('truetype');
    font-weight: lighter;
    font-style: normal;
  }

  @font-face {
    font-family: 'NanumSquare';
    src: url('../fonts/NanumSquareR.ttf') format('truetype');
    font-weight: normal;
    font-style: normal;
  }

  @font-face {
    font-family: 'NanumSquare';
    src: url('../fonts/NanumSquareB.ttf') format('truetype');
    font-weight: bold;
    font-style: normal;
  }

  @font-face {
    font-family: 'NanumSquare';
    src: url('../fonts/NanumSquareEB.ttf') format('truetype');
    font-weight: bolder;
    font-style: normal;
  }

  * {
    font-family: 'NanumSquare';
    font-weight: normal;
  }

  body {
    text-align: center;
    margin: 0;
    padding: 0;
  }
  
  a {
    text-decoration: none;
    color: inherit;
  }

  ol, ul {
    list-style: none;
  }

  input[type="button"],
  input[type="submit"],
  button {
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    outline: none;
    border: none;
    cursor: pointer;
    text-align: center;
    text-decoration: none;
    margin: 0;
    padding: 0.5em 0.7em;
  }

  input[type="button"]:active,
  input[type="button"]:focus,
  input[type="button"]:hover,
  input[type="submit"]:active,
  input[type="submit"]:focus,
  input[type="submit"]:hover,
  button:active,
  button:focus,
  button:hover {
    outline: 0;
  }
`;

export default GlobalStyle;