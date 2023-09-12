import React, { useEffect, useState } from 'react'
import { Col, Row } from 'react-bootstrap';
import BotaoRemover from './BotaoRemover';
import BotaoEditar from './BotaoEditar';

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
                
                <div style={{ display: 'flex', justifyContent: 'space-between', border: 'groove', borderRadius: '10px', marginBottom: '8px', paddingTop: '5px', paddingBottom: '7px'}} key={categoriaItem.id}>
                    <div 
                        style={{ paddingRight: '20px', fontSize: '20px', paddingLeft: '20px' }}
                    >
                        {categoriaItem.id}
                    </div>
                    <div 
                        style={{ paddingRight: '20px', fontSize: '20px' }}
                    >
                        {categoriaItem.name}
                    </div>
                    <div 
                        style={{ paddingRight: '20px', fontSize: '20px' }}
                    >
                        {categoriaItem.alias}
                    </div>
                   
                    <div style={{paddingRight: '12px'}}>
                        <BotaoEditar/>
                        <BotaoRemover/>
                    </div>
                </div>
                
            ))}
        </>
    );
}
