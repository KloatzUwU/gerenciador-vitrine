import axios from 'axios';
import { useEffect, useState } from 'react'
import BotaoEditar from '../BotaoEditar';
import BotaoRemover from '../BotaoRemover';
import { Link } from 'react-router-dom';
import { Container, Table } from 'react-bootstrap';
import './SubCategoria.css'

interface SubCategoriaItem {
    name: string;
    alias: string;
    id: number;
    category_id: number;
    category_name: string;
}

export default function SubCategoria() {
    const [subCategoria, setSubCategoria] = useState<SubCategoriaItem[]>([])


    useEffect(() => {
        axios.get('http://64.226.114.207:3000/subcategories')
            .then(res => {
                const resultado: SubCategoriaItem[] = res.data;
                setSubCategoria(resultado)
            })
            .catch(error => {
                console.error('Erro ao buscar dados:', error)
            });
    }, []);

      function ExcluirSubCategoria(id: number){
        const SubcategoriaParaExcluir = subCategoria.find(SubCategoriaItem => SubCategoriaItem.id === id);

        const resposta = window.confirm(`Você tem certeza que deseja excluir a subcategoria ${SubcategoriaParaExcluir?.name}?`)

        if (resposta) {
            axios.delete(`http://64.226.114.207:3000/subcategories/${id}`)

            setSubCategoria(subCategoria.filter(SubCategoriaItem => SubCategoriaItem.id !== id))
        }
    }

    return (
        <Container className='table'>
            <Table responsive striped bordered hover size='sm'>
                <thead className='text-center'>
                    <tr>
                        <th className='id'>
                            ID
                        </th>
                        <th className='conteudo-principal'>
                            Nome
                        </th>
                        <th className='conteudo-principal'>
                            Alias
                        </th>
                        <th className='conteudo-principal'>
                            Categoria
                        </th>
                        <th className='acoes'>
                            Ações
                        </th>
                    </tr>
                </thead>
                {subCategoria.map(SubCategoriaItem => (
                    <tbody key={SubCategoriaItem.id} className='text-center'>
                        <tr>
                            <td>{SubCategoriaItem.id}</td>
                            <td>{SubCategoriaItem.name}</td>
                            <td>{SubCategoriaItem.alias}</td>
                            <td>{SubCategoriaItem.category_name}</td>
                            <td>
                                <Link to={`/editarSubCategoria/${SubCategoriaItem.id}`} className='botao-editar'>
                                    <BotaoEditar/>
                                </Link>
                                <Link to='/listagemSubCategoria'>
                                    <BotaoRemover onClick={ExcluirSubCategoria} Id={SubCategoriaItem.id}/>
                                </Link>
                            </td>
                        </tr>
                    </tbody>
                ))}
            </Table>
        </Container>
    )
}
