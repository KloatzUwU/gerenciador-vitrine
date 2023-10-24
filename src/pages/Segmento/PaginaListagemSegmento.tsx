import Cabecalho from '../../components/Cabecalho';
import BotaoCriar from '../../components/BotaoCriar';
import { Container, Row, Col } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import Segmento from '../../components/Segmento';

export default function PaginaListagemSegmento() {
  return (
    <div>
      <Cabecalho/>
      <Container>
        <Segmento/>
        <Row>
          <Col className="text-center">
            <Link to='/criarSegmento'>
              <BotaoCriar>Criar Segmento</BotaoCriar>
            </Link>
          </Col>
        </Row>
      </Container>
    </div>
  )
}
