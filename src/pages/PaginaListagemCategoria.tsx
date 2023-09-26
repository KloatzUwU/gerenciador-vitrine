import Categoria from '../components/Categoria';
import Cabecalho from '../components/Cabecalho';
import BotaoCriar from '../components/BotaoCriar';
import { Container, Row, Col } from 'react-bootstrap'
import { Link } from 'react-router-dom'

export default function PaginaListagemCategoria() {
  return (
    <div>
      <Cabecalho/>
      <Container >
        <Categoria/>
          <Row>
            <Col className="text-center">
              <Link to='/criarCategoria'>
                <BotaoCriar>Criar Categoria</BotaoCriar>
              </Link> 
            </Col>
          </Row>
      </Container>
    </div>
  )
}
