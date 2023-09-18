import Categoria from '../components/Categoria';
import Cabecalho from '../components/Cabecalho';
import BotaoCriar from '../components/BotaoCriar';
import { Container, Row, Col } from 'react-bootstrap'
import { Link } from 'react-router-dom'

export default function PaginaListagem() {
  return (
    <>
      <Cabecalho>Gerenciador de Categorias</Cabecalho>
      <Container>
        <Categoria/>
          <Row>
            <Col className="text-center">
              <Link to='/criar'>
                <BotaoCriar>Criar Categoria</BotaoCriar>
              </Link> 
            </Col>
          </Row>
      </Container>
    </>
  )
}
