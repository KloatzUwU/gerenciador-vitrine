import { useState } from 'react'
import { Button } from 'react-bootstrap'

interface BotaoCancelarProps {
    children: string
}

export default function BotaoCancelar({children}:BotaoCancelarProps) {
    const [hovered, setHovered] = useState(false);
  return (
    <Button   
      variant={hovered ? 'danger' : 'outline-danger'}
      onMouseEnter={() => setHovered(true)} 
      onMouseLeave={() => setHovered(false)} 
      style={{
        marginRight: '20px',
        transition: 'background-color 0.3s, color 0.3s'
      }}
    >
        {children}
    </Button>
  )
}
