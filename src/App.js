import React from 'react';
import GlobalStyled from './styles/global';

import { Container, Content } from './styles';

import Upload from './components/upload';
import Filelist from './components/FileList';

function App() {
  return (
    <Container>
      <Content>
        <Upload />
        <Filelist />
      </Content>
      <GlobalStyled />
    </Container>
  );
}

export default App;
