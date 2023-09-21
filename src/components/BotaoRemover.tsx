import { Button } from "react-bootstrap";
import removeIcon from '../assets/removeIcon.png'

interface BotaoRemoverProps {
  onClick: (id: number) => void;
  categoriaId: number;
}

export default function BotaoRemover({ onClick, categoriaId }: BotaoRemoverProps) {
  

  return (
    <>
      <img src={removeIcon} alt="Remover Icon" onClick={() => onClick(categoriaId)}/>
      <Button  onClick={() => onClick(categoriaId)} style={{border: 'none', backgroundColor: 'white', color: 'black', fontWeight: 'bold'}}  size="sm" variant="danger">Remover</Button>
    </>
  )
}
