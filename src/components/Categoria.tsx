import React, { useEffect, useState } from 'react'
import { Col, Row } from 'react-bootstrap';
import Table from 'react-bootstrap/Table';
import BotaoRemover from './BotaoRemover';
import BotaoEditar from './BotaoEditar';
import axios from 'axios';
import { Link } from 'react-router-dom';


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

    function ExcluirCategoria(id: number) {
        axios.delete(`http://64.226.114.207:3334/categories/${id}`)

        setCategoria(categoria.filter(categoriaItem => categoriaItem.id !== id))
    }

    function EditarCategoria(id: number) {
        console.log(id);

    }

    return (
        <div style={{  justifyContent: 'center', paddingTop: '30px'}}>
            <Table responsive striped bordered hover size='sm'>
            <thead style={{textAlign: 'center'}}>
                    <tr>
                        <th>
                            ID
                        </th>
                        <th>
                            Nome
                        </th>
                        <th>
                            Alias
                        </th>
                        <th>
                            Ações
                        </th>
                    </tr>
                </thead>
            {categoria.map(categoriaItem => (    
                <tbody key={categoriaItem.id} style={{textAlign: 'center'}}>
                    <tr>
                        <td>{categoriaItem.id}</td>
                        <td>{categoriaItem.name}</td>
                        <td>{categoriaItem.alias}</td>
                        <td style={{display: 'flex', justifyContent: 'space-around'}}>
                        
                        <Link to={`/editarCategoria/${categoriaItem.id}`}>
                            <BotaoEditar onClick={EditarCategoria} categoriaId={categoriaItem.id} />
                        </Link>
                        <Link to='/listagemCategoria'>
                            <BotaoRemover onClick={ExcluirCategoria} categoriaId={categoriaItem.id} />
                        </Link>
                        </td>
                    </tr>
                </tbody>
            ))}
            </Table>
        </div>
    );
}

{/* <div style={{ display: 'flex', justifyContent: 'space-between', border: 'groove', borderRadius: '10px', marginBottom: '8px', paddingTop: '5px', paddingBottom: '7px' }}>
                <div
                    style={{ paddingRight: '0px', fontSize: '20px', paddingLeft: '20px' }}
                >
                    Id
                </div>
                <div
                    style={{ paddingRight: '0px', fontSize: '20px', paddingLeft: '0px' }}
                >
                    Nome
                </div>
                <div
                    style={{ paddingRight: '50px', fontSize: '20px', paddingLeft: '0px' }}
                >
                    Alias
                </div>
                <div
                    style={{ paddingRight: '40px', fontSize: '20px', paddingLeft: '0px' }}
                >
                    Ações
                </div>
            </div>
            {categoria.map(categoriaItem => (
                <div style={{ display: 'flex', justifyContent: 'space-between', border: 'groove', borderRadius: '10px', marginBottom: '8px', paddingTop: '5px', paddingBottom: '7px' }} key={categoriaItem.id}>
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

                    <div style={{ paddingRight: '12px' }}>
                        <Link to={`/editarCategoria/${categoriaItem.id}`}>
                            <BotaoEditar onClick={EditarCategoria} categoriaId={categoriaItem.id} />
                        </Link>
                        <BotaoRemover onClick={ExcluirCategoria} categoriaId={categoriaItem.id} />
                    </div>
                </div>

            ))} */}
