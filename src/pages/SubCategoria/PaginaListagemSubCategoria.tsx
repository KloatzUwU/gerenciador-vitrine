import React from 'react'
import Cabecalho from '../../components/Cabecalho'
import SubCategoria from '../../components/SubCategoria'
import { Col, Container, Row } from 'react-bootstrap'
import BotaoCriar from '../../components/BotaoCriar'
import { Link } from 'react-router-dom'

export default function PaginaListagemSubCategoria() {
  return (
    <>
      <Cabecalho/>
      <Container>
        <SubCategoria/>
        <Row>
            <Col className="text-center">
              <Link to='/criarSubCategoria'>
                <BotaoCriar>Criar SubCategoria</BotaoCriar>
              </Link> 
            </Col>
          </Row>
      </Container>
    </>
  )
}