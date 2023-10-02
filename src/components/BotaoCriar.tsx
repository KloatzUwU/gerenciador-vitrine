import { Button } from 'react-bootstrap';
import { useState } from 'react'; 
interface BotaoCriarProps {
  children: string;
  size?: 'sm' | 'lg';
}

export default function BotaoCriar({ children, size }: BotaoCriarProps) {
  const [hovered, setHovered] = useState(false); 

  const estilo = {
    transition: 'background-color 0.3s, color 0.3s',
    borderColor: 'black',
    backgroundColor: hovered ? 'white' : 'black',
    color: hovered ? 'black' : 'white'
  };

  return (
    <Button
      type="submit"
      size={size}
      onMouseEnter={() => setHovered(true)} 
      onMouseLeave={() => setHovered(false)} 
      style={estilo}
    >
      {children}
    </Button>
  );
}

