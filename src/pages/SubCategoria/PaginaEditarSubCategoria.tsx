import React from 'react'
import Cabecalho from '../../components/Cabecalho'
import FormEditarSubCategoria from '../../components/FormEditarSubCategoria'
import { useNavigate } from 'react-router-dom'

export default function PaginaEditarSubCategoria() {

  const navigate = useNavigate()

  return (
    <>
      <Cabecalho/>
      <FormEditarSubCategoria onSubCategoriaEditada={() => navigate('/listagemSubCategoria')}/>
    </>
  )
}
