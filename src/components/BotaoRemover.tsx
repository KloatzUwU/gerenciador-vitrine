import Button from 'react-bootstrap/Button';

interface BotaoRemoverProps {
  onClick: (id: number) => void;
  categoriaId: number;
}

export default function BotaoRemover({ onClick, categoriaId }: BotaoRemoverProps) {
  

  return (
    <Button  onClick={() => onClick(categoriaId)}  size="sm" variant="danger">Remover</Button>
    // Criar um unico componente de botao, passando sua classe para identificar sua funçao
  )
}
