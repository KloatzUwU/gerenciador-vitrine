import React from 'react'
import Cabecalho from '../../components/Cabecalho'
import FormEditarLoja from '../../components/FormEditarLoja'
import { useNavigate } from 'react-router-dom'

export default function PaginaEditarLoja() {
  const navigate = useNavigate()

  return (
    <>
      <Cabecalho/>
      <FormEditarLoja onLojaEditada={() => navigate('/listagemLoja')}/>
    </>
  )
}
