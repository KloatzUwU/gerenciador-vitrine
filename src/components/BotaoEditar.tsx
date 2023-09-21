import { Button } from 'react-bootstrap'
import editIcon from '../assets/editIcon.png'
interface BotaoEditarProps {
  onClick: (id: number) => void
  categoriaId: number
}

export default function BotaoEditar({onClick, categoriaId}: BotaoEditarProps) {
  return (
    <>
    <img src={editIcon} alt="Icone de Editar" />
    <Button onClick={() => onClick(categoriaId)} style={{border: 'none', backgroundColor: 'white', color: 'black', fontWeight: 'bold'}} size='sm'>Editar</Button>
    </>
    
  )
}
