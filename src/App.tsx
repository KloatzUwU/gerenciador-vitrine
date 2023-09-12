import React from 'react';
import Categoria from './components/Categoria';
import { Container, Row } from 'react-bootstrap'
import Cabecalho from './components/Cabecalho';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <>
      <Cabecalho/>
    <Container>
      <Categoria/>
    </Container>
    </>
  );
}

export default App;
