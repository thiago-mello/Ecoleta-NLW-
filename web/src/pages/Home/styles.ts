import styled from 'styled-components';
import background from '../../assets/home-background.svg';

export const Container = styled.div`
  height: 100vh;
  background: url(${background}) no-repeat 600px bottom;

  .content {
    width: 100%;
    height: 100%;
    max-width: 1100px;
    margin: 0 auto;
    padding: 0 30px;

    display: flex;
    flex-direction: column;
    align-items: flex-start;

    header {
      margin: 48px 0 0;
    }
  }

  @media (max-width: 900px) {
    .content {
      align-items: center;
      text-align: center;

      header {
        margin: 48px auto 0;
      }

      main {
        align-items: center;

        h1 {
          font-size: 42px;
        }

        p {
          font-size: 24px;
        }
      }
    }
  }
`;

export const Main = styled.main`
  flex: 1;
  max-width: 560px;
  display: flex;
  justify-content: center;
  flex-direction: column;

  h1 {
    font-size: 45px;
  }

  p {
    font-size: 24px;
    margin-top: 24px;
    line-height: 38px;
  }
`;

export const Button = styled.a`
  width: 100%;
  max-width: 360px;
  height: 72px;
  border-radius: 8px;
  background: var(--primary-color);
  text-decoration: none;
  margin-top: 40px;
  transition: background-color 0.2s;

  display: flex;
  align-items: center;

  &:hover {
    background: #2fb86e;
  }

  span {
    display: block;
    background: rgba(0, 0, 0, 0.08);
    width: 72px;
    height: 72px;

    display: flex;
    justify-content: center;
    align-items: center;

    svg {
      color: #fff;
      width: 20px;
      height: 20px;
    }
  }

  strong {
    flex: 1;
    text-align: center;
    color: #fff;
  }
`;
