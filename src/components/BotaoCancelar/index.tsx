import { useState } from 'react'
import { Button } from 'react-bootstrap'
import './BotaoCancelar.css'

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
      className='BotaoCancelar'
    >
        {children}
    </Button>
  )
}
