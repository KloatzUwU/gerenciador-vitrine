import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from 'react-router-dom';
import './Cabecalho.css'

export default function Cabecalho() {
  return (
    <Navbar className='nav-bar'>
        <Container className='mx-auto'>
          <Navbar.Brand>
            <h3 className='nav-bar-texto'>Gerenciador Vitrine</h3>
          </Navbar.Brand>
          <ul>
            <Link className='link' to='/'>
                <li className='botoes'>Home</li>
            </Link>
            <Link className='link' to='/listagemCategoria'>
                <li className='botoes'>Listar Categorias</li>
            </Link>
            <Link className='link' to='/listagemSubCategoria'>
                <li className='botoes'>Listar SubCategorias</li>
            </Link>
            <Link className='link' to='/listagemSegmento'>
                <li className='botoes'>Listar Segmentos</li>
            </Link>
            <Link className='link' to='/listagemLoja'>
                <li className='botoes'>Listar Lojas</li>
            </Link>
          </ul>
        </Container>
    </Navbar>
  )
}
