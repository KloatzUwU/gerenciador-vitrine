import { Button } from 'react-bootstrap';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from 'react-router-dom';

interface CabecalhoProps {
  children: string
}

export default function Cabecalho({ children }: CabecalhoProps) {
  return (
    <Navbar style={{backgroundColor: '#5D3FD3'}}>
        <Container>
          <Link to='/'>
          <Button style={{backgroundColor: '#5D3FD3', borderColor: '#5D3FD3', fontWeight: 'bold'}}>Voltar</Button>
          </Link>
          <Navbar.Brand 
            style={{color: 'white'}} 
            className='mx-auto'
        >
            {children}
        </Navbar.Brand>
        </Container>
    </Navbar>
  )
}
