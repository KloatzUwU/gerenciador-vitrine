import FormEditarCategoria from '../../components/FormEditarCategoria'
import Cabecalho from '../../components/Cabecalho'
import { useNavigate } from 'react-router-dom'

export default function PaginaEditarCategoria() {

  const navigate = useNavigate()

  return (
    <>
      <Cabecalho/>
      <FormEditarCategoria onCategoriaEditada={() => navigate('/listagemCategoria')}/>
    </>
  )
}
