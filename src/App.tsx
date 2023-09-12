import 'bootstrap/dist/css/bootstrap.min.css';
import Categoria from './components/Categoria';
import { Container, Row, Col } from 'react-bootstrap'
import Cabecalho from './components/Cabecalho';
import BotaoCriar from './components/BotaoCriar';

function App() {
  return (
    <>
    <Cabecalho/>
    <Container>
      <Categoria/>
      <Row>
          <Col className="text-center">
            <BotaoCriar/> 
          </Col>
      </Row>
      {/* Criar um unico componente de botao, passando sua classe para identificar sua funçao */}
    </Container>
    </>
  );
}

export default App;
