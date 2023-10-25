import { Button } from 'react-bootstrap';
import { useState } from 'react';
import './BotaoCriar.css'

interface BotaoCriarProps {
  children: string;
  size?: 'sm' | 'lg';
}

export default function BotaoCriar({ children, size }: BotaoCriarProps) {
  const [hovered, setHovered] = useState(false);

  return (
    <Button
      type="submit"
      size={size}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        backgroundColor: hovered ? 'white' : 'black',
        color: hovered ? 'black' : 'white',
        borderColor: 'black'
      }}
      className='botao'
    >
      {children}
    </Button>
  );
}
