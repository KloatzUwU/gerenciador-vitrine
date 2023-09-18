import { Button } from 'react-bootstrap'

interface BotaoCriarProps {
  children: string 
  size?: "sm" | "lg"
}

export default function BotaoCriar({ children, size }:BotaoCriarProps) {
  return (
     <Button type='submit' variant="dark" size={size}>{children}</Button>
  )
}
