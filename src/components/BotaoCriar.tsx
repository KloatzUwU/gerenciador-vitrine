import { Button } from 'react-bootstrap';
import { useState } from 'react'; 
interface BotaoCriarProps {
  children: string;
  size?: 'sm' | 'lg';
}

export default function BotaoCriar({ children, size }: BotaoCriarProps) {
  const [hovered, setHovered] = useState(false); 

  return (
    <Button
      type="submit"
      variant={hovered ? 'dark' : 'outline-dark'} 
      size={size}
      onMouseEnter={() => setHovered(true)} 
      onMouseLeave={() => setHovered(false)} 
      style={{
        transition: 'background-color 0.3s, color 0.3s'
      }}
    >
      {children}
    </Button>
  );
}

