import Cabecalho from '../../components/Cabecalho'
import FormCriarSubCategoria from '../../components/FormCriarSubCategoria';
import { Container } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'

export default function PaginaCriarCategoria() {

  const navigate = useNavigate();


  return (
    <>
      <Cabecalho/>
      <Container>
        <FormCriarSubCategoria onSubCategoriaCriada={() => navigate('/listagemSubCategoria')}/>
      </Container>
    </>
  )
}
