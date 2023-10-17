import Loja from '../../components/Loja'
import { Col, Container, Row } from 'react-bootstrap'
import Cabecalho from '../../components/Cabecalho'
import { Link } from 'react-router-dom'
import BotaoCriar from '../../components/BotaoCriar'

export default function PaginaListagemLoja() {
  return (
    <div>
        <Cabecalho/>
        <Container>
            <Loja/>
            <Row>
                <Col className="text-center">
                    <Link to='/criarLoja'>
                        <BotaoCriar>Criar Loja</BotaoCriar>
                    </Link> 
                </Col>
            </Row>
        </Container>
    </div>
  )
}
