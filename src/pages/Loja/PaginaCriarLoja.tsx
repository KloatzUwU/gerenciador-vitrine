import Cabecalho from '../../components/Cabecalho'
import FormCriarLoja from '../../components/FormCriarLoja';
import { Container } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'

export default function PaginaCriarLoja() {

  const navigate = useNavigate();

  return (
    <>
        <Cabecalho/>
        <Container>
            <FormCriarLoja onLojaCriada={() => navigate('/listagemLoja')}/>
        </Container>
    </>
  )
}
