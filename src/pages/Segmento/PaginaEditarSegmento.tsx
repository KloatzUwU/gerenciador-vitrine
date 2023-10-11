
import Cabecalho from '../../components/Cabecalho'
import { useNavigate } from 'react-router-dom'
import FormEditarSegmento from '../../components/FormEditarSegmento'

export default function PaginaEditarSegmento() {

  const navigate = useNavigate()

  return (
    <>
      <Cabecalho/>
      <FormEditarSegmento onSegmentoEditado={() => navigate('/listagemSegmento')}/>
    </>
  )
}
