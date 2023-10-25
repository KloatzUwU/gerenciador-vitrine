import { useEffect, useState } from 'react'
import { Container, Table } from 'react-bootstrap';
import './Loja.css'
import axios from 'axios';
import { Link } from 'react-router-dom';
import BotaoEditar from '../BotaoEditar';
import BotaoRemover from '../BotaoRemover';

interface LojaItem {
    id: number,
    name: string,
    image: string,
    mobile: string,
    tablet: string,
    desktop: string,
    link: string,
    segment_id: number | null,
    alias: string,
    number: number | null,
    segment_name?: string | null,
}

export default function Loja() {

    const [lojas, setLoja] = useState<LojaItem[]>([])

    useEffect(() => {
        axios.get('http://64.226.114.207:3000/stores')
          .then(res => {
            const resultado: LojaItem[] = res.data; 
            setLoja(resultado)
          })
          .catch(error => {
            console.error('Erro ao buscar dados:', error)
          });
      }, []);

      function ExcluirLoja(id: number){
        const LojaParaExcluir = lojas.find(lojaItem => lojaItem.id === id);

        const resposta = window.confirm(`Você tem certeza que deseja excluir a loja ${LojaParaExcluir?.name}?`)

        if(resposta){
            axios.delete(`http://64.226.114.207:3000/stores/${id}`)

            setLoja(lojas.filter(lojaItem => lojaItem.id !== id))
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
                            Segmento
                        </th>
                        <th className='acoes'>
                            Ações
                        </th>
                    </tr>
                </thead>
            {lojas.map(LojaItem => (    
                <tbody key={LojaItem.id} className='text-center'>
                    <tr>
                        <td>{LojaItem.id}</td>
                        <td>{LojaItem.name}</td>
                        <td>{LojaItem.alias}</td>
                        <td>{LojaItem.segment_name}</td>
                        <td>
                        <Link to={`/editarLoja/${LojaItem.id}`} className='botao-editar'>
                            <BotaoEditar/>
                        </Link>
                        <Link to='/listagemLoja'>
                            <BotaoRemover onClick={ExcluirLoja} Id={LojaItem.id} />
                        </Link>
                        </td>
                    </tr>
                </tbody>
            ))}
            </Table>
        </Container>
  )
}
