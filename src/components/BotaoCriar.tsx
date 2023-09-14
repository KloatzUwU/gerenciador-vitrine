import { Button } from 'react-bootstrap'

interface BotaoCriarProps {
  children: string 
  size?: "sm" | "lg"
}

export default function BotaoCriar({ children, size }:BotaoCriarProps) {
  return (
     <Button type='submit' variant="success" size={size}>{children}</Button>
     // Criar um unico componente de botao, passando sua classe para identificar sua funçao
  )
}
