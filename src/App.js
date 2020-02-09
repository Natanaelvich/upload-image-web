import React from 'react';
import GlobalStyled from './styles/global';

import { Container, Content } from './styles';

import Upload from './components/upload';

function App() {
  return (
    <Container>
      <Content>
        <Upload />
      </Content>
      <GlobalStyled />
    </Container>
  );
}

export default App;
