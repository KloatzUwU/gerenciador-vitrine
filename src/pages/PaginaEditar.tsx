import React from 'react'
import FormEditarCategoria from '../components/FormEditarCategoria'
import Cabecalho from '../components/Cabecalho'
import { useNavigate } from 'react-router-dom'

export default function PaginaEditar() {

  const navigate = useNavigate()

  return (
    <>
      <Cabecalho>a</Cabecalho>
      <FormEditarCategoria onCategoriaEditada={() => navigate('/listagem')}/>
    </>
  )
}
