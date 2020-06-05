import React, { FunctionComponent } from 'react';
import { FiLogIn } from 'react-icons/fi';
import logo from '../../assets/logo.svg';

import { Container, Main, Button } from './styles';

const Home: FunctionComponent = () => {
  return (
    <Container>
      <div className="content">
        <header>
          <img src={logo} alt="Logo" />
        </header>

        <Main>
          <h1>Seu marketplace de coleta de resíduos.</h1>
          <p>
            Ajudamos pessoas a encontrarem pontos de coleta de forma eficiente.
          </p>

          <Button href="/cadastro">
            <span>
              <FiLogIn />
            </span>
            <strong>Cadastre um ponto de coleta</strong>
          </Button>
        </Main>
      </div>
    </Container>
  );
};

export default Home;
