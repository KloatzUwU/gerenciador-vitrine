import { Button } from 'react-bootstrap'

interface BotaoEditarProps {
  onClick: (id: number) => void
  categoriaId: number
}

export default function BotaoEditar({onClick, categoriaId}: BotaoEditarProps) {
  return (
    <Button onClick={() => onClick(categoriaId)} style={{marginRight: '3px'}} size='sm' variant="dark">Editar</Button>
  )
}
