import removeIcon from '../assets/removeIcon.png'

interface BotaoRemoverProps {
  onClick: (id: number) => void;
  categoriaId: number;
}

export default function BotaoRemover({ onClick, categoriaId }: BotaoRemoverProps) {
  

  return (
    <>
      <img src={removeIcon} alt="Remover Icon" onClick={() => onClick(categoriaId)}/>
    </>
  )
}
