import { useEffect, useState } from 'react'
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
        const categoriaParaExcluir = categoria.find(categoriaItem => categoriaItem.id === id);

        const resposta = window.confirm(`Você tem certeza que deseja excluir a categoria ${categoriaParaExcluir?.name}?`)

        if(resposta){
            axios.delete(`http://64.226.114.207:3334/categories/${id}`)

            setCategoria(categoria.filter(categoriaItem => categoriaItem.id !== id))
        }
    }

    

    return (
        <div style={{  justifyContent: 'center', paddingTop: '30px'}}>
            <Table responsive striped bordered hover size='sm'>
            <thead style={{textAlign: 'center'}}>
                    <tr>
                        <th style={{width: '30px'}}>
                            ID
                        </th>
                        <th style={{width: '150px'}}>
                            Nome
                        </th>
                        <th style={{width: '150px'}}>
                            Alias
                        </th>
                        <th style={{width: '50px'}}>
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
                        <td>
                        <Link to={`/editarCategoria/${categoriaItem.id}`} style={{paddingRight: '20px'}}>
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