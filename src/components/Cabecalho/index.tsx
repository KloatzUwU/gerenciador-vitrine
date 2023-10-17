import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from 'react-router-dom';
import './Cabecalho.css'

export default function Cabecalho() {
  return (
    <Navbar className='NavBar'>
        <Container className='mx-auto'>
          <Navbar.Brand>
            <h3 className='NavBarTexto'>Gerenciador Vitrine</h3>
          </Navbar.Brand>
          <ul>
            <Link className='Link' to='/'>
                <li className='Botoes'>Home</li>
            </Link>
            <Link className='Link' to='/listagemCategoria'>
                <li className='Botoes'>Listar Categorias</li>
            </Link>
            <Link className='Link' to='/listagemSubCategoria'>
                <li className='Botoes'>Listar SubCategorias</li>
            </Link>
            <Link className='Link' to='/listagemSegmento'>
                <li className='Botoes'>Listar Segmentos</li>
            </Link>
            <Link className='Link' to='/listagemLoja'>
                <li className='Botoes'>Listar Lojas</li>
            </Link>
          </ul>
        </Container>
    </Navbar>
  )
}