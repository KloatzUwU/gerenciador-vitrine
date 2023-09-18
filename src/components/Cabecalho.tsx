import { Button } from 'react-bootstrap';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from 'react-router-dom';

interface CabecalhoProps {
  children?: string
}

export default function Cabecalho({ children }: CabecalhoProps) {
  return (
    <Navbar style={{backgroundColor: '#A42A04'}}>
        <Container className='mx-auto'>
        
          <Navbar.Brand 
            style={{color: 'white', fontWeight: 'bold'}} 
            
        >
            <h3>CRUD Vitrine CasaPark</h3>
        </Navbar.Brand>
        <div >
        <Link to='/'>
            <Button style={{backgroundColor: '#A42A04', borderColor: '#A42A04', fontWeight: 'bold'}}>Home</Button>
        </Link>
        <Link to='/listagem'>
            <Button style={{backgroundColor: '#A42A04', borderColor: '#A42A04', fontWeight: 'bold'}}>Listar Categorias</Button>
        </Link>
        <Link to='/criar'>
            <Button style={{backgroundColor: '#A42A04', borderColor: '#A42A04',fontWeight: 'bold'}}>Criar Categorias</Button>
        </Link>
        
        </div>
        
        </Container>
    </Navbar>
  )
}
