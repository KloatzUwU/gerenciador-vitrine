import Cabecalho from '../../components/Cabecalho'
import { Container } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import FormCriarSegmento from '../../components/FormCriarSegmento';

export default function PaginaCriarSegmento() {

  const navigate = useNavigate();

  return (
    <>
      <Cabecalho/>
      <Container>
        <FormCriarSegmento onSegmentoCriado={() => navigate('/listagemSegmento')}/>
      </Container>
    </>
  )
}
