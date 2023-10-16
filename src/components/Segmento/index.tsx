import { useEffect, useState } from 'react'
import Table from 'react-bootstrap/Table';
import BotaoRemover from '../BotaoRemover';
import BotaoEditar from '../BotaoEditar';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './Segmento.css'

interface SegmentoItem {
    id: number;
    name: string;
}

export default function Segmento() {

    const [segmento, setSegmento] = useState<SegmentoItem[]>([])
    const [vinculoLoja, setVinculoLoja] = useState(false)

    useEffect(() => {
        fetch('http://64.226.114.207:3000/segment')
            .then(res => res.json())
            .then((resultado: SegmentoItem[]) => {
                setSegmento(resultado);
            });
    }, []);

    function ExcluirSegmento(id: number) {

        const segmentoParaExcluir = segmento.find(segmentoItem => segmentoItem.id === id);

        const resposta = window.confirm(`Você tem certeza que deseja excluir o segmento ${segmentoParaExcluir?.name}?`)

        
        axios.get(`http://64.226.114.207:3000/storesBySegment/${segmentoParaExcluir?.id}`)
            .then((res) => {
                return res.data;
            })
            .then((data) => {           
                if(data[0]?.segment_name === segmentoParaExcluir?.name){
                    alert('não foi possivel excluir este segmento pois ele está vinculado a uma loja')
                } else {
                    if(resposta && vinculoLoja === false){
                            axios.delete(`http://64.226.114.207:3000/segment/${id}`)
                
                            setSegmento(segmento.filter(segmentoItem => segmentoItem.id !== id))
                            setVinculoLoja(false)
                        }
                }
            })
            .catch((error) => {
                console.error('Ocorreu um erro:', error);
            });
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
                        <th className='acoes'>
                            Ações
                        </th>
                    </tr>
                </thead>
            {segmento.map(segmentoItem => (  
                <tbody key={segmentoItem.id} className='tbody'>
                    <tr>
                        <td>{segmentoItem.id}</td>
                        <td>{segmentoItem.name}</td>
                        <td>
                            <Link to={`/editarSegmento/${segmentoItem.id}`} className='BotaoEditar'>
                                <BotaoEditar/>
                            </Link>
                            <Link to='/listagemSegmento'>
                                <BotaoRemover onClick={ExcluirSegmento} Id={segmentoItem.id} />
                            </Link>
                        </td>
                    </tr>
                </tbody>
            ))}
            </Table>
        </div>
    );
}