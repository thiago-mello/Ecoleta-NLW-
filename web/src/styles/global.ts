import { createGlobalStyle } from 'styled-components';

const globalStyle = createGlobalStyle`
  * {
    padding: 0;
    margin: 0;
    box-sizing: border-box;
  }

  html {
    --primary-color: #34CB79;
    --title-color: #322153;
    --text-color: #6C6C80;
  }

  body {
    background: #F0F0F5;
    color: var(--text-color);
    -webkit-font-smoothing: antialiased;
  }

  body, input, button {
    font-family: 'Roboto', sans-serif
  }

  h1, h2, h3, h4, h5, h6 {
    color: var(--title-color);
    font-family: 'Ubuntu', sans-serif;
  }
`;

export default globalStyle;
