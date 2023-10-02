import removeIcon from '../assets/removeIcon.png'

interface BotaoRemoverProps {
  onClick: (id: number) => void;
  Id: number;
}

export default function BotaoRemover({ onClick, Id }: BotaoRemoverProps) {
  

  return (
    <>
      <img src={removeIcon} alt="Remover Icon" onClick={() => onClick(Id)}/>
    </>
  )
}
