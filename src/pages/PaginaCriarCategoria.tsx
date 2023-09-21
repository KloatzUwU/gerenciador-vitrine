import React from 'react'
import Cabecalho from '../components/Cabecalho'
import FormCriarCategoria from '../components/FormCriarCategoria'
import { Container } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'

export default function PaginaCriarCategoria() {

  const navigate = useNavigate();


  return (
    <>
    <Cabecalho>Criar Categoria</Cabecalho>
    <Container>
      <FormCriarCategoria onCategoriaCriada={() => navigate('/listagemCategoria')}/>
    </Container>
    </>
  )
}
