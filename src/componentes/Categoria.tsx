import React, { useEffect, useState } from 'react'
    
interface CategoriaItem {
    id: number;
    name: string;
    alias: string;
}

export default function Categoria() {
    const [categoria, setCategoria] = useState<CategoriaItem[]>([])
  
    useEffect(() => {
        fetch('http://64.226.114.207:3334/categories')
            .then(res => res.json())
            .then((resultado: CategoriaItem[]) => {
                setCategoria(resultado);
            });
    }, []);

  return (
    <div>
    {categoria.map(categoriaItem => (
        <div key={categoriaItem.id}>{categoriaItem.name}</div>
    ))}
</div>
  );
}
