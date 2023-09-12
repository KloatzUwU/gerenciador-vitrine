import React, { useEffect, useState } from 'react'
import { Col, Row } from 'react-bootstrap';

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
        <>
            {categoria.map(categoriaItem => (
                <div style={{ display: 'flex', justifyContent: 'center' }} key={categoriaItem.id}>
                    <div 
                        style={{ paddingRight: '20px' }}
                    >
                        {categoriaItem.id}
                    </div>
                    <div 
                        style={{ paddingRight: '20px' }}
                    >
                        {categoriaItem.name}
                    </div>
                    <div 
                        style={{ paddingRight: '20px' }}
                    >
                        {categoriaItem.alias}
                    </div>
                </div>
            ))}
        </>
    );
}
