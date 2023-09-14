import React from 'react'
import { Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'

export default function PaginaPadrao() {
  return (
    <>
        <Link to='listagem'>
            <Button>Listar Categorias</Button>
        </Link>
        <Link to='criar'>
            <Button>Criar Categorias</Button>
        </Link>
        <Link to='editar'>
            <Button>Editar Categorias</Button>
        </Link>
    </>
  )
}
