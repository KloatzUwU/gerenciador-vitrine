import { useEffect, useState } from 'react'
import Table from 'react-bootstrap/Table';
import BotaoRemover from '../BotaoRemover';
import BotaoEditar from '../BotaoEditar';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './Categoria.css'

interface CategoriaItem {
    id: number;
    name: string;
    alias: string;
    image: string;
}

export default function Categoria() {

    const [categoria, setCategoria] = useState<CategoriaItem[]>([])

    let link = 'http://64.226.114.207:3000/'
    let parteARemover = 'http://localhost:3000/'

    useEffect(() => {
        fetch('http://64.226.114.207:3000/categories')
            .then(res => res.json())
            .then((resultado: CategoriaItem[]) => {
                setCategoria(resultado);
            });
    }, []);

    function ExcluirCategoria(id: number) {
        const categoriaParaExcluir = categoria.find(categoriaItem => categoriaItem.id === id);

        const resposta = window.confirm(`Você tem certeza que deseja excluir a categoria ${categoriaParaExcluir?.name}?`)

        if(resposta){
            axios.delete(`http://64.226.114.207:3000/categories/${id}`)

            setCategoria(categoria.filter(categoriaItem => categoriaItem.id !== id))
        }
    }

    

    return (
        <div className='Container'>
            <Table responsive striped bordered hover size='sm'>
            <thead className='thead'>
                    <tr>
                        <th className='id'>
                            ID
                        </th>
                        <th className='ConteudoPrincipal'>
                            Nome
                        </th>
                        <th className='ConteudoPrincipal'>
                            Alias
                        </th>
                        <th className='acoes'>
                            Imagem
                        </th>
                        <th className='acoes'>
                            Ações
                        </th>
                    </tr>
                </thead>
            {categoria.map(categoriaItem => (  
                <tbody key={categoriaItem.id} className='tbody'>
                    <tr>
                        <td>{categoriaItem.id}</td>
                        <td>{categoriaItem.name}</td>
                        <td>{categoriaItem.alias}</td>
                        <td>
                            <img 
                                src={`http://64.226.114.207:3000/${categoriaItem.image.replace(new RegExp(parteARemover, 'g'), '')}`} 
                                alt="imagem da categoria" 
                                style={{width: '35px'}}
                            />
                        </td>
                        <td>
                            <Link to={`/editarCategoria/${categoriaItem.id}`} className='BotaoEditar'>
                                <BotaoEditar/>
                            </Link>
                            <Link to='/listagemCategoria'>
                                <BotaoRemover onClick={ExcluirCategoria} Id={categoriaItem.id} />
                            </Link>
                        </td>
                    </tr>
                </tbody>
            ))}
            </Table>
        </div>
    );
}