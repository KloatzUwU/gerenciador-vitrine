import React from 'react'
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';

export default function Cabecalho() {
  return (
    <Navbar style={{backgroundColor: '#5D3FD3'}}>
        <Container>
          <Navbar.Brand 
            style={{color: 'white'}} 
            className='mx-auto'
        >
            Gerenciador de Categorias
        </Navbar.Brand>
        </Container>
    </Navbar>
  )
}
